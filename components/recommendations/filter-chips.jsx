'use client';

import { Chip, Divider } from '@nextui-org/react';
import { formatMediaType, formatYearIntervalChip } from '@/lib/utils';
import { Tags } from 'lucide-react';

export default function FilterChips({
  genresFilter,
  genresCollection,
  yearsFilter,
  yearsInterval,
  mediaTypesFilter,
  mediaTypesCollection,
}) {
  const existsGenresFilter = genresFilter?.size > 0;
  const existsYearsFilter =
    yearsFilter.initial_year !== yearsInterval.initial_year || yearsFilter.final_year !== yearsInterval.final_year;
  const existsMediaTypesFilter = mediaTypesFilter?.size > 0;

  return existsGenresFilter || existsYearsFilter || existsMediaTypesFilter ? (
    <div className="flex flex-row px-7 gap-3">
      <Tags size={22} className="text-white/80 min-w-[1.5rem] -translate-y-[-0.2rem]" />
      <div className="flex flex-row flex-wrap gap-2">
        {genresCollection
          .filter((genre) => genresFilter.has(genre.genre_id.toString()))
          ?.sort((a, b) => a.name.localeCompare(b.name))
          .map((genre) => (
            <Chip
              key={genre.id}
              variant="flat"
              size="sm"
              radius="full"
              classNames={{
                base: 'bg-black/[0.15] h-7 w-fit flex px-3',
                content: 'text-xs text-white/70 font-semibold',
              }}
            >
              {genre.name}
            </Chip>
          ))}

        {existsGenresFilter && existsYearsFilter && (
          <Divider key="divider_1" orientation="vertical" className="max-h-7" />
        )}

        {(yearsFilter.initial_year !== yearsInterval.initial_year ||
          yearsFilter.final_year !== yearsInterval.final_year) && (
          <Chip
            variant="flat"
            size="sm"
            radius="full"
            classNames={{
              base: 'bg-black/[0.15] h-7 w-fit flex px-3',
              content: 'text-xs text-white/70 font-semibold',
            }}
          >
            {formatYearIntervalChip(yearsFilter)}
          </Chip>
        )}

        {existsGenresFilter && existsMediaTypesFilter && (
          <Divider key="divider_2_1" orientation="vertical" className="max-h-7" />
        )}

        {!existsGenresFilter && existsYearsFilter && existsMediaTypesFilter && (
          <Divider key="divider_2_2" orientation="vertical" className="max-h-7" />
        )}

        {mediaTypesCollection
          .filter((mediaType) => mediaTypesFilter.has(mediaType.media_type))
          ?.sort((a, b) => a.media_type.localeCompare(b.media_type))
          .map((mediaType) => (
            <Chip
              key={mediaType.media_type}
              variant="flat"
              size="sm"
              radius="full"
              classNames={{
                base: 'bg-black/[0.15] h-7 w-fit flex px-3',
                content: 'text-xs text-white/70 font-semibold',
              }}
            >
              {formatMediaType(mediaType.media_type)}
            </Chip>
          ))}
      </div>
    </div>
  ) : null;
}
