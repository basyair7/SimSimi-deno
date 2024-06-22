import { Context } from "TeleBotGrammy";
import type { CommandHandler } from "types";

class StartCommand implements CommandHandler {
    readonly id = 0;
    readonly name = 'start';
    readonly description = 'Start the bot';
    
    public execute(ctx: Context): void {
        ctx.reply("Welcome! how can I assist you today? Get /menu commands? or setup your bot /setcommands");
    }
}

export default StartCommand;