'use client';

import { authorize, login, logout } from '@/lib/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { getUserData } from '@/lib/data';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loading from './loading';
import Recommendations from '../components/recommendations';

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  async function getUser() {
    if (localStorage.getItem('access_token')) {
      if (localStorage.getItem('user')) {
        setUser(JSON.parse(localStorage.getItem('user')));
      } else {
        const userData = await getUserData();
        const formattedUserData = {
          id: userData.id,
          name: userData.name,
          image: userData.picture,
        };
        setUser(formattedUserData);
        localStorage.setItem('user', JSON.stringify(formattedUserData));
      }
    } else {
      setUser(null);
    }
  }

  async function authenticate() {
    const url = new URL(window.location);
    const code = url.searchParams.get('code');
    if (code) {
      if (!localStorage.getItem('access_token')) {
        localStorage.setItem('auth_code', code);
        await login();
      }
      url.searchParams.delete('code');
      window.history.replaceState({}, '', url);
    }
    await getUser();

    setLoading(false);
  }

  useEffect(() => {
    authenticate();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return user ? (
    // authenticated
    <Recommendations />
  ) : (
    // not authenticated
    <div className="flex flex-col h-screen items-center justify-center text-center gap-10">
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Welcome to MAL Recommender!</h1>
        <p className="text-xl text-muted-foreground">Get anime recommendations tailored to your likes.</p>
      </div>
      <Button onClick={authorize}>Login</Button>
    </div>
  );
}
