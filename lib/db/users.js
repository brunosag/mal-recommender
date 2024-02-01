import { getData, patchData, postData } from '../utils';

export async function getUser(id) {
  return await getData(`/api/db/users?id=${id}`);
}

export async function insertUser(user) {
  return await postData('/api/db/users', user);
}

export async function updateUserInfo(userInfo) {
  return await patchData('/api/db/users', userInfo);
}

export async function updateUserAnimeList(user_id, animeList) {
  return await patchData(`/api/db/users/anime_lists?user_id=${user_id}`, animeList);
}

export async function getUserAnimeGenres(user_id) {
  return await getData(`/api/db/users/anime_recommendations_genres?user_id=${user_id}`);
}

export async function updateUserAnimeGenres(user_id, genreList) {
  return await patchData(`/api/db/users/anime_recommendations_genres?user_id=${user_id}`, genreList);
}
