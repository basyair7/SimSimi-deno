// deno-lint-ignore-file no-explicit-any
import * as fs from "fs";
import { Bot } from "TeleBotGrammy";
import { MessageHandler } from "handlers";
import type { CommandHandler } from "types";
import EnableSimSimi from "../commands/EnableSimSimi.ts";
import DisableSimSimi from "../commands/DisableSimSimi.ts";

class ServiceApp {
    private bot: Bot;
    private username: string;
    private messageHandler: MessageHandler;
    private commands: CommandHandler[] = []; // Type any for now, since TypeScript for Deno lacks specific typings
    private simsimiEnable: boolean;

    constructor(
        private config: {
            TeleBotToken: string; TeleBotUsername: string; 
            SimSimiAPIUrl: string; SimSimiAPIKeys: string; 
            SimSimiRegion: string
        }
    ) {
        // initializing bot
        this.username = this.config.TeleBotUsername;
        this.bot = new Bot(this.config.TeleBotToken);

        // initializing message handler
        this.messageHandler = new MessageHandler(
            this.config.SimSimiAPIUrl, 
            this.config.SimSimiAPIKeys,
            this.config.SimSimiRegion
        );
        
        // initializing commands
        this.loadCommands();
        this.simsimiEnable = false;
    }

    private loadCommands(): void {
        const _commandsDir = "../commands";
        fs.readdir("./src/commands", (error: any, files: string[]) => {
            if (error) return console.error(error);
            files.forEach(async (file: string) => {
                const _commandModule = await import(`${_commandsDir}/${file}`);
                const _commandClass = _commandModule.default;
                const _commandName = file.split(".")[0];
                if (typeof _commandClass === 'function' && !_commandName.endsWith(".disable")) { 
                    console.log(`[Command Manager]: Loading Command ${_commandName}`);
                    this.commands.push(new _commandClass());
                }
            }); 
        });
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