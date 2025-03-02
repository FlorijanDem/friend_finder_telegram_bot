import TelegramBot from "node-telegram-bot-api";
import { testDBConnection } from "./dbConnection.ts";
import { createTables } from "./createDB.ts";
import { addUserToList } from "./controllers/userController.ts";
createTables();

import * as dotenv from "dotenv";
dotenv.config();

const token: any = process.env.TELEGRAM_API_KEY;
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

testDBConnection().catch((error) => {
  console.error("Failed to connect to the database:", error);
  process.exit(1); // Exit the process if the DB connection fails
});

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome to the friend finder bot", {
    reply_markup: replyMarkup,
  });
});

const replyMarkup: TelegramBot.ReplyKeyboardMarkup = {
  keyboard: [[{ text: "addMeToTheList" }]],
};

bot.on("message", (msg) => {
  const chatId: number = msg.chat.id;

  if (msg.text === "addMeToTheList") {
    const userId = msg.from?.id;
    const addUser = addUserToList({ userId });
    bot.sendMessage(chatId, "You are added");
  }
});
