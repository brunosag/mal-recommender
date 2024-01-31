import { getData, patchData, postData } from "../utils";

export async function getUser(id) {
  return await getData(`/api/db/users?id=${id}`);
}
export async function insertUser(user) {
  return await postData('/api/db/users', user);
}
export async function updateUserInfo(userInfo) {
  return await patchData('/api/db/users', userInfo);
}
