'use client';

import { ArrowDownWideNarrow } from 'lucide-react';
import { Button } from '@nextui-org/react';
import { cn } from '@/lib/utils';

export default function GenresStatistics({
  genresSortIncreasing,
  setGenresSortIncreasing,
  genresCollection,
  genresMaxCount,
}) {
  return (
    <>
      <div className="w-full flex flex-row items-center justify-between p-2">
        <h1 className="text-3xl font-extralight">Distribution by Genre</h1>
        <Button
          isIconOnly
          onPress={() => {
            setGenresSortIncreasing(!genresSortIncreasing);
          }}
          className="h-10 w-10"
          variant="light"
          radius="full"
        >
          <ArrowDownWideNarrow
            size={34}
            absoluteStrokeWidth={false}
            className={cn('text-white/80 transition-transform duration-75', genresSortIncreasing && 'rotate-180')}
          />
        </Button>
      </div>
      <div className="w-full h-fit flex flex-col gap-5">
        <div className="text-white/40 text-xs grid grid-cols-6">
          <p>GENRE</p>
          <p className="col-span-5 -ml-3">NUMBER OF RECOMMENDATIONS</p>
        </div>
        {genresCollection
          ?.sort((a, b) =>
            genresSortIncreasing ? a?.anime_ids.length - b?.anime_ids.length : b?.anime_ids.length - a?.anime_ids.length
          )
          .map((genre, index) => (
            <div key={index} className="grid grid-cols-6">
              <p className="text-sm text-white/90">{genre.name}</p>
              <div
                className="flex items-center gap-3 col-span-5"
                style={{ width: `${Math.ceil((genre.anime_ids.length / genresMaxCount) * 100)}%` }}
              >
                <p className="text-xs font-light text-white/70 -ml-3">{genre.anime_ids.length}</p>
                <div className="bg-white h-5 rounded-sm grow" />
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
