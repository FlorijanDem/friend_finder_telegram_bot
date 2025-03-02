import postgres from "postgres";
import * as dotenv from "dotenv";
dotenv.config();

const sql = postgres({
  host: process.env.DB_HOST as string,
  port: process.env.DB_PORT  ? parseInt(process.env.DB_PORT, 10) : 5432,
  database: process.env.DB_NAME as string,
  username: process.env.DB_USER as string,
  password: process.env.DB_PASS as string,
  ssl: process.env.DB_SSL === "true",
});

const testDBConnection = async () => {
  try {
    await sql`SELECT 1 + 1`;
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
};

export { sql, testDBConnection };
