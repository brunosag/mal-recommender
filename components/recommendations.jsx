// - VERIFICAR RENDERIZAÇÃO DE COMPONENTES DO SITE (return)
// - QUANDO COMPLETOS OS ÍTENS ACIMA, COLOCAR CÓDIGO DE SALVAR GÊNEROS NA FUNÇÃO DE SALVAR LISTA DE RECOMENDAÇÃO
// - QUANDO COMPLETOS OS ÍTENS ACIMA, REFATORAR CÓDIGO DOS COMPONENTES DESTE ARQUIVO

'use client';

import { Button } from '@/components/ui/button';
import { fetchUserAnimeList, fetchAnimeDetails } from '@/lib/fetch';
import { calculatePoints, formatUserAnimeRecommendations, hasPrequel, rateLimitExceeded } from '@/lib/utils';
import {
  saveAnimeDetails,
  saveAnimeFromUserList,
  saveAnimeRecommendationDetails,
  saveAnimeRecommendationsGenres,
  saveAnimeRecommendationsMediaTypes,
  saveUserAnimeList,
  saveUserAnimeRecommendations,
} from '@/lib/data';
import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Anime from '@/components/anime';
import Image from 'next/image';
import Loading from '@/app/loading';
import loadingMew from '@/public/loading-mew.gif';
import { getUserAnimeRecommendations } from '@/lib/db/users';
import { getAnimes } from '@/lib/db/animes';

export default function Recommendations({ currentUser }) {
  const [loading, setLoading] = useState(true);
  const [recommending, setRecommending] = useState(false);
  const [userAnimeRecommendations, setUserAnimeRecommendations] = useState([]);
  const { toast } = useToast();

  function rateLimitToast() {
    toast({ description: 'Request limit exceeded.', variant: 'destructive' });
  }

  useEffect(() => {
    async function startRecommendationParameters() {
      let newUserAnimeRecommendations = [];
      const userAnimeRecommendations = await getUserAnimeRecommendations(currentUser._id);

      if (userAnimeRecommendations.length !== 0) {
        const userAnimeRecommendationsIds = userAnimeRecommendations.map((recommendation) => recommendation.anime_id);
        const userAnimeRecommendationsDetails = await getAnimes(userAnimeRecommendationsIds);

        for (const recommendation of userAnimeRecommendationsDetails) {
          const matchingRecommendation = userAnimeRecommendations.find(
            (userRecommendation) => userRecommendation.anime_id === recommendation._id
          );

          newUserAnimeRecommendations.push({
            anime_id: recommendation._id,
            title: recommendation.title,
            image: recommendation.image,
            media_type: recommendation.media_type,
            mean: recommendation.mean,
            year: recommendation.year,
            genres: recommendation.genres,
            members: recommendation.members,
            points: matchingRecommendation.points,
            related_anime: matchingRecommendation.related_anime,
          });
        }
      }

      setUserAnimeRecommendations(newUserAnimeRecommendations.sort((a, b) => b.points - a.points));
      setLoading(false);
    }

    startRecommendationParameters();
  }, []);

  async function refreshAnimeRecommendations() {
    setRecommending(true);

    const fetchedAnimes = await fetchUserAnimeList();
    if (rateLimitExceeded(fetchedAnimes)) {
      setRecommending(false);
      rateLimitToast();
      return;
    }

    const userListAnimes = await saveAnimeFromUserList(fetchedAnimes);
    const userList = await saveUserAnimeList(currentUser, fetchedAnimes);

    let animeRecommendations = [];

    for (const anime of userList) {
      if (anime.score < 7) {
        continue;
      }

      const fetchedAnimeDetails = await fetchAnimeDetails(anime.anime_id);
      if (rateLimitExceeded(fetchedAnimeDetails)) {
        setRecommending(false);
        rateLimitToast();
        break;
      }

      saveAnimeDetails(fetchedAnimeDetails);

      if (hasPrequel(fetchedAnimeDetails)) {
        continue;
      }

      const fetchedRecommendations = fetchedAnimeDetails.recommendations;

      for (const recommendation of fetchedRecommendations) {
        if (userList.some((userAnime) => userAnime.anime_id === recommendation.anime_id)) {
          continue;
        }

        const recommendationDetails = await fetchAnimeDetails(recommendation.anime_id);
        if (rateLimitExceeded(recommendationDetails)) {
          setRecommending(false);
          rateLimitToast();
          break;
        }

        saveAnimeRecommendationDetails(recommendationDetails);

        const recommendationPoints = calculatePoints({
          votes: recommendation.num_recommendations,
          score: anime.score,
          mean: recommendationDetails.mean,
          members: userListAnimes.find((item) => item._id === anime.anime_id).members,
        });

        const index = animeRecommendations.findIndex((item) => item.anime_id === recommendationDetails.id);
        const recommendationFound = index !== -1;
        if (recommendationFound) {
          animeRecommendations[index].related_anime.push({
            anime_id: anime.anime_id,
            title: fetchedAnimeDetails.title,
            score: anime.score,
          });
          animeRecommendations[index].points += recommendationPoints;
        } else {
          animeRecommendations.push({
            anime_id: recommendationDetails.id,
            title: recommendationDetails.title,
            image: recommendationDetails.image,
            media_type: recommendationDetails.media_type,
            mean: recommendationDetails.mean,
            year: recommendationDetails.year,
            genres: recommendationDetails.genres,
            members: recommendationDetails.members,
            points: recommendationPoints,
            related_anime: [{ anime_id: anime.anime_id, title: fetchedAnimeDetails.title, score: anime.score }],
          });
        }
      }
    }

    const formattedAnimeRecommendations = formatUserAnimeRecommendations(animeRecommendations);
    if (formattedAnimeRecommendations.length !== 0) {
      await saveUserAnimeRecommendations(currentUser, formattedAnimeRecommendations);
      setUserAnimeRecommendations(formattedAnimeRecommendations);
      await saveAnimeRecommendationsGenres(currentUser, formattedAnimeRecommendations);
      await saveAnimeRecommendationsMediaTypes(currentUser, formattedAnimeRecommendations);
    }
    setRecommending(false);
  }

  if (loading) {
    return <Loading />;
  }

  return recommending ? (
    <div className="flex flex-col h-full items-center justify-center gap-6">
      <Image src={loadingMew} alt="Loading Mew" className="w-48" />
      <div className="flex flex-col text-center gap-1">
        <span className="text-xl/[1] font-semibold">Recommending...</span>
        <span className="italic">matte kudasai</span>
      </div>
    </div>
  ) : userAnimeRecommendations.length === 0 ? (
    <div className="flex flex-col h-full items-center justify-center gap-8 text-center">
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Get your recommendations!</h1>
        <p className="text-lg text-muted-foreground">It may take a while, though!</p>
      </div>
      <Button onClick={refreshAnimeRecommendations}>Recommend</Button>
    </div>
  ) : (
    <div className="container h-full p-8 flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl/[1] font-semibold">Your Recommendations</h1>
        <Button onClick={refreshAnimeRecommendations} className="gap-1">
          Refresh
        </Button>
      </div>
      <div className="flex flex-col gap-3">
        {userAnimeRecommendations.map((r) => (
          <Anime
            key={r.anime_id}
            anime={{
              id: r.anime_id,
              title: r.title,
              image: r.image,
              year: r.year,
              genres: r.genres,
              mean: r.mean,
            }}
            points={r.points}
            relatedAnime={r.related_anime}
          />
        ))}
      </div>
    </div>
  );
}
