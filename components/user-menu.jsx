'use client';

import { ChevronDownIcon, ChevronUpIcon, LogOutIcon } from 'lucide-react';
import { DataContext } from './context/data-provider';
import { useContext, useState } from 'react';
import { logout } from '@/lib/auth';
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Link,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function UserMenu() {
  const { user } = useContext(DataContext);
  const [buttonFocus, setButtonFocus] = useState(false);
  const router = useRouter();

  return (
    <Dropdown
      backdrop="blur"
      placement="bottom-end"
      onOpenChange={() => setButtonFocus(!buttonFocus)}
      classNames={{ base: 'w-36', content: 'min-w-fit' }}
    >
      <DropdownTrigger>
        <Button className="flex items-center min-w-fit gap-1 p-[0.35rem] w-fit h-fit" variant="light" radius="full">
          <Avatar showFallback src={user.image} fallback={user.name[0].toUpperCase()} />
          <ChevronDownIcon
            className={cn('w-4 h-4 transition-transform !duration-150', { 'rotate-180': buttonFocus })}
          />
        </Button>
      </DropdownTrigger>
      <DropdownMenu classNames={{ base: 'mb-0' }}>
        <DropdownSection
          title={user.name}
          classNames={{
            heading: 'mt-1 px-2 block w-full text-left border-b pb-[0.65rem]',
            group: 'mt-1',
            base: 'mb-0',
          }}
        >
          <DropdownItem key="statistics" onPress={() => router.push('/statistics')}>
            Statistics
          </DropdownItem>
          <DropdownItem key="logout" color="danger" className="text-danger" onPress={logout}>
            Logout
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
