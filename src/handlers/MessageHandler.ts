import { TelegramBot, Message } from "TelegramBot";
import { SimSimiCommand } from "./SimSimiCommands.ts";

export class MessageHandler extends SimSimiCommand {
    private text: string = "";
    private _reply: string = "Please reply /help";
    
    constructor(SimSimiAPIUrl: string, SimSimiAPIKeys: string, RegionSimSimi: string) {
        super(SimSimiAPIUrl, SimSimiAPIKeys, RegionSimSimi);
    }

    simsimi_enable(bot: TelegramBot, msg: Message): void {
        this.text = msg.text?.toString() || "";

        // Ignore command
        if (this.text.startsWith('/')) return;

        this.SimSimi_run(bot, msg);
    }

    async message_bot(bot: TelegramBot, msg: Message): Promise<void> {
        try {
            this.text = msg.text?.toString() || "";
            const chatId: number = msg.chat.id;
            
            // Ignore command
            if (this.text.startsWith('/')) return;

            await bot.sendMessage({
                chat_id: chatId,
                text: this._reply
            });

        } catch (err) {
            console.error(err);
        }
    }
}