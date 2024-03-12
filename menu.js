
//показывать меню
export function showMenu() {
  return {
    reply_markup: {
      keyboard: [["Показать котиков", "Закрыть меню"]],
      resize_keyboard: true,
    },
  };
}

export const openMenu = (bot, chatId) => {
    bot.telegram.sendMessage(chatId, "Что бы увидеть забавных котиков, выберите 'Показать котиков'", showMenu())
};

//закрыть меню
export const closeMenu = async (bot, chatId) => {
    const messageId = await bot.telegram.sendMessage(chatId, "Для повторного открытия меню, введите 'меню' или нажмите сюда /start", {
        reply_markup: {
            remove_keyboard: true
        }
    })
    // bot.telegram.deleteMessage(chatId, messageId.message_id)
}
