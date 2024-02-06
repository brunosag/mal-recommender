'use client';

import { ArrowDownWideNarrow } from 'lucide-react';
import { Button, Select, SelectItem } from '@nextui-org/react';
import { cn } from '@/lib/utils';

export default function Sorter({ sortType, setSortType, sortIncreasing, setSortIncreasing }) {
  return (
    <div className="flex justify-between items-center gap-3">
      <Button
        isIconOnly
        onPress={() => setSortIncreasing(!sortIncreasing)}
        className="h-8 w-8"
        variant="light"
        radius="full"
      >
        <ArrowDownWideNarrow
          size={20}
          className={cn('text-white/80 transition-transform duration-25', sortIncreasing && 'rotate-180')}
        />
      </Button>
      <div className="-ml-2 w-32">
        <Select
          aria-label="Sorting Options"
          variant="flat"
          radius="full"
          disallowEmptySelection
          selectedKeys={sortType}
          onSelectionChange={setSortType}
          classNames={{
            trigger: 'bg-black/[0.25] w-32 h-8',
            value: 'text-xs font-semibold text-white/80',
          }}
        >
          <SelectItem key="points">Points</SelectItem>
          <SelectItem key="title">Title</SelectItem>
          <SelectItem key="mean">Mean</SelectItem>
          <SelectItem key="members">Members</SelectItem>
        </Select>
      </div>
    </div>
  );
}
