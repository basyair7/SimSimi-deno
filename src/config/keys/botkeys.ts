import { TelegramKeysType } from "types";

class TelegramKeys implements TelegramKeysType {
    public TeleBotToken: string;
    public TeleBotUsername: string;
    public serverTimeZone: string;

    constructor(BotToken?: string, BotUsername?: string, TimeZone?: string) {
        this.TeleBotToken = BotToken ?? 'nil';
        this.TeleBotUsername = BotUsername ?? 'nil';
        this.serverTimeZone = TimeZone ?? 'nil';
        this.validateKeys();
    }

    private validateKeys(): void {
        if(Object.values(this).includes('nil'))
            throw new Error("Not all ENV variables are defined!");
    }

    public static getInstance(BotToken?: string, BotUsername?: string, TimeZone?: string): TelegramKeys {
        return new TelegramKeys(BotToken, BotUsername, TimeZone);
    }
}

export default TelegramKeys;