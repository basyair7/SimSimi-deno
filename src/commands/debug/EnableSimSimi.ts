import * as TelegramBot from "TelegramBot";
import { CommandHandler } from "handlers";

class EnableSimSimi implements CommandHandler {
    readonly id = 2;
    readonly name = "simsimi_enable";
    readonly description: string = "Enable SimSimi response";

    private enable: boolean;

    constructor() {
        this.enable = true;
    }

    async execute(bot: TelegramBot.TelegramBot, msg: TelegramBot.Message): Promise<void> {
        this.enable = true;
        const chatId = msg.chat.id;
        await bot.sendMessage({
            chat_id: chatId, 
            text: "SimSimi has been enabled."
        });
    }

    isEnable(): boolean {
        return this.enable;
    }
}

export default EnableSimSimi;