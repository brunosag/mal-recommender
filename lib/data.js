import { login } from './auth';

const { getUser, updateUserInfo, insertUser } = require('./db');
const { fetchUserData } = require('./fetch');

export async function handleUser(setUser) {
  if (localStorage.getItem('access_token')) {
    const userData = await fetchUserData();
    const user = await getUser(userData.id);
    const formattedUserData = {
      _id: userData.id,
      name: userData.name,
      image: userData.picture,
    };
    if (user) {
      setUser(formattedUserData);
      updateUserInfo(formattedUserData);
    } else {
      setUser(formattedUserData);
      insertUser(formattedUserData);
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
