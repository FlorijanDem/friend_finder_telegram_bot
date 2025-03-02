import { addToList } from "../models/userModel.ts";

const addUserToList = async (data) => {
  console.log(data);
  const newUser = await addToList({data});
  console.log(newUser)
  return newUser
};

export { addUserToList };
