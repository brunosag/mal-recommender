'use client';

import { ArrowDownUp } from 'lucide-react';
import { Select, SelectItem } from '@nextui-org/react';

export default function Sorter({ sortType, setSortType }) {
  return (
    <div className="flex justify-between gap-3">
      <ArrowDownUp size={26} className="-translate-y-[-0.2rem]" />
      <Select
        aria-label="Sorting Options"
        variant="flat"
        radius="full"
        disallowEmptySelection
        selectedKeys={sortType}
        onSelectionChange={setSortType}
        classNames={{
          trigger: 'bg-black/[0.25] w-[8vw] h-8',
          value: 'text-xs font-semibold text-white/80',
          listboxWrapper: 'max-h-[400px]',
        }}
      >
        <SelectItem key="points">Points</SelectItem>
        <SelectItem key="title">Title</SelectItem>
        <SelectItem key="mean">Mean</SelectItem>
        <SelectItem key="members">Members</SelectItem>
      </Select>
    </div>
  );
}
