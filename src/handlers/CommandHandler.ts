import { TelegramBot, Message } from "TelegramBot";

export interface CommandHandler {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    execute(bot: TelegramBot, msg: Message): void;
}