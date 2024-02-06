'use client';

import { ChevronDownIcon } from 'lucide-react';
import { DataContext } from './context/data-provider';
import { useContext, useState } from 'react';
import { logout } from '@/lib/auth';
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { cn } from '@/lib/utils';

export default function UserMenu() {
  const { user } = useContext(DataContext);
  const [buttonFocus, setButtonFocus] = useState(false);

  return (
    <Dropdown backdrop="blur" placement="bottom-end" onOpenChange={() => setButtonFocus(!buttonFocus)}>
      <DropdownTrigger>
        <Button className="flex items-center gap-3 p-2 w-fit h-fit" variant="light" radius="full">
          <Avatar showFallback isBordered color="primary" src={user.image} fallback={user.name[0].toUpperCase()} />
          <ChevronDownIcon className={cn('w-4 h-4 transition-transform duration-25', buttonFocus && 'rotate-180')} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem
          key="username"
          showDivider
          onPress={() => {
            const url = `https://myanimelist.net/profile/${user.name}`;
            window.open(url, '_blank').focus();
          }}
        >
          {user.name}
        </DropdownItem>
        <DropdownItem key="statistics">Statistics</DropdownItem>
        <DropdownItem key="logout" color="danger" className="text-danger" onPress={logout}>
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
