import { Context } from "TeleBotGrammy";
import * as path from "path";
import config from "ConfigBot";
import type { CommandHandler, CommandInfo, CommandList } from "types";

class StartCommand implements CommandHandler {
    readonly id = 0;
    readonly name = 'start';
    readonly description = 'Start the bot';

    private commands!: CommandInfo[];
    private commandsList!: CommandList[];
    private commandDir: string | undefined;

    private async setBotCommands(_commands: CommandList[], ctx: Context): Promise<void> {
        const _payload = { commands: _commands };
        const _response = await fetch(`https://api.telegram.org/bot${config.TeleBotToken}/setMyCommands`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(_payload)
        });

        const _data = await _response.json();
        if (_data.ok) {
            // return "Commands set successfully";
        }
        else {
            console.error("Failed to seet commands : ", _data.description);
            ctx.reply(`Failed to set commands : <pre>${_data.description}</pre>`, { parse_mode: "HTML" });
        }
    }

    private async createListCommands(ctx: Context): Promise<void> {
        this.commands = [];
        this.commandsList = [];
        this.commandDir = path.dirname(path.fromFileUrl(import.meta.url));
        try {
            for await (const entry of Deno.readDir(this.commandDir)) {
                if (entry.isFile && entry.name.endsWith('ts')) {
                    const _filePath: string = path.join(this.commandDir, entry.name);
                    const _fileUrl: string = path.toFileUrl(_filePath).href;
                    const _commandModule = await import(_fileUrl);
                    const _commandClass = _commandModule.default;

                    if (_commandClass && typeof _commandClass === 'function') {
                        const _commandInstance: CommandHandler = new _commandClass();
                        if ('name' in _commandInstance && 'description' in _commandInstance) {
                            this.commands.push({
                                id: _commandInstance.id,
                                name: _commandInstance.name,
                                description: _commandInstance.description
                            });
                        }
                        else {
                            console.error(`Invalid command class: ${_commandClass}`);
                            ctx.reply(`Invalid command class : <pre>${_commandClass}</pre>`, { parse_mode: 'HTML' });
                        }
                    }
                    else {
                        console.error(`Invalid command Module: ${_commandModule}`);
                        ctx.reply(`Invalid command Module : <pre>${_commandModule}</pre>`);
                    }
                }
            }

            this.commands.sort((a, b) => a.id - b.id);
            for (const commandList of this.commands) {
                this.commandsList.push({
                    command: commandList.name,
                    description: commandList.description
                });
            }
            this.setBotCommands(this.commandsList, ctx);
            ctx.reply("Welcome! how can I assist you today? Get /help commands?");

        } catch (error) {
            console.error(`Error : ${error}`);
            ctx.reply(`Error : <pre>${error}</pre>`, { parse_mode: "HTML" });
        }
    }
    
    public async execute(ctx: Context): Promise<void> {
        await this.createListCommands(ctx);
    }
}

export default StartCommand;