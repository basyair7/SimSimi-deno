declare module "dotenv" {
    interface DotenvConfigOptions {
        path?: string;
        export?: boolean;
    }
    function config(options?: DotenvConfigOptions): void;
}

declare module "keys" {
    namespace keys {
        class TelegramKeys {
            static getInstance(token: string, username: string): TelegramKeys;
            TeleBotToken: string;
            TeleBotUsername: string;
        }

        class SimSimiKeys {
            static getInstance(apiUrl: string, apiKey: string, region: string): SimSimiKeys;
            SimSimiAPIUrl: string;
            SimSimiAPIKeys: string;
            RegionSimSimi: string;
        }
    }
    export = keys;
}

interface TypeConfig {
    TeleBotToken: string;
    TeleBotUsername: string;
    SimSimiAPIUrl: string;
    SimSimiAPIKeys: string;
    RegionSimSimi: string;
}

declare class loadConfig {
    public static load(): TypeConfig;
}

declare const _default: TypeConfig;
export default _default;
