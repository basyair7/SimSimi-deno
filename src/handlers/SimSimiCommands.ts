import { TelegramBot, Message } from "TelegramBot";

export class SimSimiCommand {
    private simSimiApiUrl: string;
    private simSimiApiKeys: string;
    private region: string;

    constructor(SimSimiAPIUrl: string, SimSimiAPIKeys: string, RegionSimSimi: string) {
        this.simSimiApiUrl = SimSimiAPIUrl;
        this.simSimiApiKeys = SimSimiAPIKeys;
        this.region = RegionSimSimi;

    }

    protected async SimSimi_run(bot: TelegramBot, msg: Message) {
        const chatId: number = msg.chat.id;
        try {
            const message: string = msg.text || "";
            
            if(message.startsWith('/')) return;

            const response = await fetch(this.simSimiApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    text: message,
                    lc: this.region,
                    keys: this.simSimiApiKeys
                })
            });

            if (!response.ok) {
                console.log(response.status);
                console.log(response);
            }

            const responseData = await response.json();
            const botReply: string = responseData.message;
            await bot.sendMessage({
                chat_id: chatId,
                text: botReply
            });

        } catch (error) {
            console.error(error);
        }
    }
}