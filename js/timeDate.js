// Days of the week and month names
const ww = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const mm = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Return day of the week or month name based on a datetime object
const weekday = t => ww[t.getDay()];
const month = t => mm[t.getMonth()];

const formatTime = d => {
    const hh = d.getHours();
    const m = d.getMinutes().toString().padStart(2, 0);
    let h = hh >= 12 ? hh - 12 : hh
    h = h === 0 ? h = 12 : h;
    return `${h}:${m}`;
}

export class TimeDate {
    constructor() {
        this._timeLabel     = document.getElementById("clockMain");
        this._timeSubLabel  = document.getElementById("clockHh");
        this._dateLabel     = document.getElementById("date");
        this.init();
    }
    updateTimeDate() {
        if (!this._dateLabel || !this._timeLabel || !this._timeSubLabel)
            return;
        let d = new Date();
        this._dateLabel.innerText       = `${weekday(d)}, ${month(d)} ${d.getDate()}`;
        this._timeLabel.innerText       = formatTime(d);
        this._timeSubLabel.innerText    = d.getHours() >= 12 ? "PM" : "AM";
    }
    setTimer() {
        this.updateTimeDate();
        setInterval(() => {
            this.updateTimeDate();
        }, 1000);
    }
    init() {
        this.setTimer();
    }
}