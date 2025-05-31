import { loadHeaderFooter } from "./utils.mjs";
import Registrationprocess from "./RegistrationProcess.mjs";
import { updateBreadcrumb } from "./breadcrumb";

(async function () {
  await loadHeaderFooter();
  const pageData = {
    pageType: "register",
  };
  updateBreadcrumb(pageData);
})();

document.addEventListener("DOMContentLoaded", () => {
  const registration = new Registrationprocess("so-cart", ".checkout-summary");
  registration.init();

  const myForm = document.forms["Register"];
  myForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (myForm.checkValidity()) {
      registration.register();
    } else {
      myForm.reportValidity();
    }
  });
});
