import { DateTime } from "luxon";

export class Clock {
    private local: DateTime;
    private rezonedString: DateTime;

    constructor() {
        this.local = DateTime.now();
        this.rezonedString = this.local.setZone("Asia/Jakarta");
    }

    public get(): string {
        const _datetime = this.rezonedString.toFormat("M/d/yyyy (h:mm:ss a)");
        return _datetime;
    }
}