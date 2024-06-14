import { HelpCommand, StartCommand, EnableSimSimi, DisableSimSimi } from "commands";
import { CommandHandler, MessageHandler } from "handlers";
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
        this.username = this.TeleBotUsername;
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
         this.bot.on(UpdateType.Message, ({ message }) => {
            try {
                if (message.text && message.text.startsWith('/')) {
                    for (const command of this.commands) {
                        const match = message.text.match(this.commandRegExp(command.name));
                        if (match) {
                            if (command instanceof EnableSimSimi || command instanceof DisableSimSimi) {
                                this.simsimiEnable = command instanceof EnableSimSimi;
                            }
                            command.execute(this.bot, message);
                            return; // Stop further processing
                        }
                    }
                } else if (this.simsimiEnable) {
                    this.messageHandler.simsimi_enable(this.bot, message);
                }
                else if (!this.simsimiEnable) {
                    this.messageHandler.message_bot(this.bot, message);
                }
            } catch (error) {
                console.error(error);
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
