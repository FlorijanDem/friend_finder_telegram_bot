import TelegramBot from "node-telegram-bot-api";
import { testDBConnection } from "./database/dbConnection.ts";
import { createTables } from "./database/createDB.ts";
import {
  addUserToList,
  userInfo,
  setName,
} from "./controllers/userController.ts";
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
  keyboard: [[{ text: "addMeToTheList" }], [{ text: "aboutMe" }]],
};

bot.on("message", async (msg) => {
  const chatId: number = msg.chat.id;
  console.log(msg);
  const userId = msg.from?.id;

  if (msg.text === "addMeToTheList") {
    const addUser = addUserToList({ userId });
    bot.sendMessage(chatId, "You are added");
  } else if (msg.text === "aboutMe") {
    const user = await userInfo({ userId });
    console.log(user);
    if (user) {
      if (typeof user.name === "string") {
        bot.sendMessage(chatId, `You are ${user.name}`);
      } else {
        bot.sendMessage(chatId, "You do not have name");
      }
    } else {
      console.error("No user array");
    }
  }
});

bot.onText(/\/name (.+)/, (msg, match) => {
  if (match && match[1]) {
    const userId = msg.from?.id;
    const name = match[1];
    const set = setName(userId, name);
    bot.sendMessage(msg.chat.id, `Now you name is ${name}`);
  } else {
    bot.sendMessage(msg.chat.id, `Please enter you name`);
  }
});
