import { Context } from "TeleBotGrammy";

export interface CommandHandler {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    execute(ctx: Context): void;
}