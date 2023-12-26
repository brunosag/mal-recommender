import { generateRandomString } from './utils';

export function authorize() {
  const codeVerifier = generateRandomString(128);
  localStorage.setItem('code_verifier', codeVerifier);

  window.location.assign(`/api/auth/authorize?code_verifier=${codeVerifier}`);
}

export async function login() {
  const authCode = localStorage.getItem('auth_code');
  const codeVerifier = localStorage.getItem('code_verifier');

  const res = await fetch(`/api/auth/token?code=${authCode}&code_verifier=${codeVerifier}`, {
    method: 'POST',
  });
  const data = await res.json();

  localStorage.setItem('access_token', data.access_token);
  localStorage.setItem('refresh_token', data.refresh_token);
  localStorage.removeItem('auth_code');
  localStorage.removeItem('code_verifier');
}

export async function logout() {
  localStorage.removeItem('access_token');
	localStorage.removeItem('refresh_token');
	window.location.reload();
}
