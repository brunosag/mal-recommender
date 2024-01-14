'use client';

import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="w-9 h-9 focus-visible:ring-0 focus-visible:ring-offset-0 focus:transition-none"
      onClick={() => (theme === 'dark' ? setTheme('light') : setTheme('dark'))}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 dark:scale-0 rotate-0 dark:-rotate-90 transition-transform" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 dark:scale-100 rotate-90 dark:rotate-0 transition-transform" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
