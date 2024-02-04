'use client';

import { Button } from '@/components/ui/button';
import { calculatePoints, formatMediaType, formatUserAnimeRecommendations, hasPrequel, rateLimitExceeded } from '@/lib/utils';
import { fetchUserAnimeList, fetchAnimeDetails } from '@/lib/fetch';
import { getAnimes } from '@/lib/db/animes';
import { getUserAnimeRecommendations } from '@/lib/db/users';
import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Anime from '@/components/anime';
import Image from 'next/image';
import Loading from '@/app/loading';
import loadingMew from '@/public/loading-mew.gif';
import {
  saveAnimeDetails,
  saveAnimeFromUserList,
  saveAnimeRecommendationDetails,
  saveAnimeRecommendationsGenres,
  saveAnimeRecommendationsMediaTypes,
  saveUserAnimeList,
  saveUserAnimeRecommendations,
  saveUserLastFetchedAnime,
} from '@/lib/data';

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
    let lastFetchedAnime = {
      anime_id: null,
      anime_recommendation_id: null,
    };

    for (const anime of userList) {
      if (anime.score < 7) {
        continue;
      }

      lastFetchedAnime = {
        anime_id: anime.anime_id,
        anime_recommendation_id: null,
      };

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

        lastFetchedAnime.anime_recommendation_id = recommendation.anime_id;

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
      await saveAnimeRecommendationsGenres(currentUser, formattedAnimeRecommendations);
      await saveAnimeRecommendationsMediaTypes(currentUser, formattedAnimeRecommendations);
      setUserAnimeRecommendations(formattedAnimeRecommendations);
    }
    await saveUserLastFetchedAnime(currentUser, lastFetchedAnime);
    setRecommending(false);
  }

  if (loading) {
    return <Loading />;
  }

  if (recommending) {
    return (
      <div className="flex flex-col h-full items-center justify-center gap-6">
        <Image src={loadingMew} alt="Loading Mew" className="w-48" />
        <div className="flex flex-col text-center gap-1">
          <span className="text-xl/[1] font-semibold">Recommending...</span>
          <span className="italic">matte kudasai</span>
        </div>
      </div>
    );
  }

  if (userAnimeRecommendations.length === 0) {
    return (
      <div className="flex flex-col h-full items-center justify-center gap-8 text-center">
        <div>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Get your recommendations!</h1>
          <p className="text-lg text-muted-foreground">It may take a while, though!</p>
        </div>
        <Button onClick={refreshAnimeRecommendations}>Recommend</Button>
      </div>
    );
  }

  return (
    <div className="container h-fit p-8 flex flex-col gap-5">
      <div className="flex justify-end">
        <Button onClick={refreshAnimeRecommendations} variant="ghost">
          Refresh
        </Button>
      </div>
      <div className="flex flex-col gap-4">
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
              media_type: formatMediaType(r.media_type),
            }}
            points={r.points}
            relatedAnime={r.related_anime}
          />
        ))}
      </div>
    </div>
  );
}
