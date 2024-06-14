import * as path from "path";
import { CommandHandler, CommandInfo } from "../../handlers/index.ts";
import { TelegramBot, Message } from "TelegramBot";

class HelpCommand implements CommandHandler {
    readonly id = 1;
    readonly name = 'help';
    readonly description = 'Get help';

    async execute(bot: TelegramBot, msg: Message): Promise<void> {
        const chatId: number = msg.chat.id;
        const commandDir: string = path.dirname(path.fromFileUrl(import.meta.url));
        const commands: CommandInfo[] = [];
        let helpMessage: string = "Here are some commands you can use:\n";

        try {
            for await (const entry of Deno.readDir(commandDir)) {
                if (entry.isFile && entry.name.endsWith('.ts') && entry.name !== "StartCommand.ts") {
                    const filePath = path.join(commandDir, entry.name);
                    const fileUrl = path.toFileUrl(filePath).href; // Convert to file URL
                    const commandModule = await import(fileUrl);
                    const CommandClass = commandModule.default;

                    if (CommandClass && typeof CommandClass === 'function') {
                        const commandInstance: CommandHandler = new CommandClass();
                        if ('name' in commandInstance && 'description' in commandInstance) {
                            commands.push({
                                id: commandInstance.id,
                                name: commandInstance.name,
                                description: commandInstance.description
                            });
                        } else {
                            console.error('Invalid command class:', commandInstance);
                        }
                    } else {
                        console.error('Invalid command module:', CommandClass);
                    }
                }
            }

            commands.sort((a, b) => a.id - b.id);
            commands.forEach(command => {
                helpMessage += `/${command.name} - ${command.description}\n`;
            });
        } catch (error) {
            console.error(error);
            helpMessage += "An error occurred while generating the help list.";
        }

        bot.sendMessage({
            chat_id: chatId,
            text: helpMessage
        });
    }
}

export default HelpCommand;
