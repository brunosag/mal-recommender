/*import clientPromise from "@/lib/db/mongodb";

export async function POST(request) {
  const client = await clientPromise;
  const db = client.db("db");
    const params = new URLSearchParams(new URL(request.url).search);
  const id = params.get("id");

  const newGenre = await request.json();

  const result = await db.collection("users").insertOne(newGenre);

  return Response.json(result);
}

export async function GET(request) {
  const params = new URLSearchParams(new URL(request.url).search);
  const id = params.get("id");

  const client = await clientPromise;
  const db = client.db("db");

  const result = await db
    .collection("anime_genres")
    .findOne({ _id: parseInt(id, 10) });

  return Response.json(result);
}

export async function PATCH(request) {
  const client = await clientPromise;
  const db = client.db("db");
  const params = new URLSearchParams(new URL(request.url).search);
  const id = params.get("id");

  const anime_id = await request.json();

  const filter = { _id: parseInt(id, 10) };
  const update = { $push: { anime_ids: anime_id } };

  const result = await db
    .collection("anime_genres")
    .findOneAndUpdate(filter, update);

  return Response.json(result);
}*/
