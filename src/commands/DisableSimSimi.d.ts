import { Context } from "TeleBotGrammy";
import type { CommandHandler } from "types";

declare class DisableSimSimi implements CommandHandler {
    readonly id: number;
    readonly name: string;
    readonly description: string;

    public execute(ctx: Context): void;
}

export default DisableSimSimi;