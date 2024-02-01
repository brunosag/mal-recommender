import clientPromise from "@/lib/db/mongodb";

export async function PATCH(request) {
  const params = new URLSearchParams(new URL(request.url).search);
  const id = params.get("id");
  const animeList = await request.json();

  const client = await clientPromise;
  const db = client.db("db");
  const filter = { _id: parseInt(id, 10) };
  const update = { $set: { anime_list: animeList } };

  const result = await db.collection("users").findOneAndUpdate(filter, update);

  return Response.json(result);
}
