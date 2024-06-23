import { Context } from "TeleBotGrammy";
import type { CommandHandler, CommandInfo, CommandList } from "types";

declare class StartCommand implements CommandHandler {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    
    private commands: CommandInfo[];
    private commandsList: CommandList[];
    private commandDir: string | undefined;

    private setBotCommands(_commands: CommandList[], ctx: Context): Promise<void>;

    private createListCommands(ctx: Context): Promise<void>;

    public execute(ctx: Context): Promise<void>;
}

export default StartCommand;