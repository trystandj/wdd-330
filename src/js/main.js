import { loadHeaderFooter, alertMessage } from "./utils.mjs";
// import Alert from "./alert.js";

// const alert = new Alert();
// alert.loadAlerts();

loadHeaderFooter();

document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("fstVisit") === null) {
        alertMessage("¡Welcome, is your first Time here!. Go to <a href='register.html' style='color:white;'>register</a> and win a gift");
        localStorage.setItem("fstVisit", "true");
    } 
});