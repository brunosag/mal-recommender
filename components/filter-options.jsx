'use client';

import { DataContext } from './context/data-provider';
import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logoWhite from '@/public/logo-white.svg';
import SectionSwitch from './section-switch';
import UserMenu from './user-menu';
import { Filter } from 'lucide-react';

export default function FilterOptions() {
  /*  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { loading } = useContext(DataContext);

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      setIsLoggedIn(true);
    }
  }, [loading]);

  if (loading || !isLoggedIn) {
    return null;
  }
*/
  return (
    <div className="flex justify between gap-3">
      <Filter size={16} />
      <span className="text-xs font-semibold">Filter1</span>
      <span className="text-xs font-semibold">Filter2</span>
      <span className="text-xs font-semibold">Filter3</span>
    </div>
  );
}
