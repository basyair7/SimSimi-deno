import { Context } from "TeleBotGrammy";
import type { CommandHandler, CommandInfo } from "types";

declare class HelpCommand implements CommandHandler {
    readonly id: number;
    readonly name: string;
    readonly description: string;

    private commands: CommandInfo[];
    private commandDir: string | undefined;

    public execute(ctx: Context): Promise<void>;
}

export default HelpCommand;