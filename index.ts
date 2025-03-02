import { bot } from "./bot.ts";
import { testDBConnection } from "./database/dbConnection.ts";
import { createTables } from "./database/createDB.ts";
import "./commands.ts";

createTables();

testDBConnection().catch((error) => {
  console.error("Failed to connect to the database:", error);
  process.exit(1);
});

console.log("Bot is running...");
