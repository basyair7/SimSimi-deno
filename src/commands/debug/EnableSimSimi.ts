import * as Bot from "TeleBotGrammy";
import { CommandHandler } from "handlers";

class EnableSimSimi implements CommandHandler {
    readonly id = 2;
    readonly name = "simsimi_enable";
    readonly description: string = "Enable SimSimi response";

    private enable: boolean;

    constructor() {
        this.enable = true;
    }

    execute(ctx: Bot.Context): void {
        this.enable = true;
        ctx.reply("SimSimi has been enabled.");
    }

    isEnable(): boolean {
        return this.enable;
    }
}

export default EnableSimSimi;