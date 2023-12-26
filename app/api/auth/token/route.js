export async function POST(request) {
  const client_id = process.env.MAL_CLIENT_ID;
  const client_secret = process.env.MAL_CLIENT_SECRET;
  const code = request.url.searchParams.get('code');
  const code_verifier = localStorage.getItem('code_verifier');

  const tokenUrl = `https://myanimelist.net/v1/oauth2/token?client_id=${client_id}&client_secret=${client_secret}&code=${code}&code_verifier=${code_verifier}&grant_type=authorization_code`;

  const res = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const data = await res.json();
  console.log(data);

  return Response.json(data);
}
