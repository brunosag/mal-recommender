import clientPromise from '@/lib/mongodb';

export async function POST(request) {
  const client = await clientPromise;
  const db = client.db('db');

  const newAnime = await request.json();

  const result = await db.collection('animes').insertOne(newAnime);

  return Response.json(result);
}

export async function GET(request) {
  const params = new URLSearchParams(new URL(request.url).search);
  const id = params.get('id');

  const client = await clientPromise;
  const db = client.db('db');

  const result = await db.collection('animes').findOne({ _id: parseInt(id, 10) });

  return Response.json(result);
}

export async function PATCH(request) {
  const client = await clientPromise;
  const db = client.db('db');

  const anime = await request.json();

  const filter = { _id: anime._id };
  const update = { $set: anime };

  const result = await db.collection('animes').findOneAndUpdate(filter, update);

  return Response.json(result);
}
