
import {loadHeaderFooter, getNumberOfItems} from "./utils.mjs";
import Alert from "./alert.js";

const alert = new Alert();
alert.loadAlerts();

loadHeaderFooter().then(() => {
  getNumberOfItems();
});