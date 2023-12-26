export async function POST(request) {
  const body = await request.json();
  const { user, field, status, limit, sort } = body;

  const url = `https://api.myanimelist.net/v2/users/${user}/animelist?field=${field}&status=${status}&limit=${limit}&sort=${sort}`;

  const res = await fetch(url, {
    headers: {
      'X-MAL-CLIENT-ID': process.env.MAL_CLIENT_ID,
    },
  });
  const data = await res.json();

  return Response.json(data);
}
