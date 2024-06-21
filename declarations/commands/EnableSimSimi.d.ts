import { Context } from "TeleBotGrammy";
import { CommandHandler } from "types";

declare class EnableSimSimi implements CommandHandler {
    readonly id: number;
    readonly name: string;
    readonly description: string;

    public execute(ctx: Context): void;
}

export default EnableSimSimi;