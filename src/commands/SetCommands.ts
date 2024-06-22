import { Context } from "TeleBotGrammy";
import * as path from "path";
import config from "ConfigBot";
import type { CommandHandler, CommandList } from "types";

class SetCommands implements CommandHandler {
    id = 2;
    name = 'setcommands';
    description = 'change the list of commands';

    private commands!: CommandList[];
    private commandDir: string | undefined;

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
        this.commands = [];
        this.commandDir = path.dirname(path.fromFileUrl(import.meta.url));
        try {
            for await (const entry of Deno.readDir(this.commandDir)) {
                if (entry.isFile && entry.name.endsWith('.ts')) {
                    const _filePath: string = path.join(this.commandDir, entry.name);
                    const _fileUrl: string = path.toFileUrl(_filePath).href;
                    const _commandModule = await import(_fileUrl);
                    const _commandClass = _commandModule.default;

                    if (_commandClass && typeof _commandClass === 'function') {
                        const _commandInstance: CommandHandler = new _commandClass();
                        if ('name' in _commandInstance && 'description' in _commandInstance) {
                            this.commands.push({
                                command: _commandInstance.name,
                                description: _commandInstance.description
                            });
                        }
                        else {
                            console.error(`Invalid command class : ${_commandInstance}`);
                        }
                    }
                    else {
                        console.error(`Invalid command module : ${_commandModule}`);
                    }
                }
            }

            const _reply = await this.setBotCommands(this.commands);
            ctx.reply(`${_reply}, please reply /start`, {parse_mode: "HTML"});

        } catch (error) {
            console.error(error);
            ctx.reply(`Error : <pre>${error}</pre>`, { parse_mode: "HTML"});
        }
    }
}

export default SetCommands;