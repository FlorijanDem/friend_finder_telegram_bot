import { sql } from "./dbConnection.ts";

const createTables = async () => {
  await sql`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            name TEXT,
            description TEXT
        );
    `;
};

export { createTables };
