const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
require("dotenv").config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Kerakli tashabbus sahifasining URL manzili
const tashabbusURL =
  "https://t.me/ochiqbudjet_009_bot?start=050365194002";

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
    "37-maktabga ovoz berish uchun quyidagi tugmani bosing, botni ishga tushiring va biroz kuting:",
    opts
  );
});

console.log("Bot ishga tushdi...");

// 🌐 Render botni o‘chirib qo‘ymasligi uchun Express server
const app = express();
app.get("/", (req, res) => res.send("Bot ishlayapti!"));

// 🚀 Har 5 daqiqada Render botni "tirik" deb bilishi uchun ping
setInterval(() => {
  fetch("https://three7-4fvo.onrender.com").catch(() => {});
}, 5 * 60 * 1000); // 5 daqiqada bir ping

// 🎧 Serverni ishga tushirish
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Keep-alive server ${PORT} portda ishlayapti`);
});
