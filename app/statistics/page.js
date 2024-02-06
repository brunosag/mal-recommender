'use client';

import { ArrowDownWideNarrow, ArrowLeft } from 'lucide-react';
import { authenticate } from '@/lib/data';
import { Button } from '@nextui-org/react';
import { cn } from '@/lib/utils';
import { DataContext } from '@/components/context/data-provider';
import { getUserAnimeGenres } from '@/lib/db/users';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/app/loading';

const options = {
  legend: 'none',
  pieSliceText: 'label',
  slices: {
    4: { offset: 0.2 },
    12: { offset: 0.3 },
    14: { offset: 0.4 },
    15: { offset: 0.5 },
  },
};

export default function Statistics() {
  const [data, setData] = useState([]);
  const [maxCount, setMaxCount] = useState(0);
  const [sortIncreasing, setSortIncreasing] = useState(false);
  const { user, setUser, loading, authenticating, setAutheticating, setLoading } = useContext(DataContext);
  const router = useRouter();

  function getMaxCount(data) {
    for (const genre of data) {
      const count = genre.anime_ids.length;
      setMaxCount((maxCount) => Math.max(maxCount, count));
    }
  }

  useEffect(() => {
    authenticate(setUser, setAutheticating);
    setSortIncreasing(false);
  }, []);

  useEffect(() => {
    async function initialize() {
      const userAnimeGenres = await getUserAnimeGenres(user._id);
      const sortedUserAnimeGenres = userAnimeGenres.sort((a, b) => b.anime_ids.length - a.anime_ids.length);
      setData(sortedUserAnimeGenres);
      getMaxCount(sortedUserAnimeGenres);
      setSortIncreasing(false);
      setLoading(false);
    }

    if (user) {
      initialize();
    }
  }, [user]);

  useEffect(() => {
    console.log(sortIncreasing);
    const sortedUserAnimeGenres = data.sort((a, b) =>
      sortIncreasing ? a.anime_ids.length - b.anime_ids.length : b.anime_ids.length - a.anime_ids.length
    );
    setData(sortedUserAnimeGenres);
    console.log(data);
  }, [sortIncreasing]);

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
        <h1 className="text-3xl font-extralight font-semibold">Statistics</h1>
        <Button
          isIconOnly
          onPress={() => {
            setSortIncreasing(!sortIncreasing);
          }}
          className="h-10 w-10"
          variant="light"
          radius="full"
        >
          <ArrowDownWideNarrow
            size={34}
            absoluteStrokeWidth={false}
            className={cn('text-white/80 transition-transform duration-75', sortIncreasing && 'rotate-180')}
          />
        </Button>
      </div>
      <div className="w-full h-fit flex flex-col gap-5">
        <div className="text-white/40 text-xs grid grid-cols-6">
          <p>GENRE</p>
          <p className="col-span-5 -ml-3">NUMBER OF RECOMMENDATIONS</p>
        </div>
        {data?.map((genre, index) => (
          <div key={index} className="grid grid-cols-6">
            <p className="text-sm text-white/90">{genre.name}</p>
            <div
              className="flex items-center gap-3 col-span-5"
              style={{ width: `${Math.ceil((genre.anime_ids.length / maxCount) * 100)}%` }}
            >
              <p className="text-xs font-light text-white/70 -ml-3">{genre.anime_ids.length}</p>
              <div className="bg-white h-5 rounded-sm grow" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
