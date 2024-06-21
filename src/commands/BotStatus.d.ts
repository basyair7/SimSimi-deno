import { Context } from "TeleBotGrammy";
import type { CommandHandler } from "types";

declare class BotStatus implements CommandHandler {
    readonly id: number;
    readonly name: string;
    readonly description: string;

    private information: string;
    private osinfo: string;
    private archinfo: string;
    private target: string;

    constructor();
    
    public execute(ctx: Context): void;
}

export default BotStatus;