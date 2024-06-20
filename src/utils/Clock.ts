import { DateTime } from "luxon";

export class Clock {
    private local: DateTime | undefined;
    private zone: string;
    private rezonedString: DateTime | undefined;

    constructor(serverTimeZone?: string) {
        this.zone = serverTimeZone ?? 'nil';
    }

    public static get(serverTimeZone?: string): string {
        const thisClass = new Clock(serverTimeZone);
        if (thisClass.zone === "nil") {
            return "Please insert SERVERTIMEZONE on .env";
        }

        thisClass.local = DateTime.now();
        thisClass.rezonedString = thisClass.local.setZone(thisClass.zone);
        const _datetime = thisClass.rezonedString.toFormat("M/d/yyyy (h:mm:ss a)");
        return `${_datetime} (${thisClass.zone})`;
    }
}