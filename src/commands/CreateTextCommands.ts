import { Context } from "TeleBotGrammy";
import * as path from "path";
import config from "ConfigBot";
import createText from "../models/createText.ts";
import _valueHeaderText from "../types/HeaderCreateText.ts";
import type { CommandHandler, CommandInfo } from "types";

class CreateTextCommands implements CommandHandler {
    id = 0;
    name = "createtextcommands";
    description = "Generate a list of commands into a .txt file";

    private commands!: CommandInfo[];
    private commandDir: string | undefined;
    private writeCommands: createText;

    constructor() {
        this.writeCommands = new createText(config.OutputPathText);
    }

    async execute(ctx: Context): Promise<void> {
        this.commands = [];
        this.commandDir = path.dirname(path.fromFileUrl(import.meta.url));
        let _menuMsg: string = "Creating a text file : \n";
        try {
            for await (const entry of Deno.readDir(this.commandDir)) {
                if (entry.isFile && entry.name.endsWith('.ts')) {
                    const _filePath: string = path.join(this.commandDir, entry.name);
                    const _fileUrl: string = path.toFileUrl(_filePath).href;
                    const _commandModule = await import(_fileUrl);
                    const _commandClass = _commandModule.default;

                    if (_commandClass && typeof _commandClass === 'function') {
                        const _commandInstance: CommandHandler = new _commandClass();
                        if ('name' in  _commandInstance && 'description' in _commandInstance) {
                            this.commands.push({
                                id: _commandInstance.id,
                                name: _commandInstance.name,
                                description: _commandInstance.description
                            });
                        } else {
                            console.error(`Invalid command class : ${_commandInstance}`);
                        }
                    } else {
                        console.error(`Invalid command module : ${_commandModule}`);
                    }
                }
            }
            
            let _valueCommands: string = "";
            this.commands.sort((a, b) => a.id - b.id);
            this.commands.forEach(command => {
                _valueCommands += `${command.name} - ${command.description}\n`;
            });
            _menuMsg += await this.writeCommands.writeToFile(`${_valueHeaderText(config.TeleBotUsername)}\n${_valueCommands}`);
            _menuMsg += `\n\n${_valueHeaderText(config.TeleBotUsername)}<pre>${_valueCommands}</pre>`;

        } catch (error) {
            console.error(error);
            _menuMsg += `Error : ${error}\n`;
        }

        await ctx.reply(_menuMsg, { parse_mode: "HTML" });
    }
}

export default CreateTextCommands;