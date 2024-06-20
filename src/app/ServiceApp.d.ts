import { Bot } from "TeleBotGrammy";
import { MessageHandler } from "handlers";
import type { CommandHandler } from "types";

declare class ServiceApp {
    private bot: Bot;
    private username: string;
    private messageHandler: MessageHandler;
    private commands: CommandHandler[];

    constructor(config: {
        TeleBotToken: string;
        TeleBotUsername: string;
        SimSimiAPIUrl: string;
        SimSimiAPIKeys: string;
        SimSimiRegion: string;
    });

    private loadCommands(): void;

    private commandRegExp(command: string): RegExp;

    private initialize(): void;

    public run(): void;
}