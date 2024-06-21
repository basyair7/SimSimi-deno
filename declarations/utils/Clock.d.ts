import { DateTime } from "luxon";

export declare class Clock {
    private local: DateTime | undefined;
    private rezonedString: DateTime | undefined;

    constructor(serverTimeZone?: string);

    public static get(serverTimeZone?: string): string;
}