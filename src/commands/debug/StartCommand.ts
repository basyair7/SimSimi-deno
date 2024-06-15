import { CommandHandler } from "handlers";
import { Context } from "TeleBotGrammy";

class StartCommand implements CommandHandler {
    readonly id = 0;
    readonly name = 'start';
    readonly description = 'Start the bot';
    
    execute(ctx: Context): void {
        ctx.reply("Welcome! How can I assist you today? Get /help commands?");
    }
}

export default StartCommand;