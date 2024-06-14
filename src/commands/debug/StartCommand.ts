import { CommandHandler } from "../../handlers/CommandHandler.ts";
import { TelegramBot, Message } from "TelegramBot";

class StartCommand implements CommandHandler {
    readonly id = 0;
    readonly name = 'start';
    readonly description = 'Start the bot';
    
    execute(bot: TelegramBot, msg: Message) {
        const chatId = msg.chat.id;
        bot.sendMessage({
            chat_id: chatId, 
            text: "Welcome! How can I assist you today? Get /help commands?"
        });
    }
}

export default StartCommand;