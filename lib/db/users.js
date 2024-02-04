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

export async function getUserAnimeRecommendations(user_id) {
  return await getData(`/api/db/users/anime_recommendations?user_id=${user_id}`);
}

export async function updateUserAnimeRecommendations(user_id, animeRecommendationsList) {
  return await patchData(`/api/db/users/anime_recommendations?user_id=${user_id}`, animeRecommendationsList);
}

export async function getUserAnimeGenres(user_id) {
  return await getData(`/api/db/users/anime_recommendations_genres?user_id=${user_id}`);
}

export async function updateUserAnimeGenres(user_id, genresList) {
  return await patchData(`/api/db/users/anime_recommendations_genres?user_id=${user_id}`, genresList);
}

export async function getUserAnimeMediaTypes(user_id) {
  return await getData(`/api/db/users/anime_recommendations_media_types?user_id=${user_id}`);
}

export async function updateUserAnimeMediaTypes(user_id, mediaTypesList) {
  return await patchData(`/api/db/users/anime_recommendations_media_types?user_id=${user_id}`, mediaTypesList);
}

export async function getUserLastFetchedAnime(user_id) {
  return await patchData(`/api/db/users/last_fetched_anime?user_id=${user_id}`);
}

export async function updateUserLastFetchedAnime(user_id, lastFetchedAnime) {
  return await patchData(`/api/db/users/last_fetched_anime?user_id=${user_id}`, lastFetchedAnime);
}
