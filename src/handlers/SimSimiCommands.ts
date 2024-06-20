import { Context } from "TeleBotGrammy";

export class SimSimiCommand {
    private simSimiApiUrl: string;
    private simSimiApiKeys: string;
    private region: string;

    constructor(SimSimiAPIUrl: string, SimSimiAPIKeys: string, SimSimiRegion: string) {
        this.simSimiApiUrl = SimSimiAPIUrl;
        this.simSimiApiKeys = SimSimiAPIKeys;
        this.region = SimSimiRegion;

    }

    protected async SimSimi_run(ctx: Context): Promise<void> {
        try {
            const message: string = ctx.message?.text || "";
            
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

            ctx.reply(botReply);

        } catch (error) {
            console.error(error);
        }
    }
}