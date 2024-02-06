'use client';

import { Select, SelectItem } from '@nextui-org/react';

export default function GenresFilter({ genresFilter, setGenresFilter, genresCollection }) {
  return (
    <div className="w-44">
      <Select
        aria-label="Genre Filtering Options"
        variant="flat"
        radius="full"
        placeholder="Genre"
        selectionMode="multiple"
        selectedKeys={genresFilter}
        onSelectionChange={setGenresFilter}
        classNames={{
          trigger: 'bg-black/[0.25] w-44 h-8',
          value: 'text-xs font-semibold text-white/80',
        }}
      >
        {genresCollection.map((genre) => (
          <SelectItem key={genre.genre_id} value={genre.name}>
            {genre.name}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
