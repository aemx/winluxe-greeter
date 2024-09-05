export class Authenticate {
    constructor() {
        this._inputPassword = document.getElementById("pass");
        this._form          = document.getElementById("form");
        this._message       = document.getElementById("message");
        this._inputEye      = document.getElementById("pass-eye");
        this._inputEyeOn    = document.getElementById("pass-eye-enable");
        this._inputEyeOff   = document.getElementById("pass-eye-disable");
        this._password      = "";
        this.init();
    }
    setForm() {
        this._form?.addEventListener("submit", event => {
            event.preventDefault();
            this._password = this._inputPassword?.value ?? "";
            this.doRespond();
        });
    }
    setAuthenticationDone() {
        window.lightdm?.authentication_complete.connect(() => {
            if (window.lightdm?.is_authenticated) {
                this._authenticationDone();
            } else {
                this._authenticationFailed();
            }
        });
    }
    setPasswordEye() {
        this._inputEye?.addEventListener("click", () => {
            if (!this._inputPassword)
                return;
            if (this._inputPassword?.type === "password") {
                this._inputPassword.type = "text";
                this._inputEyeOff.classList.remove('inactive');
                this._inputEyeOn.classList.add('inactive');
            } else {
                this._inputPassword.type = "password";
                this._inputEyeOn.classList.remove('inactive');
                this._inputEyeOff.classList.add('inactive');
            }
        });
    }
    doRespond() {
        if (!this._inputPassword)
            return;
        const user = window.accounts.getDefaultAccount();
        this._message.classList.remove('active');
        this._form.classList.add('disabled');
        this._inputPassword.disabled = true;
        window.lightdm?.respond(this._password);
    }
    startAuthentication() {
        window.lightdm?.cancel_authentication();
        const user = window.accounts.getDefaultAccount();
        window.lightdm?.authenticate(user?.username ?? null);
    }
    async _authenticationDone() {
        const defSession = window.sessions.getSelectedSession();
        document.getElementById("overlay").classList.add("active");
        await window.wait(300);
        console.log("Session started with", defSession?.key);
        window.lightdm?.start_session(defSession?.key ?? null);
    }
    async _authenticationFailed() {
        this.startAuthentication();
        this._message.innerHTML = 'The password is incorrect. Try again.'
        this._message.classList.add('active');
        if (this._inputPassword) {
            this._inputPassword.value = "";
            this._form.classList.remove('disabled');
            this._inputPassword.disabled = false;
            this._inputPassword.focus();
        }
    }
    init() {
        this.setForm();
        this.setAuthenticationDone();
        this.setPasswordEye();
        console.log("Start authentication");
        this.startAuthentication();
    }
}