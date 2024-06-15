// import { TelegramBot, UpdateType } from "TelegramBot";
// import { config } from "dotenv";

// config({ export: true });

// const TOKEN = Deno.env.get("TELEBOT_TOKEN");
// if (!TOKEN) throw new Error("Bot token is not provided");
// const bot = new TelegramBot(TOKEN);

// bot.on(UpdateType.Message, async ({ message }) => {
//   const text = message.text || "I can't hear you";
//   await bot.sendMessage({
//     chat_id: message.chat.id,
//     text: text,
//   });
// });

// bot.run({
//   polling: true,
// });

// console.log("bot is running...");


import { Bot } from "https://deno.land/x/grammy@v1.24.1/mod.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";

config({ export: true });
const TOKEN = Deno.env.get("TELEBOT_TOKEN");
if (!TOKEN) throw new Error("Bot token is not provided");

const bot: Bot = new Bot(TOKEN);

bot.on("message:text", (ctx) => {
  const chatId = ctx.message.chat.id;
  const text = ctx.message.text;
  ctx.reply(`${text} (${chatId})`);
});

bot.start();
console.log("Bot is running...");