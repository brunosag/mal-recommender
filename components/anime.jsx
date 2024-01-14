import Image from 'next/image';
import Link from 'next/link';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from './ui/button';
import { ChevronDownIcon } from 'lucide-react';

export default function Anime({ anime, points, relatedAnime }) {
  const MALUrl = `https://myanimelist.net/anime/${anime.id}`;

  return (
    <div className="rounded-md flex justify-between p-2 border gap-5">
      <div className="flex gap-4">
        <Link href={MALUrl} target="_blank">
          <Image
            src={anime.image}
            alt={anime.title}
            width="0"
            height="0"
            sizes="100vw"
            className="w-24 h-auto rounded-md"
          />
        </Link>
        <div className="flex flex-col justify-center gap-1">
          <span className="text-xl font-semibold">
            <Link href={MALUrl} target="_blank" className="inline-block">
              {anime.title}
            </Link>
          </span>
          <span className="text-foreground/50 text-xs">
            {anime.genres
              .map((genre, index) => (index === anime.genres.length - 1 ? genre.name : `${genre.name}, `))
              .join('')}
          </span>
          <span className="text-xs font-semibold">{anime.mean}</span>
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              <ChevronDownIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit">
            <div>
              {relatedAnime.map((anime) => (
                <div key={anime.id} className="flex gap-2 items-center">
                  <Link
                    href={`https://myanimelist.net/anime/${anime.id}`}
                    target="_blank"
                    className="inline-block text-sm"
                  >
                    {anime.title}
                  </Link>
                  <span className="text-foreground/50 text-sm">{anime.score}</span>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        <div className="flex flex-col items-center justify-center mr-4">
          <span className="text-2xl/[1] font-bold">{Math.round(points)}</span>
          <span className="text-foreground/50 text-sm"> points</span>
        </div>
      </div>
    </div>
  );
}
