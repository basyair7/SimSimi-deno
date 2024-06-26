import { Context } from "TeleBotGrammy";

interface SimSimiKeysType {
    SimSimiRegion: string;
    SimSimiAPIUrl: string;
    SimSimiAPIKeys: string;
}

interface TelegramKeysType {
    TeleBotToken: string;
    TeleBotUsername: string;
    ServerTimeZone: string;
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

interface CommandList {
    command: string;
    description: string;
}


export type {
    SimSimiKeysType,
    TelegramKeysType,
    CommandHandler,
    CommandInfo,
    CommandList
};