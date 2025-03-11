const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
require("dotenv").config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Kerakli tashabbus sahifasining URL manzili
const tashabbusURL =
  "https://t.me/ochiqbudjet_02_bot?start=050374499012";

// Foydalanuvchi botni ishga tushirganda "Ovoz berish" tugmasini chiqarish
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const opts = {
    reply_markup: {
      inline_keyboard: [[{ text: "🗳 Ovoz berish", url: tashabbusURL }]],
    },
  };

  bot.sendMessage(
    chatId,
    "23-maktabga ovoz berish uchun quyidagi tugmani bosing:",
    opts
  );
});

console.log("Bot ishga tushdi...");

// 🌐 Render botni o‘chirib qo‘ymasligi uchun Express server
const app = express();
app.get("/", (req, res) => res.send("Bot ishlayapti!"));

// 🚀 Har 5 daqiqada Render botni "tirik" deb bilishi uchun ping
setInterval(() => {
  fetch("https://ovoz-bot-90lu.onrender.com").catch(() => {});
}, 5 * 60 * 1000); // 5 daqiqada bir ping

// 🎧 Serverni ishga tushirish
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Keep-alive server ${PORT} portda ishlayapti`);
});
