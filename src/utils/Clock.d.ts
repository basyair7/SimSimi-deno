import { DateTime } from "luxon";

export declare class Clock {
    private local: DateTime | undefined;
    private rezonedString: DateTime | undefined;

    public static get(): string;
}