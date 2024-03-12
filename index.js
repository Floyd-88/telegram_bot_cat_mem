
import express from 'express'
import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { config } from "./config.js";
import { getCat } from "./cat.js";
import { showMenu, closeMenu } from "./menu.js";

const app = express()
const PORT = 3000

app.get('/', (req, res) => {
    res.send('This telegram bot')
})

const bot = new Telegraf(config.telegramToken);

bot.start((ctx) => {
  try {
    ctx.reply(
      `${
        ctx.from.first_name ? ctx.from.first_name + ", добро" : "Добро"
      } пожаловать в бот.`
    );
    showMenu(bot, ctx.chat.id);
  } catch (error) {
    console.log(error);
  }
});

bot.command('time', ctx => {
    ctx.reply(String(new Date()))
})

bot.on(message("text"), async (ctx) => {
  const chatId = ctx.chat.id;

  switch (ctx.text) {
    case "меню" || "Меню":
      showMenu(bot, chatId);
      break;

    case "Меню":
        showMenu(bot, chatId);
        break;

    case "Показать котиков":
      let cat = await getCat();
      ctx.reply(cat);
      break;

    case "Закрыть меню":
      closeMenu(bot, chatId);
      break;

    default:
      const msgWait = await bot.telegram.sendMessage(
        chatId,
        `Бот генерирует ответ...`
      );
      setTimeout(() => {
        bot.telegram
          .editMessageText(
            chatId,
            msgWait.message_id,
            null,
            `Такой команды не найдено!!!`
          )
          .then((response) => {
            if (response) {
              console.log("Message ediit successfully");
            } else {
              console.error("Failed to edir message:", response.description);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }, 1000);
      break;
  }
});

bot.on("edited_message", (ctx) => {
  ctx.reply("Вы успешно изменили сообщение");
});



bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));


app.listen(PORT, () => console.log(`My server is running on port ${PORT}`))