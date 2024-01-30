export async function POST(request) {
  const client = await clientPromise;
  const db = client.db();
  const user = await request.json();

  const result = await db.users.insertOne(user);

  return Response.json(result);
}
