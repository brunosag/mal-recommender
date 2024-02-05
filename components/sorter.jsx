'use client';

import { ArrowDownUp, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from '@nextui-org/react';

export default function Sorter({ sortType, setSortType }) {
  return (
    <div className="flex justify-between gap-3">
      <ArrowDownUp size={20} className="-translate-y-[-0.6rem]" />
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <Button className="rounded-[1.75rem] bg-black/[0.25] hover:bg-black/[0.35] focus:bg-black/[0.35] w-40 flex items-center justify-between gap-1 px-4">
            <span className=" font-xs text-white/80">{sortType}</span>
            <ChevronDownIcon className="w-4 h-4 text-white/80" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu disallowEmptySelection selectionMode="single">
          <DropdownItem onPress={() => setSortType('Points')}>Points</DropdownItem>
          <DropdownItem onPress={() => setSortType('Title')}>Title</DropdownItem>
          <DropdownItem onPress={() => setSortType('Mean')}>Mean</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
