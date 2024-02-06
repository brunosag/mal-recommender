'use client';

import { ArrowDownUp, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  ScrollShadow,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';

export default function GenresFilter({ genresFilter, setGenresFilter, genresCollection }) {
  const [buttonFocus, setButtonFocus] = useState(false);

  return (
    <div className="flex justify-between gap-3">
      <Dropdown
        aria-label="Genre Filtering Options"
        placement="bottom-start"
        className="font-sm text-white/80"
        onOpenChange={() => setButtonFocus(!buttonFocus)}
      >
        <DropdownTrigger>
          <Button variant="flat" radius="full" size="sm" className="bg-black/[0.25] w-[8vw] flex justify-between">
            <span>Genre</span>
            {(buttonFocus && <ChevronUpIcon className="w-4 h-4" />) ||
              (!buttonFocus && <ChevronDownIcon className="w-4 h-4" />)}
          </Button>
        </DropdownTrigger>
        <ScrollShadow>
          <DropdownMenu
            selectionMode="multiple"
            closeOnSelect={false}
            selectedKeys={genresFilter}
            onSelectionChange={setGenresFilter}
          >
            {genresCollection.map((genre) => (
              <DropdownItem key={genre.genre_id}>{genre.name}</DropdownItem>
            ))}
          </DropdownMenu>
        </ScrollShadow>
      </Dropdown>
    </div>
  );
}
