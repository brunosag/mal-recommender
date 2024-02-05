'use client';

import { ChevronDownIcon, LogOutIcon } from 'lucide-react';
import { DataContext } from './context/data-provider';
import { useContext } from 'react';
import { Button } from './ui/button';
import { logout } from '@/lib/auth';
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';

export default function UserMenu() {
  const { user } = useContext(DataContext);

  return (
    <Dropdown backdrop="blur" placement="bottom-end">
      <DropdownTrigger>
        <Button className="flex items-center gap-3 p-2 w-fit h-fit" variant="ghost">
          <Avatar showFallback isBordered color="primary" src={user.image} fallback={user.name[0].toUpperCase()} />
          <ChevronDownIcon className="w-4 h-4 text-white/80" />
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
