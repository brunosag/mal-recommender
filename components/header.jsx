'use client';

import { Button } from './ui/button';
import { logout } from '@/lib/auth';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logoWhite from '@/public/logo-white.svg';
import SectionSwitch from './section-switch';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <header className="top-0 z-40 w-full">
      <div className="container py-6 grid grid-cols-3 items-center">
        <Link href="/" className="flex items-center gap-4">
          <Image src={logoWhite} alt="logo" className="h-10 w-10" />
          <h1 className="text-xl/[1] font-extrabold">mal-recommender</h1>
        </Link>
        <div className="flex justify-center">
          <SectionSwitch />
        </div>
        <div className="flex justify-end gap-2">
          {isLoggedIn && (
            <Button onClick={logout} variant="ghost">
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
