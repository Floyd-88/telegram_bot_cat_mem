export const showMenu = (bot, chatId) => {
    bot.telegram.sendMessage(chatId, "Выберите действие:", {
        reply_markup: {
            keyboard: 
            [
                ["Показать котиков"],
                ["Закрыть меню"]
            ],
        }
    })
};

export const closeMenu = (bot, chatId) => {
    bot.telegram.sendMessage(chatId, "Вы закрыли меню", {
        reply_markup: {
            remove_keyboard: true
        }
    })
}