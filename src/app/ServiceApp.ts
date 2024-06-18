import { HelpCommand, StartCommand, EnableSimSimi, DisableSimSimi, BotStatus } from "commands";
import { CommandHandler, MessageHandler } from "handlers";
import { Bot } from "TeleBotGrammy";

class ServiceApp {
    private bot: Bot;
    private username: string;
    private messageHandler: MessageHandler;
    private commands: CommandHandler[]; // Type any for now, since TypeScript for Deno lacks specific typings
    private simsimiEnable: boolean;

    constructor(
        private config: {
            TeleBotToken: string; TeleBotUsername: string; 
            SimSimiAPIUrl: string; SimSimiAPIKeys: string; 
            RegionSimSimi: string
        }
    ) {
        // initializing bot
        this.username = this.config.TeleBotUsername;
        this.bot = new Bot(this.config.TeleBotToken);

        // initializing message handler
        this.messageHandler = new MessageHandler(
            this.config.SimSimiAPIUrl, 
            this.config.SimSimiAPIKeys,
            this.config.RegionSimSimi
        );
        
        // initializing commands
        this.commands = [
            new HelpCommand(),
            new StartCommand(),
            new EnableSimSimi(),
            new DisableSimSimi(),
            new BotStatus(),
        ];

        this.simsimiEnable = false;
    }

    private commandRegExp(command: string): RegExp {
        return new RegExp(`^/${command}(?:@${this.username})?(?:\\s+(.*))?$`, 'i');
    }

    private initialize(): void {
        // Handle incoming messages
        this.bot.on("message:text", async (ctx) => {
            try {
                if (ctx.message.text && ctx.message.text.startsWith('/')) {
                    for (const command of this.commands) {
                        const match = ctx.message.text.match(this.commandRegExp(command.name));
                        if (match) {
                            if (command instanceof EnableSimSimi || command instanceof DisableSimSimi) {
                                this.simsimiEnable = command instanceof EnableSimSimi;
                            }
                            command.execute(ctx);
                            return; // Stop further processing
                        }
                    }
                } else if (this.simsimiEnable) {
                    await this.messageHandler.simsimi_enable(ctx);
                }
                else if (!this.simsimiEnable) {
                    this.messageHandler.message_bot(ctx);
                }
            } catch (error) {
                console.error(error);
            }
        });
    }

    public run(): void {
        this.initialize();
        this.bot.start();
        console.log("Bot is running...");
    }
}

export default ServiceApp;