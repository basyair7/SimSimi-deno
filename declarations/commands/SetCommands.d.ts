import { Context } from "TeleBotGrammy";
import type { CommandHandler, CommandInfo, CommandList } from "types";

declare class SetCommands implements CommandHandler {
    readonly id: number;
    readonly name: string;
    readonly description: string;

    private commands: CommandInfo[];
    private commandsList: CommandList[];
    private commandDir: string | undefined;

    private createListCommands(ctx: Context): Promise<void>;

    private setBotCommands(_commands: CommandList[]): Promise<string>;

    public execute(ctx: Context): void;
}

export default SetCommands;