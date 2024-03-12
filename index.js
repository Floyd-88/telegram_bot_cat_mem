
import express from 'express'
import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { config } from "./config.js";
import { getCat } from "./cat.js";
import { showMenu, closeMenu, openMenu } from "./menu.js";

const app = express()
const PORT = 3000

app.get('/', (req, res) => {
    res.send('This telegram bot')
})

const bot = new Telegraf(config.telegramToken);

bot.start((ctx) => {
  try {
    ctx.replyWithHTML(
      `${
        ctx.from.first_name ? ctx.from.first_name + ", добро" : "Добро"
      } пожаловать в <b>catSuperMemBot</b>!\n\n` + "Что бы увидеть забавных котиков, выберите 'Показать котиков'", showMenu()
    );

  } catch (error) {
    console.log(error);
  }
});

bot.hears(['меню', 'Меню'], async ctx => {
    openMenu(bot, ctx.chat.id)
})

bot.hears('Показать котиков', async ctx => {
    let cat = await getCat();
    ctx.reply(cat);
})

bot.hears('Закрыть меню', async ctx => {
    closeMenu(bot, ctx.chat.id);
})

// bot.hears('Смотивируй меня', ctx => {
//     ctx.replyWithPhoto(
//         'https://img2.goodfon.ru/wallpaper/nbig/7/ec/justdoit-dzhastduit-motivaciya.jpg',
//         {
//             caption: 'Не вздумай сдаваться!'
//         }
//     )
// })

bot.on(message("text"), async (ctx) => {
  const chatId = ctx.chat.id;

    //   const msgWait = await bot.telegram.sendMessage(
    //     chatId,
    //     `Бот генерирует ответ...`
    //   );
        bot.telegram
          .sendMessage(
            chatId,
            `Такой команды не найдено!!!\n\n` + `"Что бы посмотреть доступные команды, введите /help"`
          )
          .then((response) => {
            if (response) {
              console.log("New message create");
            } else {
              console.error("Failed to create message:", response.description);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
});

bot.on("edited_message", (ctx) => {
  ctx.reply("Вы успешно изменили сообщение");
});



bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));


app.listen(PORT, () => console.log(`My server is running on port ${PORT}`))