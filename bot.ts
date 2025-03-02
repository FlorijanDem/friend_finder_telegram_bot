import TelegramBot from "node-telegram-bot-api";
import { TELEGRAM_API_KEY } from "./config.ts";

export const bot = new TelegramBot(TELEGRAM_API_KEY, { polling: true });