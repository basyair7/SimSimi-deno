import * as TelegramBot from "TelegramBot";
import { CommandHandler } from "../../handlers/CommandHandler.ts";

class EnableSimSimi implements CommandHandler {
    readonly id = 2;
    readonly name = "simsimi_enable";
    readonly description: string = "Enable SimSimi response";

    private enable: boolean;

    constructor() {
        this.enable = true;
    }

    execute(bot: TelegramBot.TelegramBot, msg: TelegramBot.Message): void {
        this.enable = true;
        const chatId = msg.chat.id;
        bot.sendMessage({
            chat_id: chatId, 
            text: "SimSimi has been enabled."
        });
    }

    isEnable(): boolean {
        return this.enable;
    }
}

export default EnableSimSimi;