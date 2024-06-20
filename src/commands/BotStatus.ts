import { Context } from "TeleBotGrammy";
import * as utils from "utils";
import type { CommandHandler } from "types";

class BotStatus implements CommandHandler {
    readonly id = 4;
    readonly name = "botstatus";
    readonly description = "Show information about the bot system.";

    private information: string = "";
    private osinfo: string = "";
    private archinfo: string = "";
    private target: string = "";
    private clock?: utils.Clock | undefined;

    constructor() {
        const getBuild = Deno.build;
        this.osinfo = getBuild.os;
        this.archinfo = getBuild.arch;
        this.target = getBuild.target;
    }
    
    public execute(ctx: Context): void {
        this.clock = new utils.Clock();
        this.information = "<b>System Information</b>";
        this.information += "<pre>Nama\t: SimSimi Ahul V2.0\n";
        this.information += `Tanggal\t: ${this.clock.get()}\n`;
        this.information += `Platform\t: ${this.osinfo} (${this.archinfo})\n`;
        this.information += `Target\t: ${this.target}\n`;
        this.information += "Status\t: Online</pre>\n";
        
        ctx.reply(this.information, { parse_mode: "HTML" });
    }
}

export default BotStatus;