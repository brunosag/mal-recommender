import {
  Button,
  Link,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollShadow,
} from '@nextui-org/react';
import { ChevronLeftIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import Image from 'next/image';

export default function Anime({ anime, points, relatedAnime, ...props }) {
  const [showRelatedAnime, setShowRelatedAnime] = useState(false);
  const MALUrl = `https://myanimelist.net/anime/${anime.id}`;

  return (
    <div className="rounded-[1.75rem] flex justify-between p-5 bg-black/[0.15] gap-5" {...props}>
      <div className="flex gap-5">
        <Link href={MALUrl} target="_blank">
          <div className="relative w-28 h-40">
            <Image src={anime.image} alt={anime.title.jp} fill className="rounded-2xl" />
            <Image src={anime.image} alt={anime.title.jp} fill className="rounded-2xl blur-xl opacity-40" />
          </div>
        </Link>
        <div className="flex flex-col justify-center gap-7">
          <div className="font-semibold">
            <Link href={MALUrl} target="_blank" className="inline-block">
              <div className="flex flex-col">
                <div className="flex items-center gap-3 max-w-[70ch]">
                  <span className="text-2xl/[1.3] truncate">{anime.title.jp}</span>
                  <div className="rounded-full bg-white/5 px-2 py-1 text-xs font-medium">{anime.mean.toFixed(2)}</div>
                </div>
                <div className="-translate-y-[0.1rem]">
                  {anime.title.jp !== anime.title.en && (
                    <span className="text-foreground/40 leading-snug truncate">{anime.title.en}</span>
                  )}
                </div>
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
      <div className="flex gap-1 items-center">
        <Popover
          aria-label="Related Anime"
          placement="left"
          showArrow
          onOpenChange={() => setShowRelatedAnime((prev) => !prev)}
        >
          <PopoverTrigger>
            <Button isIconOnly variant="light" radius="full">
              <ChevronLeftIcon size={20} className={cn('text-white/80', showRelatedAnime && 'rotate-180')} />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <ScrollShadow hideScrollBar>
              <Listbox
                aria-label="Related Anime List"
                variant="flat"
                className="text-xs"
                classNames={{
                  list: 'max-h-48',
                }}
              >
                {relatedAnime.map((anime, index) => (
                  <ListboxItem
                    key={anime.anime_id}
                    href={`https://myanimelist.net/anime/${anime.anime_id}`}
                    target="_blank"
                    showDivider={index < relatedAnime.length - 1}
                    startContent={<span>{anime.title?.en || anime.title?.jp}</span>}
                    endContent={<span className="text-foreground/50">{anime.score === 0 ? '–' : anime.score}</span>}
                  />
                ))}
              </Listbox>
            </ScrollShadow>
          </PopoverContent>
        </Popover>
        <div className="flex flex-col items-center justify-center w-32 p-5">
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
