import { addToList, getUserInfo, addName } from "../models/userModel.ts";

const addUserToList = async (data) => {
  console.log(data);
  const newUser = await addToList({ data });
  console.log(newUser);
  return newUser;
};

const userInfo = async (data) => {
  const user = await getUserInfo({ data });
  return user;
};

const setName = async (userId, name) => {
  console.log(userId)
  console.log(name)
  const user = await addName({userId, name})
  return user;
}

export { addUserToList, userInfo, setName };
