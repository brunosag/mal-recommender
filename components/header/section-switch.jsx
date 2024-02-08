'use client';

import { BookOpenIcon, TvIcon } from 'lucide-react';
import { DataContext } from '../context/data-provider';
import { Tabs, Tab } from '@nextui-org/react';
import { useContext } from 'react';

export default function SectionSwitch() {
  const { section, setSection } = useContext(DataContext);

  return (
    <Tabs
      aria-label="Section Switch"
      color=""
      size="sm"
      variant="solid"
      radius="full"
      disallowEmptySelection
      classNames={{
        cursor: 'bg-white/[0.05]',
        tabList: 'bg-black/[0.15]',
      }}
      defaultSelectedKey="anime"
      onSelectCapture={setSection}
    >
      <Tab
        key="anime"
        title={
          <div className="flex items-center space-x-2">
            <TvIcon size={13} className="-translate-y-[0.1rem]" />
            <span className="text-xs font-semibold">Anime</span>
          </div>
        }
      />
      <Tab
        key="manga"
        title={
          <div className="flex items-center space-x-2">
            <BookOpenIcon size={13} />
            <span className="text-xs font-semibold">Manga</span>
          </div>
        }
      />
    </Tabs>
  );
}
