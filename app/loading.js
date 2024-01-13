import { Loader2Icon } from 'lucide-react';
import Image from 'next/image';
import loadingMew from '@/public/loading-mew.gif';

export default function Loading() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-5">
      <Image src={loadingMew} alt="Mew" className="w-24" />
    </div>
  );
}
