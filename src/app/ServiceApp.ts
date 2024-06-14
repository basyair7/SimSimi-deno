import { HelpCommand, StartCommand, EnableSimSimi, DisableSimSimi } from "../commands/index.ts";
import { CommandHandler } from "../handlers/CommandHandler.ts";
import { MessageHandler } from "../handlers/index.ts";
import { TelegramBot, UpdateType } from "TelegramBot";

export default class ServiceApp {
    private bot: TelegramBot;
    private username: string;
    private messageHandler: MessageHandler;
    private commands: CommandHandler[]; // Type any for now, since TypeScript for Deno lacks specific typings
    private simsimiEnable: boolean;

    constructor(
        private TeleBotToken: string,
        private TeleBotUsername: string,
        private SimSimiAPIUrl: string,
        private SimSimiAPIKeys: string,
        private RegionSimSimi: string
    ) {
        // initializing bot
        this.username = TeleBotUsername;
        this.bot = new TelegramBot(this.TeleBotToken);

        // initializing message handler
        this.messageHandler = new MessageHandler(this.SimSimiAPIUrl, this.SimSimiAPIKeys, this.RegionSimSimi);
        
        // initializing commands
        this.commands = [
            new HelpCommand(),
            new StartCommand(),
            new EnableSimSimi(),
            new DisableSimSimi(),
        ];

        this.simsimiEnable = false;
    }

    private commandRegExp(command: string): RegExp {
        return new RegExp(`^/${command}(?:@${this.username})?(?:\\s+(.*))?$`, 'i');
    }

    private initialize(): void {
         // Handle incoming messages
         this.bot.on(UpdateType.Message, async ({ message }) => {
            if (message.text && message.text.startsWith('/')) {
                for (const command of this.commands) {
                    const match = message.text.match(this.commandRegExp(command.name));
                    if (match) {
                        if (command instanceof EnableSimSimi || command instanceof DisableSimSimi) {
                            this.simsimiEnable = command instanceof EnableSimSimi;
                        }
                        await command.execute(this.bot, message);
                        return; // Stop further processing
                    }
                }
            } else if (this.simsimiEnable) {
                await this.messageHandler.handle(this.bot, message);
            }
        });
    }

    public run(): void {
        this.initialize();
        this.bot.run({
            polling: true,
        });
        console.log("Bot is running...");
    }
}
