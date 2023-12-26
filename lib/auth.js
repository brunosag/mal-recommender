import { generateRandomString } from './utils';

export function authorize() {
  const code_verifier = generateRandomString(128);
  localStorage.setItem('code_verifier', code_verifier);

  window.location.assign(`/api/auth/authorize?code_verifier=${code_verifier}`);
}
