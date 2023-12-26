'use client';

import { getUserAnimeList } from '@/lib/data';
import { useEffect, useState } from 'react';
import Loading from '../loading';

export default function AnimeList() {
  const [animelist, setAnimelist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimeList = async () => {
      const list = await getUserAnimeList();
      setAnimelist(list);
      setLoading(false);
    };

    fetchAnimeList();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container p-8">
      <h1 className="text-3xl font-bold text-center mb-5">Animelist</h1>
      <p>{JSON.stringify(animelist)}</p>
    </div>
  );
}
