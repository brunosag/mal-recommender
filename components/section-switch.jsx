'use client';

import { BookIcon, TvIcon } from 'lucide-react';
import { SectionContext } from './context/section-provider';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useContext } from 'react';

export default function SectionSwitch() {
  const { section, setSection } = useContext(SectionContext);

  return (
    <Tabs value={section} onValueChange={setSection}>
      <TabsList className="grid grid-cols-2">
        <TabsTrigger value="anime">
          <TvIcon size={13} absoluteStrokeWidth={true} className="-translate-y-[0.1rem]" />
          <span className="text-xs font-semibold">Anime</span>
        </TabsTrigger>
        <TabsTrigger value="manga">
          <BookIcon size={13} absoluteStrokeWidth={true} />
          <span className="text-xs font-semibold">Manga</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
