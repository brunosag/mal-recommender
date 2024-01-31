async function getData(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

async function postData(url, body) {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

async function patchData(url, body) {
  try {
    const res = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

export async function getUser(id) {
  return await getData(`/api/db/users?id=${id}`);
}
export async function insertUser(user) {
  return await postData('/api/db/users', user);
}
export async function updateUserInfo(userInfo) {
  return await patchData('/api/db/users', userInfo);
}
