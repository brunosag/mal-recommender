import { getData, patchData, postData } from '../utils';

export async function getAnime(id) {
  return await getData(`/api/db/animes?id=${id}`);
}

export async function getAnimes(ids) {
  return await getData(`/api/db/animes?id=${ids.join(',')}`);
}

export async function insertAnime(anime) {
  return await postData('/api/db/animes', anime);
}
export async function updateAnime(anime) {
  return await patchData('/api/db/animes', anime);
}
