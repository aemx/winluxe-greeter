import { Data } from "./data.js";
import { Accounts } from "./accounts.js";
import { Authenticate } from "./authenticate.js";
import { Sessions } from "./sessions.js";
import { TimeDate } from "./timeDate.js";
import { Power } from "./power.js";

async function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}
window.wait = wait;
async function initGreeter() {
    if (window.greeter_config?.greeter.debug_mode) {
        // Run debug
    }

    window.themeData = new Data();
    window.accounts = new Accounts();
    window.sessions = new Sessions();
    window.authenticate = new Authenticate();
    window.timeDate = new TimeDate();
    window.power = new Power();

    // Windows-style login
    const body          = document.body;
    const mainLayer     = document.getElementById("main");
    const dtLayer       = document.getElementById("datetime");
    const overlay       = document.getElementById("overlay");
    const form          = document.getElementById("form");
    const passwordField = document.getElementById("pass");

    // Fade in
    form.disabled = true;
    overlay.classList.remove("active");

    // Set login form
    const setLayer2 = async (body, layer) => {
        body.classList.add("active");
        setTimeout(() => layer.style.animationName = 'avatar_in', 1);
        await window.wait(100);
        form.disabled = false;
        passwordField.focus();
    }
    
    // Go to login form
    body.onclick = async () => await setLayer2(mainLayer, dtLayer);
    body.onkeydown = async () => {
        if (body.className != "main active") {
            await setLayer2(mainLayer, dtLayer);
        }
    };

}
window.addEventListener("GreeterReady", () => {
    initGreeter();
});