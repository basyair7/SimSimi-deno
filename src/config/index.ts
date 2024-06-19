import * as dotenv from "dotenv";
import * as keys from "./keys/index.ts";


// Load configuration from .env file
dotenv.config({ export: true });

interface TypeConfig {
    TeleBotToken: string,
    TeleBotUsername: string,
    SimSimiAPIUrl: string,
    SimSimiAPIKeys: string,
    RegionSimSimi: string
}

class loadConfig {
    public static load(): TypeConfig {        
        const _botToken: keys.TelegramKeys = keys.TelegramKeys.getInstance(
            Deno.env.get("TELEBOT_TOKEN"),
            Deno.env.get("TELEBOT_USERNAME")
        );
        const _simsimikeys: keys.SimSimiKeys = keys.SimSimiKeys.getInstance(
            Deno.env.get("SIMSIMI_APIURL"),
            Deno.env.get("SIMSIMI_APIKEYS"),
            Deno.env.get("REGION")
        );

        return {        
            TeleBotToken: _botToken.TeleBotToken,
            TeleBotUsername: _botToken.TeleBotUsername,
            SimSimiAPIUrl: _simsimikeys.SimSimiAPIUrl,
            SimSimiAPIKeys: _simsimikeys.SimSimiAPIKeys,
            RegionSimSimi: _simsimikeys.RegionSimSimi,
        }
    }
}

export default loadConfig.load();
