import { Context } from "TeleBotGrammy";
import { SimSimiCommand } from "./SimSimiCommands.ts";

export class MessageHandler extends SimSimiCommand {
    private text: string = "";
    private _reply: string = "Please reply /help";
    
    constructor(SimSimiAPIUrl: string, SimSimiAPIKeys: string, RegionSimSimi: string) {
        super(SimSimiAPIUrl, SimSimiAPIKeys, RegionSimSimi);
    }

    simsimi_enable(ctx: Context): void {
        this.text = ctx.message?.text?.toString() || "";

        // Ignore command
        if (this.text.startsWith('/')) return;

        this.SimSimi_run(ctx);
    }

    message_bot(ctx: Context): void {
        try {
            this.text = ctx.message?.text?.toString() || "";
            
            // Ignore command
            if (this.text.startsWith('/')) return;

            ctx.reply(this._reply);

        } catch (err) {
            console.error(err);
        }
    }
}