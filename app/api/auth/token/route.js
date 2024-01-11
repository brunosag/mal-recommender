export async function POST(request) {
  const params = new URLSearchParams(new URL(request.url).search);
  const clientId = process.env.NEXT_PUBLIC_MAL_CLIENT_ID;
  const clientSecret = process.env.MAL_CLIENT_SECRET;
  const code = params.get('code');
  const codeVerifier = params.get('code_verifier');

  const tokenUrl = 'https://myanimelist.net/v1/oauth2/token';

  const res = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
      code_verifier: codeVerifier,
      grant_type: 'authorization_code',
    }),
  });
  const data = await res.json();

  return Response.json(data);
}
