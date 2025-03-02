import { sql } from "../database/dbConnection.ts";

const searchByName = async (name) => {
  const [user] = await sql`
        SELECT name, description
        FROM users
        WHERE name=${name}
    `;
  return user;
};

export { searchByName };
