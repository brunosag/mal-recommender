'use client';

import { insertUser } from '@/lib/db/db';
import { Button } from './ui/button';

export default function MongoTest() {
  return (
    <Button
      className="mt-6"
      size="sm"
      onClick={() => insertUser({ _id: '1', name: 'Bruno', email: 'brunosag02@gmail.cm' })}
    >
      Insert User
    </Button>
  );
}
