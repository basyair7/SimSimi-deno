import { Context } from "TeleBotGrammy";
import * as path from "path";
import config from "ConfigBot";
import type { CommandHandler, CommandInfo, CommandList } from "types";

class SetCommands implements CommandHandler {
    readonly id = 2;
    readonly name = 'setcommands';
    readonly description = 'change the list of commands';

    private commands!: CommandInfo[];
    private commandsList!: CommandList[];
    private commandDir: string | undefined;

    private async createListCommands(ctx: Context): Promise<void> {
        this.commands = [];
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

        } catch (error) {
            console.error(`Error : ${error}`);
            ctx.reply(`Error : <pre>${error}</pre>`, { parse_mode: "HTML" });
        }
    }

    private async setBotCommands(_commands: CommandList[]): Promise<string> {
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
            return "Commands set successfully";
        }
        else {
            console.error("Failed to set commands : ", _data.description);
            return `Failed to set commands : <pre>${_data.description}</pre>`;
        }
    }

    async execute(ctx: Context): Promise<void> {
        try {
            this.createListCommands(ctx);
            this.commandsList = [];
            this.commands.sort((a, b) => a.id - b.id);
            
            for (const commandList of this.commands) {
                this.commandsList.push({
                    command: commandList.name,
                    description: commandList.description
                });
            }

            const _reply = await this.setBotCommands(this.commandsList);
            ctx.reply(`${_reply}, please reply /start`, { parse_mode: 'HTML' });
        
        } catch (error) {
            console.error(error);
            ctx.reply(`Error : <pre>${error}</pre>`, { parse_mode: 'HTML' });
        }
    }
}

export default SetCommands;