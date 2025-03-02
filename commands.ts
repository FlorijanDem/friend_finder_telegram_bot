import { bot } from "./bot.ts";
import {
  handleStart,
  handleNameChange,
  handleMessage,
} from "./controllers/userController.ts";


// /start command
bot.onText(/\/start/, handleStart);

// /name command
bot.onText(/\/name (.+)/, handleNameChange);

// Handle button messages
bot.on("message", handleMessage);