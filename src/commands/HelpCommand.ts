import { Context } from "TeleBotGrammy";
import * as path from "path";
import type { CommandHandler, CommandInfo } from "types";

class HelpCommand implements CommandHandler {
    readonly id = 1;
    readonly name = 'help';
    readonly description = 'Get help';

    private commands!: CommandInfo[];
    private commandDir: string | undefined;

    public async execute(ctx: Context): Promise<void> {
        this.commands = [];
        this.commandDir = path.dirname(path.fromFileUrl(import.meta.url));
        let _helpMessage: string = "Here are some commands you can use:\n";
        try {
            for await (const entry of Deno.readDir(this.commandDir)) {
                if (entry.isFile && entry.name.endsWith('.ts') && entry.name !== "StartCommand.ts") 
                {
                    const _filePath = path.join(this.commandDir, entry.name);
                    const _fileUrl = path.toFileUrl(_filePath).href; // Convert to file URL
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
                        } else {
                            console.error('Invalid command class:', _commandInstance);
                        }
                    } else {
                        console.error('Invalid command module:', _commandClass);
                    }
                }
            }

            this.commands.sort((a, b) => a.id - b.id);
            this.commands.forEach(command => {
                _helpMessage += `/${command.name} - ${command.description}\n`;
            });
            
        } 
        catch (error) {
            console.error(error);
            _helpMessage += "An error occurred while generating the help list.";
        }

        await ctx.reply(_helpMessage);
    }
}

export default HelpCommand;
