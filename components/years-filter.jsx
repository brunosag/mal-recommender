'use client';

import { cn, formatYearInterval } from '@/lib/utils';
import { Button, Popover, PopoverContent, PopoverTrigger, Slider } from '@nextui-org/react';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';

export default function YearsFilter({ yearsFilter, setYearsFilter, yearsInterval }) {
  const [buttonFocus, setButtonFocus] = useState(false);

  return (
    <Popover aria-label="Years Filtering Options" placement="bottom" onOpenChange={() => setButtonFocus(!buttonFocus)}>
      <PopoverTrigger>
        <Button
          className="bg-black/[0.25] flex justify-between items-center p-3 w-44 h-8"
          variant="light"
          radius="full"
        >
          <span className="text-xs font-semibold text-white/80">
            {formatYearInterval(yearsFilter, yearsInterval.initial_year, yearsInterval.final_year)}
          </span>
          <ChevronDownIcon className={cn('w-4 h-4 transition-transform duration-25', buttonFocus && 'rotate-180')} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="h-72">
        <Slider
          aria-label="Year Interval"
          size="sm"
          radius="full"
          showTooltip={true}
          orientation="vertical"
          step={1}
          minValue={yearsInterval.initial_year}
          maxValue={yearsInterval.final_year}
          defaultValue={[yearsFilter.initial_year, yearsFilter.final_year]}
          onChangeEnd={([initialValue, finalValue]) =>
            setYearsFilter({ initial_year: initialValue, final_year: finalValue })
          }
          startContent={<span>{yearsInterval.final_year}</span>}
          endContent={<span>{yearsInterval.initial_year}</span>}
        />
      </PopoverContent>
    </Popover>
  );
}
