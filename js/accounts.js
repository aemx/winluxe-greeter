export class Accounts {
    constructor() {
        this._userLabel         = document.getElementById("uname");
        //this._userList          = document.querySelector("#user-list");
        //this._userListButton    = document.querySelector("#user-list-button");
        //this._userListDropdown  = document.querySelector("#users-dropdown");
        this._defaultUser       = null;
        this._usersObject       = null;
        this.init();
    }
    getDefaultUserName() {
        return this._defaultUser?.username;
    }
    getDefaultAccount() {
        return this._defaultUser;
    }
    setDefaultAccount() {
        if (this._userLabel) {
            const name = this._defaultUser?.username ?? "No user";
            this._userLabel.innerHTML = name;
        }
        if (window.sessions)
            window.sessions.updateOnStartup();
    }
    updateOnStartup() {
        if (!this._usersObject)
            return;
        const dfUserName = window.themeData.userName;
        let user = window.lightdm?.users.find((value) => value.username == dfUserName);
        if (!user) {
            user = this._usersObject.length > 0 ? this._usersObject[0] : undefined;
        }
        this._defaultUser = user ?? null;
        this.setDefaultAccount();
    }
    setAccountList() {
        if (!this._usersObject || !this._userListDropdown)
            return;
        this._userListDropdown.innerHTML = "";
        for (const v of this._usersObject) {
            const name = v.display_name;
            const li = document.createElement("li");
            const button = document.createElement("button");
            button.innerText = name;
            button.addEventListener("click", () => {
                this.updateDefaults(v);
                this.setDefaultAccount();
                window.authenticate.startAuthentication();
                window.backgrounds.updateBackground("userBackground");
            });
            li.appendChild(button);
            this._userListDropdown.appendChild(li);
        }
    }
    updateDefaults(user) {
        if (!user)
            return;
        this._defaultUser = user;
        window.themeData.userName = user.username;
        window.themeData.save();
    }
    setKeydown() {
        this._userListDropdown?.addEventListener("keydown", (ev) => {
            if (ev.keyCode == 27) {
                this._userListDropdown?.classList.add("hide");
                this._userListButton?.focus();
            }
        });
    }
    setButton() {
        document.querySelector("#screen")?.addEventListener("click", (ev) => {
            if (!ev.target)
                return;
            if (ev.target == this._userListButton ||
                ev.target.parentElement == this._userListButton) {
                this._userListDropdown?.classList.toggle("hide");
            }
            else if (ev.target != this._userList &&
                ev.target.closest(".dropdown") == null) {
                this._userListDropdown?.classList.add("hide");
            }
        });
        document.querySelector("#screen")?.addEventListener("focusin", () => {
            if (!this._userListDropdown?.contains(document.activeElement) &&
                document.activeElement != this._userListButton) {
                this._userListDropdown?.classList.add("hide");
            }
        });
    }
    init() {
        if (!window.lightdm)
            return;
        this._usersObject = window.lightdm.users;
        this.updateOnStartup();
        //this.setAccountList();
        this.setButton();
        this.setKeydown();
    }
}