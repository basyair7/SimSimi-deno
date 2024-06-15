import * as Bot from "TeleBotGrammy";
import { CommandHandler } from "handlers";

class DisableSimSimi implements CommandHandler {
    readonly id = 3;
    readonly name = "simsimi_disable";
    readonly description: string = "Disable SimSimi response";

    private enable: boolean;

    constructor() {
        this.enable = false;
    }

    execute(ctx: Bot.Context): void {
        this.enable = false;
        // const chatId = ctx.message?.chat.id!;
        ctx.reply("SimSimi has been Disabled.");
    }

    isEnable(): boolean {
        return this.enable;
    }
}

export default DisableSimSimi;