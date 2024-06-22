import { Context } from "TeleBotGrammy";
import createText from "../models/createText.d.ts";
import type { CommandHandler, CommandInfo } from "types";


declare class CreateTextCommands implements CommandHandler {
    readonly id: number;
    readonly name: string;
    readonly description: string;

    private commands: CommandInfo[];
    private commandDir: string | undefined;
    private writeCommands: createText;

    public execute(ctx: Context): void;
}

export default CreateTextCommands;