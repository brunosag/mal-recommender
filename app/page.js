"use client";

import { authenticate } from "@/lib/data";
import { authorize } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Loading from "./loading";
import Recommendations from "../components/recommendations";

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authenticate(setUser, setLoading);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return user ? (
    // authenticated
    <Recommendations currentUser={user} />
  ) : (
    // not authenticated
    <div className="flex flex-col h-screen items-center justify-center text-center gap-10">
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Welcome to MAL Recommender!
        </h1>
        <p className="text-xl text-muted-foreground">
          Get anime recommendations tailored to your likes.
        </p>
      </div>
      <Button onClick={authorize}>Login</Button>
    </div>
  );
}
