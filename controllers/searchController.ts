import { bot } from "../bot.ts";
import TelegramBot from "node-telegram-bot-api";
import { searchByName } from "../models/searchModel.ts";

export const handleSearchByName = async (
  msg: TelegramBot.Message,
  match: RegExpExecArray | null
) => {
  if (!match || !match[1]) {
    bot.sendMessage(
      msg.chat.id,
      "Please enter name after /searchByName, e.g., /searchByName John"
    );
    return;
  }

  const name = match[1];
  const result = await searchByName(name);
  console.log(result);
  bot.sendMessage(
    msg.chat.id,
    `Result name: ${result.name}, description: ${result.description}`
  );
};
