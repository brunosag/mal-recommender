import clientPromise from '@/lib/db/mongodb';

export async function POST(request) {
  const client = await clientPromise;
  const db = client.db('db');

  const newAnime = await request.json();

  const result = await db.collection('animes').insertOne(newAnime);

  return Response.json(result);
}

export async function GET(request) {
  const params = new URLSearchParams(new URL(request.url).search);
  const ids = params
    .get('id')
    .split(',')
    .map((id) => parseInt(id, 10));

  const client = await clientPromise;
  const db = client.db('db');

  let result;
  if (ids.length > 1) {
    result = await db
      .collection('animes')
      .find({ _id: { $in: ids } })
      .toArray();
  } else if (ids.length === 1) {
    result = await db.collection('animes').findOne({ _id: parseInt(ids[0], 10) });
  } else {
    result = await db.collection('animes').find();
  }

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
