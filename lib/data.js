import { fetchUserData } from './fetch';
import { getAnime, insertAnime, updateAnime } from './db/animes';
import {
  getUser,
  updateUserInfo,
  insertUser,
  updateUserAnimeList,
  updateUserAnimeGenres,
  updateUserAnimeRecommendations,
  updateUserAnimeMediaTypes,
} from './db/users';
import { login } from './auth';

export async function handleUser(setUser) {
  if (localStorage.getItem('access_token')) {
    const userId = JSON.parse(localStorage.getItem('user_id'));
    const fetchedUser = await fetchUserData();
    const existingUser = await getUser(userId);
    if (userId && userId === existingUser?.id) {
      const userInfo = {
        _id: userId,
        name: fetchedUser.name,
        image: fetchedUser.picture,
      };
      await updateUserInfo(userInfo);
      const currentUser = {
        _id: userId,
        name: userInfo.name,
        image: userInfo.picture,
        anime_list: existingUser.anime_list,
        manga_list: existingUser.manga_list,
        anime_recommendations: existingUser.anime_recommendations,
        manga_recommendations: existingUser.manga_recommendations,
        anime_recommendations_genres: existingUser.anime_recommendations_genres,
        manga_recommendations_genres: existingUser.manga_recommendations_genres,
        anime_recommendations_media_types: existingUser.anime_recommendations_media_types,
        manga_recommendations_media_types: existingUser.manga_recommendations_media_types,
        last_fetched_anime_id: existingUser.last_fetched_anime_id,
        last_fetched_manga_id: existingUser.last_fetched_manga_id,
      };
      setUser(currentUser);
    } else {
      const newUser = {
        _id: fetchedUser.id,
        name: fetchedUser.name,
        image: fetchedUser.picture,
        anime_list: [],
        manga_list: [],
        anime_recommendations: [],
        manga_recommendations: [],
        anime_recommendations_genres: [],
        manga_recommendations_genres: [],
        anime_recommendations_media_types: [],
        manga_recommendations_media_types: [],
        last_fetched_anime_id: null,
        last_fetched_manga_id: null,
      };
      await insertUser(newUser);
      setUser(newUser);
      localStorage.setItem('user_id', JSON.stringify(newUser._id));
    }
  } else {
    setUser(null);
  }
}

export async function authenticate(setUser, setLoading) {
  const url = new URL(window.location);
  const code = url.searchParams.get('code');
  if (code) {
    if (!localStorage.getItem('access_token')) {
      localStorage.setItem('auth_code', code);
      await login();
    }
    url.searchParams.delete('code');
    window.history.replaceState({}, '', url);
  }
  await handleUser(setUser);

  setLoading(false);
}

export async function saveAnimeFromUserList(fetchedAnimes) {
  const animes = fetchedAnimes.map((anime) => ({
    _id: anime.id,
    title: anime.title,
    image: anime.image,
    media_type: anime.media_type,
    mean: anime.mean,
    year: anime.year,
    genres: anime.genres,
    members: anime.members,
    related_anime: [],
    recommendations: [],
  }));

  animes.forEach(async (anime) => {
    const existingAnime = await getAnime(anime._id);
    if (existingAnime) {
      await updateAnime(anime);
    } else {
      await insertAnime(anime);
    }
  });

  return animes;
}

export async function saveUserAnimeList(user, fetchedAnimes) {
  const userAnimes = fetchedAnimes
    .map((anime) => ({
      anime_id: anime.id,
      status: anime.status,
      score: anime.score,
    }))
    .sort((a, b) => b.score - a.score);

  await updateUserAnimeList(user._id, userAnimes);

  return userAnimes;
}

export function saveAnimeDetails(fetchedAnimeDetails) {
  const anime = {
    _id: fetchedAnimeDetails.id,
    related_anime: fetchedAnimeDetails.related_anime,
    recommendations: fetchedAnimeDetails.recommendations,
  };

  updateAnime(anime);
}

export async function saveAnimeRecommendationDetails(animeRecommendationDetails) {
  const recommendation = {
    _id: animeRecommendationDetails.id,
    title: animeRecommendationDetails.title,
    image: animeRecommendationDetails.image,
    media_type: animeRecommendationDetails.media_type,
    mean: animeRecommendationDetails.mean,
    year: animeRecommendationDetails.year,
    genres: animeRecommendationDetails.genres,
    members: animeRecommendationDetails.members,
    related_anime: animeRecommendationDetails.related_anime,
    recommendations: animeRecommendationDetails.recommendations,
  };

  const existingAnime = await getAnime(recommendation._id);
  if (existingAnime) {
    await updateAnime(recommendation);
  } else {
    await insertAnime(recommendation);
  }
}

export async function saveUserAnimeRecommendations(user, animeRecommendations) {
  const userAnimeRecommendations = animeRecommendations.map((anime) => ({
    anime_id: anime.anime_id,
    points: anime.points,
    related_anime: anime.related_anime,
  }));
  await updateUserAnimeRecommendations(user._id, userAnimeRecommendations);
}

export async function saveAnimeRecommendationsGenres(user, animeRecommendationsList) {
  let genreList = [];
  for (const anime of animeRecommendationsList) {
    const animeGenres = anime.genres;
    for (const genre of animeGenres) {
      const index = genreList.findIndex((existingGenre) => existingGenre.genre_id === genre.id);
      if (index !== -1) {
        genreList[index].anime_ids.push(anime.anime_id);
      } else {
        const newGenre = {
          genre_id: genre.id,
          name: genre.name,
          anime_ids: [anime.anime_id],
        };
        genreList.push(newGenre);
      }
    }
  }
  const sortedGenreList = genreList.sort((a, b) => a.name.localeCompare(b.name));
  await updateUserAnimeGenres(user._id, sortedGenreList);
}

export async function saveAnimeRecommendationsMediaTypes(user, animeRecommendationsList) {
  let mediaTypesList = [];
  for (const anime of animeRecommendationsList) {
    const index = mediaTypesList.findIndex((existingMediaType) => existingMediaType.media_type === anime.media_type);
    if (index !== -1) {
      mediaTypesList[index].anime_ids.push(anime.anime_id);
    } else {
      const newMediaType = {
        media_type: anime.media_type,
        anime_ids: [anime.anime_id],
      };
      mediaTypesList.push(newMediaType);
    }
  }
  const sortedMediaTypesList = mediaTypesList.sort((a, b) => a.media_type.localeCompare(b.media_type));
  await updateUserAnimeMediaTypes(user._id, sortedMediaTypesList);
}
