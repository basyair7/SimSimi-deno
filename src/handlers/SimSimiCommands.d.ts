import { Context } from "TeleBotGrammy";

export declare class SimSimiCommand {
    private simSimiApiUrl: string;
    private simSimiApiKeys: string;
    private region: string;

    constructor(SimSimiAPIUrl: string, SimSimiAPIKeys: string, SimSimiRegion: string);

    protected SimSimi_run(ctx: Context): Promise<void>;
    
}