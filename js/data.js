const WINLUXE_DATA = "winluxeData";
export class Data {
    constructor() {
        this.userName = null;
        this.load();
    }
    load() {
        const data = window.localStorage.getItem(WINLUXE_DATA);
        if (!data)
            return;
        const object = JSON.parse(data);
        this.userName = object?.userName ?? null;
    }
    save() {
        const data = JSON.stringify(this);
        window.localStorage.setItem(WINLUXE_DATA, data);
    }
}