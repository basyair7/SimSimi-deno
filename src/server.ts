import * as dotenv from "dotenv";
import ServiceApp from "ServiceApp";
import { TelegramKeys, SimSimiKeys } from "keys";

// Load configuration from .env file
dotenv.config({ export: true });

const simsimikeys: SimSimiKeys = SimSimiKeys.getInstance(
    Deno.env.get("SIMSIMI_APIURL"),
    Deno.env.get("SIMSIMI_APIKEYS"),
    Deno.env.get("REGION")
);
const botToken: TelegramKeys = TelegramKeys.getInstance(Deno.env.get("TELEBOT_TOKEN"), Deno.env.get("TELEBOT_USERNAME"));

new ServiceApp(
    botToken.TeleBotToken, 
    botToken.TeleBotUsername,
    simsimikeys.SimSimiAPIUrl, 
    simsimikeys.SimSimiAPIKeys, 
    simsimikeys.RegionSimSimi
).run();