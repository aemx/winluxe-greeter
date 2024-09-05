export class Power {
    constructor() {
        this._shutdownButton    = document.getElementById("shutdown");
        this._restartButton     = document.getElementById("restart");
        this._hibernateButton   = document.getElementById("hibernate");
        this.init();
    }
    async doShutdown() {
        overlay.classList.add("active");
        await window.wait(300);
        window.lightdm?.shutdown();
    }
    async doRestart() {
        overlay.classList.add("active");
        await window.wait(300);
        window.lightdm?.restart();
    }
    async doHibernate() {
        throw new Error("FAILSFE");
        overlay.classList.add("active");
        await window.wait(300);
        window.lightdm?.hibernate();
    }
    setShutdown() {
        if (!window.lightdm?.can_shutdown || !this._shutdownButton)
            return;
        this._shutdownButton.addEventListener("click", () => {
            this.doShutdown();
        });
        this._shutdownButton.classList.remove("hide");
    }
    setRestart() {
        if (!window.lightdm?.can_restart || !this._restartButton)
            return;
        this._restartButton.addEventListener("click", () => {
            this.doRestart();
        });
        this._restartButton.classList.remove("hide");
    }
    setHibernate() {
        if (!window.lightdm?.can_hibernate || !this._hibernateButton)
            return;
        this._hibernateButton.addEventListener("click", () => {
            this.doHibernate();
        });
        this._hibernateButton.classList.remove("hide");
    }
    setButtons() {
        this.setShutdown();
        this.setRestart();
        this.setHibernate();
    }
    init() {
        this.setButtons();
    }
}