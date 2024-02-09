'use client';

import { Chip, Divider } from '@nextui-org/react';
import { formatMediaType, formatYearIntervalChip } from '@/lib/utils';
import { Tags, XCircle } from 'lucide-react';

export default function FilterChips({
  genresFilter,
  setGenresFilter,
  genresCollection,
  yearsFilter,
  setYearsFilter,
  yearsInterval,
  mediaTypesFilter,
  setMediaTypesFilter,
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
                base: 'bg-black/[0.15] h-7 w-fit flex items-center gap-0.5 px-3 text-xs text-white/70 font-semibold',
              }}
              startContent={<span>{genre.name}</span>}
              endContent={<XCircle size={16} />}
              onClose={() => {
                genresFilter.delete(genresFilter.delete(genre.genre_id.toString()));
                const newGenresFilter = new Set(genresFilter);
                setGenresFilter(newGenresFilter);
              }}
            />
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
              base: 'bg-black/[0.15] h-7 w-fit flex items-center gap-0.5 px-3 text-xs text-white/70 font-semibold',
            }}
            startContent={<span>{formatYearIntervalChip(yearsFilter)}</span>}
            endContent={<XCircle size={16} />}
            onClose={() =>
              setYearsFilter({ initial_year: yearsInterval.initial_year, final_year: yearsInterval.final_year })
            }
          />
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
                base: 'bg-black/[0.15] h-7 w-fit flex items-center gap-0.5 px-3 text-xs text-white/70 font-semibold',
              }}
              startContent={<span>{formatMediaType(mediaType.media_type)}</span>}
              endContent={<XCircle size={16} />}
              onClose={() => {
                mediaTypesFilter.delete(mediaType.media_type);
                const newMediaTypesFilter = new Set(mediaTypesFilter);
                setMediaTypesFilter(newMediaTypesFilter);
              }}
            />
          ))}
      </div>
    </div>
  ) : null;
}
