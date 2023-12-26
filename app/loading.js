import { Loader2Icon } from 'lucide-react';
import Image from 'next/image';
import mew from './icon3.png';

export default function Loading() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-5">
      <Image src={mew} alt="Mew" className="w-24" />
      <Loader2Icon className="w-6 h-6 animate-spin opacity-40" />
    </div>
  );
}
