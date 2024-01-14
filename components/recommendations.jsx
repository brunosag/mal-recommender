'use client';

import { Button } from '@/components/ui/button';
import { calculatePoints } from '@/lib/utils';
import { getAnimeDetails, getUserAnimeList } from '@/lib/data';
import { Loader2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Anime from '@/components/anime';
import Image from 'next/image';
import Loading from '../app/loading';
import loadingMew from '@/public/loading-mew.gif';

export default function Recommendations() {
  const [animeBase, setAnimeBase] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recommending, setRecommending] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setAnimeBase(JSON.parse(localStorage.getItem('anime_base')) || []);
    setRecommendations(JSON.parse(localStorage.getItem('recommendations')) || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (animeBase.length > 0) {
      localStorage.setItem('anime_base', JSON.stringify(animeBase));
    }
  }, [animeBase]);

  useEffect(() => {
    if (recommendations.length > 0) {
      localStorage.setItem('recommendations', JSON.stringify(recommendations));
    }
  }, [recommendations]);

  async function recommend() {
    setRecommending(true);

    const fetchedAnimes = await getUserAnimeList();
    if (typeof fetchedAnimes === 'undefined' || 'message' in fetchedAnimes) {
      setRecommending(false);
      toast({ description: 'Request limit exceeded.', variant: 'destructive' });
      return;
    }

    const animes = fetchedAnimes.map((anime) => ({
      id: anime.id,
      title: anime.title,
      mean: anime.mean,
      image: anime.image,
      genres: anime.genres,
    }));
    setAnimeBase(animes);

    const userList = fetchedAnimes
      .filter((anime) => anime.score >= 7)
      .map((anime) => ({
        anime_id: anime.id,
        score: anime.score,
      }))
      .sort((a, b) => b.score - a.score);

    setRecommendations([]);

    const seenIDs = new Set();

    for (const anime of userList) {
      const fetchedRecommendations = await getAnimeDetails(anime.anime_id).then((data) => data.recommendations);
      if (typeof fetchedRecommendations === 'undefined' || 'message' in fetchedRecommendations) {
        setRecommending(false);
        toast({ description: 'Request limit exceeded.', variant: 'destructive' });
        return;
      }

      for (const recommendation of fetchedRecommendations) {
        if (userList.some((userAnime) => userAnime.anime_id === recommendation.node.id)) {
          continue;
        }
        const recommendationDetails = await getAnimeDetails(recommendation.node.id);
        if (typeof recommendationDetails === 'undefined' || 'message' in recommendationDetails) {
          setRecommending(false);
          toast({ description: 'Request limit exceeded.', variant: 'destructive' });
          return;
        }

        if (!animes.find((anime) => anime.id === recommendationDetails.id)) {
          animes.push({
            id: recommendationDetails.id,
            title: recommendationDetails.title,
            mean: recommendationDetails.mean,
						image: recommendationDetails.image,
						year: recommendationDetails.year,
            genres: recommendationDetails.genres,
          });
          setAnimeBase((prev) => [...prev, animes[animes.length - 1]]);
        }

        const seen = seenIDs.has(recommendationDetails.id);
        const points = calculatePoints({
          votes: recommendation.num_recommendations + 1,
          score: anime.score,
          mean: recommendationDetails.mean,
        });

        setRecommendations((prev) => {
          if (seen) {
            return prev.map((item) =>
              item.anime_id === recommendationDetails.id
                ? {
                    anime_id: item.anime_id,
                    related_anime: [...item.related_anime, { anime_id: anime.anime_id, score: anime.score }],
                    points: item.points + points,
                  }
                : item
            );
          } else {
            seenIDs.add(recommendationDetails.id);
            console.log(anime);
            return [
              ...prev,
              {
                anime_id: recommendationDetails.id,
                related_anime: [{ anime_id: anime.anime_id, score: anime.score }],
                points,
              },
            ];
          }
        });
      }
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
  ) : recommendations.length === 0 ? (
    <div className="flex flex-col h-full items-center justify-center gap-8 text-center">
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Get your recommendations!</h1>
        <p className="text-lg text-muted-foreground">It may take a while, though!</p>
      </div>
      <Button onClick={recommend}>Recommend</Button>
    </div>
  ) : (
    <div className="container h-full p-8 flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl/[1] font-semibold">Your Recommendations</h1>
        <Button onClick={recommend} className="gap-1">
          Refresh
        </Button>
      </div>
      <div className="flex flex-col gap-3">
        {recommendations
          .sort((a, b) => b.points - a.points)
          .map((r, index) => (
            <Anime
              key={index}
              anime={animeBase.find((anime) => anime.id === r.anime_id)}
              points={r.points}
              relatedAnime={r.related_anime.map((item) => ({
                ...animeBase.find((anime) => anime.id === item.anime_id),
                score: item.score,
              }))}
            />
          ))}
      </div>
    </div>
  );
}
