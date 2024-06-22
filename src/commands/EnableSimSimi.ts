import * as Bot from "TeleBotGrammy";
import type { CommandHandler } from "types";

class EnableSimSimi implements CommandHandler {
    readonly id = 5;
    readonly name = "simsimi_enable";
    readonly description: string = "Enable SimSimi response";

    public execute(ctx: Bot.Context): void {
        ctx.reply("SimSimi has been enabled.");
    }
}

export default EnableSimSimi;