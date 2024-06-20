import { DateTime } from "luxon";

export class Clock {
    private local: DateTime | undefined;
    private rezonedString: DateTime | undefined;

    public static get(): string {
        const thisClass = new Clock();
        thisClass.local = DateTime.now();
        thisClass.rezonedString = thisClass.local.setZone("Asia/Jakarta");
        const _datetime = thisClass.rezonedString.toFormat("M/d/yyyy (h:mm:ss a)");
        return _datetime;
    }
}