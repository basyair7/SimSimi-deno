import { DateTime } from "luxon";

export class Clock {
    private local: DateTime;
    private rezonedString: DateTime;

    constructor() {
        this.local = DateTime.now();
        this.rezonedString = this.local.setZone("Asia/Jakarta");
    }

    public get(): string {
        // get date
        const _year = this.rezonedString.c.year;
        const _month = this.rezonedString.c.month;
        const _day = this.rezonedString.c.day;
        
        // get time
        const _hour = this.rezonedString.c.hour;
        const _minute = this.rezonedString.c.minute;
        const _second = this.rezonedString.c.second;

        const _datetime = `${_month}/${_day}/${_year} (${_hour}:${_minute}:${_second})`;

        return _datetime;
    }
}