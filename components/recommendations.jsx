"use client";

import { Button } from "@/components/ui/button";
import { fetchUserAnimeList } from "@/lib/fetch";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Anime from "@/components/anime";
import Image from "next/image";
import Loading from "@/app/loading";
import loadingMew from "@/public/loading-mew.gif";
import { saveAnimeFromUserList, saveUserAnimeList } from "@/lib/data";

export default function Recommendations({ children, ...props }) {
  const { currentUser } = props;

  const [animeBase, setAnimeBase] = useState([]);

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recommending, setRecommending] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setAnimeBase(JSON.parse(localStorage.getItem("anime_base")) || []);
    setRecommendations(
      JSON.parse(localStorage.getItem("recommendations")) || []
    );
    setLoading(false);
  }, []);

  useEffect(() => {
    if (animeBase.length > 0) {
      localStorage.setItem("anime_base", JSON.stringify(animeBase));
    }
  }, [animeBase]);

  useEffect(() => {
    if (recommendations.length > 0) {
      localStorage.setItem("recommendations", JSON.stringify(recommendations));
    }
  }, [recommendations]);

  async function recommend() {
    setRecommending(true);

    const fetchedAnimes = await fetchUserAnimeList();
    if (typeof fetchedAnimes === "undefined" || "message" in fetchedAnimes) {
      setRecommending(false);
      toast({ description: "Request limit exceeded.", variant: "destructive" });
      return;
    }

    saveAnimeFromUserList(fetchedAnimes);
    saveUserAnimeList(currentUser, fetchedAnimes);

    //setRecommendations([]);

    //const seenIDs = new Set();

    // for (const anime of userList) {
    //   if (anime.score < 7) {
    //     continue;
    //   }
    //   const fetchedAnime = await fetchAnimeDetails(anime.anime_id);
    //   if (typeof fetchedAnime === 'undefined' || 'message' in fetchedAnime) {
    //     setRecommending(false);
    //     toast({ description: 'Request limit exceeded.', variant: 'destructive' });
    //     return;
    //   }
    //   if (fetchedAnime.hasPrequel) {
    //     continue;
    //   }
    //   const fetchedRecommendations = fetchedAnime.recommendations;

    //   for (const recommendation of fetchedRecommendations) {
    //     if (userList.some((userAnime) => userAnime.anime_id === recommendation.node.id)) {
    //       continue;
    //     }
    //     const recommendationDetails = await fetchAnimeDetails(recommendation.node.id);
    //     if (typeof recommendationDetails === 'undefined' || 'message' in recommendationDetails) {
    //       setRecommending(false);
    //       toast({ description: 'Request limit exceeded.', variant: 'destructive' });
    //       return;
    //     }

    //     if (!animes.find((anime) => anime.id === recommendationDetails.id)) {
    //       animes.push({
    //         _id: recommendationDetails.id,
    //         title: recommendationDetails.title,
    //         mean: recommendationDetails.mean,
    //         image: recommendationDetails.image,
    //         year: recommendationDetails.year,
    //         genres: recommendationDetails.genres,
    //         members: recommendationDetails.members,
    //       });
    //       setAnimeBase((prev) => [...prev, animes[animes.length - 1]]);
    //     }

    //     const seen = seenIDs.has(recommendationDetails.id);
    //     const points = calculatePoints({
    //       votes: recommendation.num_recommendations,
    //       score: anime.score,
    //       mean: recommendationDetails.mean,
    //       members: animes.find((item) => item.id === anime.anime_id).members,
    //     });

    //     setRecommendations((prev) => {
    //       if (seen) {
    //         return prev.map((item) =>
    //           item.anime_id === recommendationDetails.id
    //             ? {
    //                 anime_id: item.anime_id,
    //                 related_anime: [...item.related_anime, { anime_id: anime.anime_id, score: anime.score }],
    //                 points: item.points + points,
    //               }
    //             : item
    //         );
    //       } else {
    //         seenIDs.add(recommendationDetails.id);
    //         return [
    //           ...prev,
    //           {
    //             anime_id: recommendationDetails.id,
    //             related_anime: [{ anime_id: anime.anime_id, score: anime.score }],
    //             points,
    //           },
    //         ];
    //       }
    //     });
    //   }
    // }

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
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Get your recommendations!
        </h1>
        <p className="text-lg text-muted-foreground">
          It may take a while, though!
        </p>
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
          .sort(
            (a, b) =>
              b.points * b.related_anime.length -
              a.points * a.related_anime.length
          )
          .map((r, index) => (
            <Anime
              key={index}
              anime={animeBase.find((anime) => anime.id === r.anime_id)}
              points={r.points * r.related_anime.length}
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
