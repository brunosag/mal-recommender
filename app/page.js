'use client';

import { authenticate } from '@/lib/data';
import { authorize } from '@/lib/auth';
import { Button } from '@nextui-org/react';
import { DataContext } from '@/components/context/data-provider';
import { useContext, useEffect } from 'react';
import Recommendations from '../components/recommendations';

export default function Home() {
  const { user, setUser, loading, setLoading } = useContext(DataContext);

  useEffect(() => {
    authenticate(setUser, setLoading);
  }, []);

  if (loading) {
    return null;
  }

  return user ? (
    // authenticated
    <Recommendations currentUser={user} />
  ) : (
    // not authenticated
    <div className="flex flex-col h-screen items-center justify-center text-center gap-10">
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Welcome to mal-recommender!</h1>
        <p className="text-xl text-muted-foreground">Get anime recommendations tailored to your likes.</p>
      </div>
      <Button radius="full" variant="flat" onPress={authorize}>
        <span className="text-sm font-semibold">Login</span>
      </Button>
    </div>
  );
}
