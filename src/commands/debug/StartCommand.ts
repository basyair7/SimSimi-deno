import { CommandHandler } from "handlers";
import { TelegramBot, Message } from "TelegramBot";

class StartCommand implements CommandHandler {
    readonly id = 0;
    readonly name = 'start';
    readonly description = 'Start the bot';
    
    async execute(bot: TelegramBot, msg: Message): Promise<void> {
        const chatId = msg.chat.id;
        await bot.sendMessage({
            chat_id: chatId, 
            text: "Halo Odan!"
        });
    }
}

export default StartCommand;