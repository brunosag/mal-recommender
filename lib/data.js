import { fetchUserData } from './fetch';
import { getUser, updateUserInfo, insertUser } from './db/users';
import { login } from './auth';
import { getAnime, insertAnime, updateAnime } from './db/animes';

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

export function saveAnimeFromUserList(fetchedAnimes) {
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
