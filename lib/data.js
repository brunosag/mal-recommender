export async function getUserAnimeList() {
  const res = await fetch(`/api/animelist?token=${localStorage.getItem('access_token')}`);
  const data = await res.json();

  return data;
}

export async function getUserData() {
  const res = await fetch(`/api/user?token=${localStorage.getItem('access_token')}`);
  const data = await res.json();

  return data;
}
