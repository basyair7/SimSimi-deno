import { DateTime } from "luxon";

export class Clock {
    private local: DateTime;
    private rezonedString: DateTime;

    constructor() {
        this.local = DateTime.now();
        this.rezonedString = this.local.setZone("Asia/Jakarta");
    }

    get(): string {
        // get Date
        const year = this.rezonedString.c.year;
        const month = this.rezonedString.c.month;
        const day = this.rezonedString.c.day;

        // get Time
        const hour = this.rezonedString.c.hour;
        const minute = this.rezonedString.c.minute;
        const second = this.rezonedString.c.second;

        const datetime = year + "/" + month + "/" + day + " (" + hour + ":" + minute + ":" + second + ")";
        
        return datetime;
    }
}