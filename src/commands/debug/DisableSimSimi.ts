import * as TelegramBot from "TelegramBot";
import { CommandHandler } from "handlers";

class DisableSimSimi implements CommandHandler {
    readonly id = 3;
    readonly name = "simsimi_disable";
    readonly description: string = "Disable SimSimi response";

    private enable: boolean;

    constructor() {
        this.enable = false;
    }

    async execute(bot: TelegramBot.TelegramBot, msg: TelegramBot.Message): Promise<void> {
        this.enable = false;
        const chatId = msg.chat.id;
        await bot.sendMessage({
            chat_id: chatId, 
            text: "SimSimi has been Disabled."
        });
    }

    isEnable(): boolean {
        return this.enable;
    }
}

export default DisableSimSimi;