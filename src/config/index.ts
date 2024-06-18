import * as dotenv from "dotenv";
import { TelegramKeys, SimSimiKeys } from "keys";

// Load configuration from .env file
dotenv.config({ export: true });

const botToken: TelegramKeys = TelegramKeys.getInstance(Deno.env.get("TELEBOT_TOKEN"), Deno.env.get("TELEBOT_USERNAME"));
const simsimikeys: SimSimiKeys = SimSimiKeys.getInstance(
    Deno.env.get("SIMSIMI_APIURL"),
    Deno.env.get("SIMSIMI_APIKEYS"),
    Deno.env.get("REGION")
);

const config = {
    TeleBotToken: botToken.TeleBotToken,
    TeleBotUsername: botToken.TeleBotUsername,
    SimSimiAPIUrl: simsimikeys.SimSimiAPIUrl,
    SimSimiAPIKeys: simsimikeys.SimSimiAPIKeys,
    RegionSimSimi: simsimikeys.RegionSimSimi,
};

export default config;
