export async function GET(request) {
  const params = new URLSearchParams(new URL(request.url).search);
  const token = params.get('token');

  const url = `https://api.myanimelist.net/v2/users/@me/animelist?status=completed&limit=1000&fields=list_status`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  return Response.json(data);
}
