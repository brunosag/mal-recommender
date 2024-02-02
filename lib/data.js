import { fetchUserData } from './fetch';
import { getAnime, insertAnime, updateAnime } from './db/animes';
import {
  getUser,
  updateUserInfo,
  insertUser,
  updateUserAnimeList,
  updateUserAnimeGenres,
  getUserAnimeGenres,
} from './db/users';
import { login } from './auth';

export async function handleUser(setUser) {
  if (localStorage.getItem('access_token')) {
    const userData = await fetchUserData();
    const user = await getUser(userData.id);
    if (user) {
      const userInfo = {
        name: userData.name,
        image: userData.picture,
      };
      await updateUserInfo(userInfo);
      const updatedUser = await getUser(userData.id);
      setUser(updatedUser);
    } else {
      const newUser = {
        _id: userData.id,
        name: userData.name,
        image: userData.picture,
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
  }));

  animes.forEach(async (anime) => {
    const existingAnime = await getAnime(anime._id);
    if (existingAnime) {
      updateAnime(anime);
    } else {
      insertAnime(anime);
    }
  });
}

async function saveUserAnimeGenres(user, animeRecommendationsList) {
  const genreList = animeRecommendationsList.map(async (anime) => {
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

  updateUserAnimeList(user._id, userAnimes);
}
