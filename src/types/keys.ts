import { Context } from "TeleBotGrammy";

interface SimSimiKeysType {
    RegionSimSimi: string,
    SimSimiAPIUrl: string,
    SimSimiAPIKeys: string
}

interface TelegramKeysType {
    TeleBotToken: string,
    TeleBotUsername: string
}

interface CommandHandler {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    execute(ctx: Context): void;
}

interface CommandInfo {
    id: number;
    name: string;
    description: string;
}

export type {
    SimSimiKeysType,
    TelegramKeysType,
    CommandHandler,
    CommandInfo
};