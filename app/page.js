'use client';

import { authorize } from '@/lib/auth';

export default function Home() {

  return (
    <div>
      <div>Home</div>
      <button onClick={authorize}>Login</button>
    </div>
  );
}
