import * as TelegramBot from "TelegramBot";
import { CommandHandler } from "../../handlers/CommandHandler.ts";

class DisableSimSimi implements CommandHandler {
    readonly id = 3;
    readonly name = "simsimi_disable";
    readonly description: string = "Disable SimSimi response";

    private enable: boolean;

    constructor() {
        this.enable = false;
    }

    execute(bot: TelegramBot.TelegramBot, msg: TelegramBot.Message): void {
        this.enable = false;
        const chatId = msg.chat.id;
        bot.sendMessage({
            chat_id: chatId, 
            text: "SimSimi has been Disabled."
        });
    }

    isEnable(): boolean {
        return this.enable;
    }
}

export default DisableSimSimi;