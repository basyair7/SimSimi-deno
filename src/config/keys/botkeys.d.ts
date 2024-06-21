import { TelegramKeysType } from "types";

declare class TelegramKeys implements TelegramKeysType {
    public TeleBotToken: string;
    public TeleBotUsername: string;
    public ServerTimeZone: string;

    constructor(BotToken?: string, BotUsername?: string, TimeZone?: string);

    private validateKeys(): void;

    public static getInstance(BotToken?: string, BotUsername?: string, TimeZone?: string): TelegramKeys;
}

export default TelegramKeys;