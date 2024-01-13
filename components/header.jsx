'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { logout } from '@/lib/auth';
import { useEffect, useState } from 'react';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <h1 className="font-bold">MAL Recommender</h1>
        </Link>
        {isLoggedIn && (
          <Button onClick={logout} variant="ghost">
            Logout
          </Button>
        )}
      </div>
    </header>
  );
}
