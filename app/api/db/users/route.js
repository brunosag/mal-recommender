import clientPromise from '@/lib/mongodb';

export async function POST(request) {
  const newUser = await request.json();
  const client = await clientPromise;
  const db = client.db('db');

  const result = await db.collection('users').insertOne(newUser);

  return Response.json(result);
}
