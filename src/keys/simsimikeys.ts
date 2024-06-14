import { SimSimiKeysType } from "types";

class SimSimiKeys implements SimSimiKeysType {
    public SimSimiAPIUrl: string;
    public SimSimiAPIKeys: string;
    public RegionSimSimi: string;

    constructor(simsimiApiUrl?: string, simsimiApiKeys?: string, Regionsimsimi?: string) {
        this.SimSimiAPIUrl = simsimiApiUrl ?? 'nil';
        this.SimSimiAPIKeys = simsimiApiKeys ?? 'nil';
        this.RegionSimSimi = Regionsimsimi ?? 'nil';

        this.validateKeys();
    }

    private validateKeys(): void {
        if(Object.values(this).includes('nil'))
            throw new Error("Not all ENV variables are defined!");
    }

    public static getInstance(simsimiApiUrl?: string, simsimiApiKeys?: string, Regionsimsimi?: string): SimSimiKeys {
        return new SimSimiKeys(simsimiApiUrl, simsimiApiKeys, Regionsimsimi);
    }
}

export default SimSimiKeys;