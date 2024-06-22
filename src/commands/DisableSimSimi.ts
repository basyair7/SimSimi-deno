import * as Bot from "TeleBotGrammy";
import type { CommandHandler } from "types";

class DisableSimSimi implements CommandHandler {
    readonly id = 6;
    readonly name = "simsimi_disable";
    readonly description: string = "Disable SimSimi response";

    public execute(ctx: Bot.Context): void {
        ctx.reply("SimSimi has been Disabled.");
    }
}

export default DisableSimSimi;