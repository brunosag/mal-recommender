import { ChevronDownIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@nextui-org/react';

export default function Anime({ anime, points, relatedAnime, ...props }) {
  const MALUrl = `https://myanimelist.net/anime/${anime.id}`;

  return (
    <div className="rounded-[1.75rem] flex justify-between p-5 bg-black/[0.15] gap-5" {...props}>
      <div className="flex gap-5">
        <Link href={MALUrl} target="_blank">
          <div className="relative w-28 h-40">
            <Image src={anime.image} alt={anime.title.jp} fill className="rounded-2xl" />
            <Image
              src={anime.image}
              alt={anime.title.jp}
              fill
              className="w-28 h-auto rounded-2xl absolute top-0 left-0 blur-xl opacity-30 -z-10"
            />
          </div>
        </Link>
        <div className="flex flex-col justify-center gap-7">
          <div className="font-semibold">
            <Link href={MALUrl} target="_blank" className="inline-block">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3 max-w-[70ch]">
                  <span className="text-2xl/[1] truncate">{anime.title.jp}</span>
                  <div className="rounded-full bg-white/5 px-2 py-1 text-xs font-medium">{anime.mean.toFixed(2)}</div>
                </div>
                {anime.title.jp !== anime.title.en && (
                  <span className="text-foreground/40 leading-none truncate">{anime.title.en}</span>
                )}
              </div>
            </Link>
          </div>
          <div className="flex flex-col gap-1 text-xs">
            <span className="text-white/70 font-light">
              {anime.genres
                .map((genre, index) => (index === anime.genres.length - 1 ? genre.name : `${genre.name}, `))
                .join('')}
            </span>
            <div className="flex items-center gap-3">
              <span>{anime.year}</span>
              <span className="text-white/40 font-light">{anime.media_type}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <Popover>
          <PopoverTrigger asChild>
            {/* <Button variant="outline" size="icon">
              <ChevronDownIcon className="h-4 w-4" />
            </Button> */}
          </PopoverTrigger>
          <PopoverContent className="w-fit">
            <div>
              {relatedAnime.map((relatedAnime) => (
                <div key={relatedAnime.anime_id} className="flex gap-2 items-center">
                  <Link
                    href={`https://myanimelist.net/anime/${relatedAnime.anime_id}`}
                    target="_blank"
                    className="inline-block text-sm"
                  >
                    {relatedAnime.title?.en || relatedAnime.title?.jp}
                  </Link>
                  <span className="text-foreground/50 text-sm">
                    {relatedAnime.score === 0 ? '-' : relatedAnime.score}
                  </span>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        <div className="flex flex-col items-center justify-center px-5">
          <div className="relative">
            <span className="text-4xl/[1] font-extrabold">{Math.round(points)}</span>
            <span className="text-4xl/[1] font-extrabold blur-xl absolute top-0 left-0 opacity-30">
              {Math.round(points)}
            </span>
          </div>
          <span className="text-sm/[1] font-extralight"> points</span>
        </div>
      </div>
    </div>
  );
}
