import { Context } from "TeleBotGrammy";
import { SimSimiCommand } from "./SimSimiCommands.ts";

export declare class MessageHandler extends SimSimiCommand {
    private text: string;
    private _reply: string;

    constructor(SimSimiAPIUrl: string, SimSimiAPIKeys: string, SimSimiRegion: string);

    public simsimi_enable(ctx: Context): Promise<void>;

    public message_bot(ctx: Context): void;
}