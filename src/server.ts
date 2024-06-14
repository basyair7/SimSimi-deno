import { config } from "dotenv";
import ServiceApp from "./app/ServiceApp.ts";
import { TelegramKeys, SimSimiKeys } from "./keys/index.ts";

// Load configuration from .env file
config({ export: true });

const simsimikeys: SimSimiKeys = SimSimiKeys.getInstance(
    Deno.env.get("SIMSIMI_APIURL"),
    Deno.env.get("SIMSIMI_APIKEYS"),
    Deno.env.get("REGION")
);
const botToken1: TelegramKeys = TelegramKeys.getInstance(Deno.env.get("TELEBOT_TOKEN"), Deno.env.get("TELEBOT_USERNAME"));

const bot1: ServiceApp = new ServiceApp(
    botToken1.TeleBotToken, 
    botToken1.TeleBotUsername,
    simsimikeys.SimSimiAPIUrl, 
    simsimikeys.SimSimiAPIKeys, 
    simsimikeys.RegionSimSimi
);

bot1.run();