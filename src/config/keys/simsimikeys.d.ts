import { SimSimiKeysType } from "types";

declare class SimSimiKeys implements SimSimiKeysType {
    public SimSimiAPIUrl: string;
    public SimSimiAPIKeys: string;
    public RegionSimSimi: string;

    constructor(simsimiApiUrl?: string, simsimiApiKeys?: string, simsimiRegion?: string);

    private validateKeys(): void;

    public static getInstance(simsimiApiUrl?: string, simsimiApiKeys?: string, simsimiRegion?: string): SimSimiKeys;
}

export default SimSimiKeys;