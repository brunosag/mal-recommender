'use client';

import { ArrowDownUp, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from '@nextui-org/react';
import { capitalizeFirstLetter } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function Sorter({ sortType, setSortType }) {
  const [buttonFocus, setButtonFocus] = useState(false);

  return (
    <div className="flex justify-between gap-3">
      <ArrowDownUp size={20} className="-translate-y-[-0.4rem]" />
      <Dropdown
        aria-label="Sorting Options"
        placement="bottom-start"
        className="font-sm text-white/80"
        onOpenChange={() => setButtonFocus(!buttonFocus)}
      >
        <DropdownTrigger>
          <Button variant="flat" radius="full" size="sm" className="bg-black/[0.25] w-[8vw] flex justify-between">
            <span>{capitalizeFirstLetter(sortType)}</span>
            {(buttonFocus && <ChevronUpIcon className="w-4 h-4" />) ||
              (!buttonFocus && <ChevronDownIcon className="w-4 h-4" />)}
          </Button>
        </DropdownTrigger>
        <DropdownMenu disallowEmptySelection selectionMode="single">
          <DropdownItem onPress={() => setSortType('points')}>Points</DropdownItem>
          <DropdownItem onPress={() => setSortType('title')}>Title</DropdownItem>
          <DropdownItem onPress={() => setSortType('mean')}>Mean</DropdownItem>
          <DropdownItem onPress={() => setSortType('members')}>Members</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
