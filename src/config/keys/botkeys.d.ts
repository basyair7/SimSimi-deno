import { TelegramKeysType } from "types";

declare class TelegramKeys implements TelegramKeysType {
    public TeleBotToken: string;
    public TeleBotUsername: string;

    constructor(BotToken?: string, BotUsername?: string);

    private validateKeys(): void;

    public static getInstance(BotToken?: string, BotUsername?: string): TelegramKeys;
}

export default TelegramKeys;