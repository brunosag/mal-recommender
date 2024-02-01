import { getData, patchData, postData } from "../utils";

export async function getUser(id) {
  return await getData(`/api/db/users?id=${id}`);
}

export async function insertUser(user) {
  return await postData("/api/db/users", user);
}

export async function updateUserInfo(userInfo) {
  return await patchData("/api/db/users", userInfo);
}

export async function updateUserAnimeList(user_id, animeList) {
  return await patchData(`/api/db/users/anime_lists?id=${user_id}`, animeList);
}

/*
export async function getGenre(id) {
  return await getData(`/api/db/users/anime_recommendations_genres?id=${id}`);
}
export async function insertGenre(genre) {
  return await postData("/api/db/users/anime_recommendations_genres", genre);
}
export async function updateGenre(id, anime_id) {
  return await patchData(`/api/db/users/anime_recommendations_genres?id=${id}`, anime_id);
}
*/
