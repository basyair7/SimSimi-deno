import { Context } from "TeleBotGrammy";
import { CommandHandler, CommandList } from "types";

declare class SetCommands implements CommandHandler {
    readonly id: number;
    readonly name: string;
    readonly description: string;

    private commands: CommandList[];
    private commandDir: string | undefined;

    private setBotCommands(_commands: CommandList[]): Promise<string>;
    
    public execute(ctx: Context): void;
}

export default SetCommands;