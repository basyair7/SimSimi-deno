import { SimSimiKeysType } from "types";

class SimSimiKeys implements SimSimiKeysType {
    public SimSimiAPIUrl: string;
    public SimSimiAPIKeys: string;
    public SimSimiRegion: string;

    constructor(simsimiApiUrl?: string, simsimiApiKeys?: string, simsimiRegion?: string) {
        this.SimSimiAPIUrl = simsimiApiUrl ?? 'nil';
        this.SimSimiAPIKeys = simsimiApiKeys ?? 'nil';
        this.SimSimiRegion = simsimiRegion ?? 'nil';

        this.validateKeys();
    }

    private validateKeys(): void {
        if(Object.values(this).includes('nil'))
            throw new Error("Not all ENV variables are defined!");
    }

    public static getInstance(simsimiApiUrl?: string, simsimiApiKeys?: string, simsimiRegion?: string): SimSimiKeys {
        return new SimSimiKeys(simsimiApiUrl, simsimiApiKeys, simsimiRegion);
    }
}

export default SimSimiKeys;