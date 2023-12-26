export async function GET(request) {
  const params = new URLSearchParams(new URL(request.url).search);
  const client_id = process.env.MAL_CLIENT_ID;
  const code_verifier = params.get('code_verifier');

  const authorizationUrl = `https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${client_id}&code_challenge=${code_verifier}`;

  return Response.redirect(authorizationUrl, 302);
}
