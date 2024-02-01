import MongoTest from "@/components/mongo-test";
import clientPromise from "@/lib/db/mongodb";

export default async function MongoDB() {
  let isConnected = false;
  try {
    const client = await clientPromise;
    await client.db("admin").command({ ping: 1 });
    isConnected = true;
  } catch (e) {
    console.error(e);
  }

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <span className="text-xs">MONGODB STATUS</span>
      <span className="text-4xl font-bold">
        {isConnected ? "Connected" : "Not Connected"}
      </span>
      <MongoTest />
    </div>
  );
}
