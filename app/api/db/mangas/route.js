// import clientPromise from "@/lib/db/mongodb";

// export async function POST(request) {
//   const client = await clientPromise;
//   const db = client.db("db");

//   const newUser = await request.json();

//   const result = await db.collection("users").insertOne(newUser);

//   return Response.json(result);
// }

// export async function GET(request) {
//   const params = new URLSearchParams(new URL(request.url).search);
//   const id = params.get("id");

//   const client = await clientPromise;
//   const db = client.db("db");

//   const result = await db
//     .collection("users")
//     .findOne({ _id: parseInt(id, 10) });

//   return Response.json(result);
// }

// export async function PATCH(request) {
//   const client = await clientPromise;
//   const db = client.db("db");

//   const userInfo = await request.json();

//   const filter = { _id: userInfo._id };
//   const update = { $set: userInfo };

//   const result = await db.collection("users").findOneAndUpdate(filter, update);

//   return Response.json(result);
// }
