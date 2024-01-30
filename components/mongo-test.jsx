'use client';

import { insertUser } from '@/lib/db';
import { Button } from './ui/button';

export default function MongoTest() {
  return (
    <Button className="mt-6" size="sm" onClick={() => insertUser({ name: 'Bruno', email: 'brunosag02@gmail.cm' })}>
      Insert User
    </Button>
  );
}
