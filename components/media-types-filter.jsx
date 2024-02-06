'use client';

import { formatMediaType } from '@/lib/utils';
import { Select, SelectItem } from '@nextui-org/react';

export default function MediaTypesFilter({ mediaTypesFilter, setMediaTypesFilter, mediaTypesCollection }) {
  return (
    <div className="w-44">
      <Select
        aria-label="Media Types Filtering Options"
        variant="flat"
        radius="full"
        placeholder="Media Type"
        selectionMode="multiple"
        selectedKeys={mediaTypesFilter}
        onSelectionChange={setMediaTypesFilter}
        classNames={{
          mainWrapper: 'w-14',
          trigger: 'bg-black/[0.25] w-44 h-8',
          value: 'text-xs font-semibold text-white/80',
        }}
      >
        {mediaTypesCollection.map((mediaType) => (
          <SelectItem key={mediaType.media_type} value={mediaType.media_type}>
            {formatMediaType(mediaType.media_type)}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
