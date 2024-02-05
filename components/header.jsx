'use client';

import { DataContext } from './context/data-provider';
import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logoWhite from '@/public/logo-white.svg';
import SectionSwitch from './section-switch';
import UserMenu from './user-menu';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { loading } = useContext(DataContext);

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      setIsLoggedIn(true);
    }
  }, [loading]);

  if (loading || !isLoggedIn) {
    return null;
  }

  return (
    <header className="top-0 z-40 w-full">
      <div className="container w-5/6 py-5 grid grid-cols-3 items-center">
        <Link href="/" className="flex items-center gap-4">
          <Image src={logoWhite} alt="logo" className="h-10 w-10" />
          <h1 className="text-xl/[1] font-extrabold">mal-recommender</h1>
        </Link>
        <div className="flex justify-center">
          <SectionSwitch />
        </div>
        <div className="flex justify-end">{isLoggedIn && <UserMenu />}</div>
      </div>
    </header>
  );
}
