import clientPromise from '@/lib/db/mongodb';

export async function GET(request) {
  const params = new URLSearchParams(new URL(request.url).search);
  const user_id = params.get('user_id');

  const client = await clientPromise;
  const db = client.db('db');

  const result = await db.collection('users').findOne({ _id: parseInt(user_id, 10) });

  const genreList = result.anime_recommendations_genres;
  return Response.json(genreList);
}

export async function PATCH(request) {
  const params = new URLSearchParams(new URL(request.url).search);
  const user_id = params.get('user_id');

  const client = await clientPromise;
  const db = client.db('db');

  const genreList = await request.json();

  const filter = { _id: parseInt(user_id, 10) };
  const update = { $set: { anime_recommendations_genres: genreList } };

  const result = await db.collection('users').findOneAndUpdate(filter, update);

  return Response.json(result);
}
