import { bot } from "../bot.ts";
import TelegramBot from "node-telegram-bot-api";
import { addToList, getUserInfo, addName } from "../models/userModel.ts";
const replyMarkup: TelegramBot.ReplyKeyboardMarkup = {
  keyboard: [[{ text: "addMeToTheList" }], [{ text: "aboutMe" }]],
};

// Handle /start command
export const handleStart = (msg: TelegramBot.Message) => {
  bot.sendMessage(msg.chat.id, "Welcome to the Friend Finder Bot!", {
    reply_markup: replyMarkup,
  });
};

// Handle /name <name>
export const handleNameChange = async (
  msg: TelegramBot.Message,
  match: RegExpExecArray | null
) => {
  if (!match || !match[1]) {
    bot.sendMessage(
      msg.chat.id,
      "Please enter your name after /name, e.g., /name John"
    );
    return;
  }

  const userId = msg.from?.id;
  if (!userId) {
    bot.sendMessage(msg.chat.id, "Error: Unable to get your user ID.");
    return;
  }

  const name = match[1];
  await addName(userId, name);
  bot.sendMessage(msg.chat.id, `Now your name is ${name}`);
};

// Handle buttons like "addMeToTheList" and "aboutMe"
export const handleMessage = async (msg: TelegramBot.Message) => {
  const chatId = msg.chat.id;
  const userId = msg.from?.id;

  if (!userId) {
    bot.sendMessage(chatId, "Error: Unable to get your user ID.");
    return;
  }

  if (msg.text === "addMeToTheList") {
    await addToList({ userId });
    bot.sendMessage(chatId, "You have been added!");
  } else if (msg.text === "aboutMe") {
    const user = await getUserInfo({ userId });

    if (user?.name) {
      bot.sendMessage(chatId, `You are ${user.name}`);
    } else {
      bot.sendMessage(chatId, "You do not have a name.");
    }
  }
};
