'use client';

import { BookOpenIcon, TvIcon } from 'lucide-react';
import { DataContext } from './context/data-provider';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useContext } from 'react';

export default function SectionSwitch() {
  const { section, setSection } = useContext(DataContext);

  return (
    <Tabs value={section} onValueChange={setSection}>
      <TabsList className="grid grid-cols-2">
        <TabsTrigger value="anime">
          <TvIcon size={13} className="-translate-y-[0.1rem]" />
          <span className="text-xs font-semibold">Anime</span>
        </TabsTrigger>
        <TabsTrigger value="manga">
          <BookOpenIcon size={13} />
          <span className="text-xs font-semibold">Manga</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
