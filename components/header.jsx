'use client';

import { DataContext } from './context/data-provider';
import { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logoWhite from '@/public/logo-white.svg';
import SectionSwitch from './section-switch';
import UserMenu from './user-menu';

export default function Header() {
  const { authenticating, user, setLoading } = useContext(DataContext);

  if (authenticating || !user) {
    return null;
  }

  return (
    <header className="top-0 z-40 w-full">
      <div className="container w-5/6 py-6 grid grid-cols-3 items-center">
        <div className="flex items-center gap-4">
          <Link href="/" onClick={() => setLoading(true)}>
            <Image src={logoWhite} alt="logo" className="h-10 w-10" />
          </Link>
          <Link href="/" onClick={() => setLoading(true)}>
            <h1 className="text-xl/[1] font-extrabold">mal-recommender</h1>
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <SectionSwitch />
        </div>
        <div className="flex justify-end">
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
