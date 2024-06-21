import * as dotenv from "dotenv";
import * as keys from "./keys/index.ts";


// Load configuration from .env file
dotenv.config({ export: true });

interface TypeConfig {
    TeleBotToken: string;
    TeleBotUsername: string;
    ServerTimeZone: string;
    SimSimiAPIUrl: string;
    SimSimiAPIKeys: string;
    SimSimiRegion: string;
}

class loadConfig {
    public static load(): TypeConfig {        
        const _botToken: keys.TelegramKeys = keys.TelegramKeys.getInstance(
            Deno.env.get("TELEBOT_TOKEN"),
            Deno.env.get("TELEBOT_USERNAME"),
            Deno.env.get("SERVERTIMEZONE")
        );
        const _simsimikeys: keys.SimSimiKeys = keys.SimSimiKeys.getInstance(
            Deno.env.get("SIMSIMI_APIURL"),
            Deno.env.get("SIMSIMI_APIKEYS"),
            Deno.env.get("REGION")
        );

        return {        
            TeleBotToken: _botToken.TeleBotToken,
            TeleBotUsername: _botToken.TeleBotUsername,
            ServerTimeZone: _botToken.ServerTimeZone,
            SimSimiAPIUrl: _simsimikeys.SimSimiAPIUrl,
            SimSimiAPIKeys: _simsimikeys.SimSimiAPIKeys,
            SimSimiRegion: _simsimikeys.SimSimiRegion,
        }
    }
}

export default loadConfig.load();
