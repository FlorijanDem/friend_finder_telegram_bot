import { sql } from "../dbConnection.ts";

const addToList = async (data) => {
  const id: number = data.data.userId;
  if (!id) {
    console.error("Error: userId is required");
    return;
  }
  const [checkAreExists] = await sql`
      SELECT *
      FROM users
      WHERE id=${id}
  `;

  if (checkAreExists === undefined || checkAreExists.id === null) {
    const [newUser] = await sql`
        INSERT INTO users (id)
        VALUES (${id})
        RETURNING *
      `;
    return newUser;
  } else {
    console.log("User already exists");
  }
};

const getUserInfo = async (data) => {
  const id: number = data.data.userId;
  if (!id) {
    console.error("Error: userId is required");
    return;
  }

  const [user] = await sql`
      SELECT *
      FROM users
      WHERE id=${id}
  `;
  return user;
};

const addName = async (data) => {
  const id: number = data.data.userId;
  const name: string = data.data.name;
  const [newName] = await sql`
      INSERT INTO users (name)
      VALUES (${name})
      WHERE id=${id}
      RETURNING *
  `;
  console.log(newName);
};

export { addToList, getUserInfo };
