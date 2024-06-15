import { Context } from "TeleBotGrammy";
import { CommandHandler, Clock } from "handlers";

class BotStatus implements CommandHandler {
    readonly id = 4;
    readonly name = "botstatus";
    readonly description = "Show information about the bot system.";

    private information: string = "";
    private osinfo: string = "";
    private archinfo: string = "";
    private target: string = "";
    private clock: Clock;

    constructor() {
        const getBuild = Deno.build;
        this.osinfo = getBuild.os;
        this.archinfo = getBuild.arch;
        this.target = getBuild.target;
        this.clock = new Clock();
    }
    execute(ctx: Context): void {
        this.clock = new Clock();
        this.information = `\t**System Information**\n\nNama : SimSimi Ahul V2.0 \n\nTanggal : ${this.clock.get()}\nPlatform : ${this.osinfo} (${this.archinfo})\nTarget : ${this.target}\nStatus : Online\n`;

        ctx.reply(this.information);
    }
}

export default BotStatus;