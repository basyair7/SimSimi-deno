import { Context } from "https://deno.land/x/grammy@v1.24.1/context.ts";
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