import { TelegramBot, UpdateType } from "TelegramBot";
import { config } from "dotenv";

config({ export: true });

const TOKEN = Deno.env.get("TELEBOT_TOKEN");
if (!TOKEN) throw new Error("Bot token is not provided");
const bot = new TelegramBot(TOKEN);

bot.on(UpdateType.Message, async ({ message }) => {
  const text = message.text || "I can't hear you";
  await bot.sendMessage({
    chat_id: message.chat.id,
    text: text,
  });
});

bot.run({
  polling: true,
});

console.log("bot is running...");
