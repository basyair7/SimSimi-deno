import * as Bot from "TeleBotGrammy";
import type { CommandHandler } from "types";

class DisableSimSimi implements CommandHandler {
    readonly id = 3;
    readonly name = "simsimi_disable";
    readonly description: string = "Disable SimSimi response";

    // private enable!: boolean;

    public execute(ctx: Bot.Context): void {
        // this.enable = false;
        ctx.reply("SimSimi has been Disabled.");
    }
}

export default DisableSimSimi;