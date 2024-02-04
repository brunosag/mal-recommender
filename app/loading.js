'use client';

import Image from 'next/image';
import loadingMew from '@/public/loading-mew.gif';
import { DataContext } from '@/components/context/data-provider';
import { useContext } from 'react';

export default function Loading() {
  const { loading } = useContext(DataContext);

  if (!loading) {
    return null;
  }

  return (
    <div className="absolute top-0 left-0 h-full w-full flex flex-col items-center justify-center gap-5">
      <Image src={loadingMew} alt="Mew" className="w-24" />
    </div>
  );
}
