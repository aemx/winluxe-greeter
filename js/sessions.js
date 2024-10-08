export class Sessions {
    constructor() {
        //this._sessionLabel      = document.querySelector("#session-label");
        //this._sessionListButton = document.querySelector("#session-list-button");
        //this._sessionsDropdown  = document.querySelector("#sessions-dropdown");
        this._selectedSession   = null;
        this._sessionsObject    = null;
        this.init();
    }
    getSelectedSession() {
        return this._selectedSession;
    }
    updateSessionLabel() {
        if (!this._sessionLabel)
            return;
        this._sessionLabel.innerText = this._selectedSession?.name ?? "";
    }
    updateOnStartup() {
        if (!this._sessionsObject)
            return;
        let sessionKey = window.accounts.getDefaultAccount()?.session;
        if (!sessionKey && this._sessionsObject.length > 0)
            sessionKey = this._sessionsObject[0].key;
        if (!sessionKey)
            sessionKey = window.lightdm?.default_session;
        this._selectedSession =
            this._sessionsObject.find((el) => el.key == sessionKey) ?? null;
        //this.updateSessionLabel();
    }
    setSessionList() {
        if (!this._sessionsDropdown || !this._sessionsObject)
            return;
        this._sessionsDropdown.innerHTML = "";
        for (const v of this._sessionsObject) {
            const name = v.name;
            const li = document.createElement("li");
            const button = document.createElement("button");
            button.innerText = name;
            button.addEventListener("click", () => {
                this._selectedSession = v;
                this.updateSessionLabel();
            });
            li.appendChild(button);
            this._sessionsDropdown.appendChild(li);
        }
    }
    init() {
        if (!window.lightdm)
            return;
        this._sessionsObject = window.lightdm.sessions;
        this.updateOnStartup();
        //this.setSessionList();
    }
}