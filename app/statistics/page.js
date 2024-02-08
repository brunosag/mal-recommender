'use client';

import { ArrowLeft } from 'lucide-react';
import { authenticate } from '@/lib/data';
import { Button } from '@nextui-org/react';
import { DataContext } from '@/components/context/data-provider';
import { getMaxCount } from '@/lib/utils';
import { getUserAnimeGenres } from '@/lib/db/users';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import GenresStatistics from '@/components/statistics/genres-statistics';
import Loading from '@/app/loading';

export default function Statistics() {
  const [genresData, setGenresData] = useState([]);
  const [genresMaxCount, setGenresMaxCount] = useState(0);
  const [genresSortIncreasing, setGenresSortIncreasing] = useState(false);
  const { user, setUser, loading, authenticating, setAutheticating, setLoading } = useContext(DataContext);
  const router = useRouter();

  useEffect(() => {
    authenticate(setUser, setAutheticating);
  }, []);

  useEffect(() => {
    async function initialize() {
      const userAnimeGenres = await getUserAnimeGenres(user._id);
      const sortedUserAnimeGenres = userAnimeGenres.sort((a, b) => b.anime_ids.length - a.anime_ids.length);
      setGenresData(sortedUserAnimeGenres);
      getMaxCount(sortedUserAnimeGenres, setGenresMaxCount);
      setLoading(false);
    }
    if (user) {
      setGenresSortIncreasing(false);
      initialize();
    }
  }, [user]);

  if (!authenticating && !user) {
    return router.push('/');
  }

  if (loading || authenticating) {
    return <Loading />;
  }

  return (
    <div className="grow flex flex-col items-center container w-5/6 gap-8 py-8">
      <div className="w-full flex flex-row items-center justify-between p-2">
        <Button isIconOnly onPress={router.back} className="h-10 w-10" variant="light" radius="full">
          <ArrowLeft size={36} absoluteStrokeWidth={false} />
        </Button>
        <div className="text-3xl font-extralight font-semibold object-center">
          <h1>Statistics</h1>
        </div>
      </div>
      <GenresStatistics
        genresSortIncreasing={genresSortIncreasing}
        setGenresSortIncreasing={setGenresSortIncreasing}
        genresCollection={genresData}
        genresMaxCount={genresMaxCount}
      />
    </div>
  );
}
