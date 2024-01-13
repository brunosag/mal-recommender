async function fetchData(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

export function getUserAnimeList() {
  const token = localStorage.getItem('access_token');
  return fetchData(`/api/animelist?token=${token}`);
}

export function getUserData() {
  const token = localStorage.getItem('access_token');
  return fetchData(`/api/user?token=${token}`);
}

export function getAnimeDetails(id) {
  const token = localStorage.getItem('access_token');
  return fetchData(`/api/anime?token=${token}&id=${id}`);
}
