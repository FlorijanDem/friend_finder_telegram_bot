import { bot } from "./bot.ts";
import {
  handleStart,
  handleNameChange,
  handleMessage,
  handleDescriptionChange
} from "./controllers/userController.ts";


// /start command
bot.onText(/\/start/, handleStart);

// /name command
bot.onText(/\/name (.+)/, handleNameChange);

// /description command
bot.onText(/\/description (.+)/, handleDescriptionChange);

// Handle button messages
bot.on("message", handleMessage);