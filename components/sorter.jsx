'use client';

import { ArrowDownUp } from 'lucide-react';
import { Select, SelectItem } from '@nextui-org/react';

export default function Sorter({ sortType, setSortType }) {
  return (
    <div className="flex justify-between items-center gap-3">
      <ArrowDownUp size={22} />
      <div className="w-32">
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
