import { fetchUserData } from './fetch';
import { getAnime, insertAnime, updateAnime } from './db/animes';
import {
  getUser,
  updateUserInfo,
  insertUser,
  updateUserAnimeList,
  updateUserAnimeGenres,
  getUserAnimeGenres,
  updateUserAnimeRecommendations,
} from './db/users';
import { login } from './auth';

export async function handleUser(setUser) {
  if (localStorage.getItem('access_token')) {
    const userId = JSON.parse(localStorage.getItem('user_id')) || (await fetchUserData().then((data) => data.id));
    const user = await getUser(userId);
    if (user) {
      const userInfo = {
        name: user.name,
        image: user.picture,
      };
      await updateUserInfo(userInfo);
      setUser(user);
      localStorage.setItem('user_id', JSON.stringify(userId));
    } else {
      const newUser = {
        _id: user.id,
        name: user.name,
        image: user.picture,
        anime_list: [],
        manga_list: [],
        anime_recommendations: [],
        manga_recommendations: [],
        anime_recommendations_genres: [],
        manga_recommendations_genres: [],
        last_fetched_anime_id: null,
        last_fetched_manga_id: null,
      };
      setUser(newUser);
      localStorage.setItem('user_id', JSON.stringify(userId));
      insertUser(newUser);
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
    mean: anime.mean,
    image: anime.image,
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
    mean: animeRecommendationDetails.mean,
    image: animeRecommendationDetails.image,
    year: animeRecommendationDetails.year,
    genres: animeRecommendationDetails.genres,
    members: animeRecommendationDetails.members,
    related_anime: animeRecommendationDetails.related_anime,
    recommendations: animeRecommendationDetails.recommendations,
  };

  const existingAnime = await getAnime(recommendation._id);
  if (existingAnime) {
    updateAnime(recommendation);
  } else {
    insertAnime(recommendation);
  }
}

function saveAnimeRecommendationsGenres(user, animeRecommendationsList) {
  const genreList = animeRecommendationsList.map((anime) => {
    const animeGenres = anime.genres;
    for (const genre of animeGenres) {
      const index = genreList.findIndex((existingGenre) => existingGenre._id === genre.id);
      if (index !== -1) {
        genreList[index].anime_ids.push(anime._id);
      } else {
        const newGenre = {
          _id: genre.id,
          name: genre.name,
          anime_ids: [anime._id],
        };

        genreList.push(newGenre);
      }
    }
  });

  updateUserAnimeGenres(user._id, genreList);
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

export async function saveUserAnimeRecommendations(user, animeRecommendations) {
  let userAnimeRecommendations = [];
  if (animeRecommendations.length !== 0) {
    userAnimeRecommendations = animeRecommendations
      .sort((a, b) => b.points * b.related_anime.length - a.points * a.related_anime.length)
      .map((anime) => ({
        anime_id: anime.anime_id,
        points: anime.points,
        related_anime: anime.related_anime,
      }));
    await updateUserAnimeRecommendations(user._id, userAnimeRecommendations);
  }
  return userAnimeRecommendations;
}
