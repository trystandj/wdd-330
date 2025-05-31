import { getLocalStorage, setLocalStorage, alertMessage, removeAllAlerts } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
  // convert the form data to a JSON object
  const formData = new FormData(formElement);
  const convertedJSON = {};
  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

export default class Registrationprocess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;

  }

  init() {

  }




async register() {
  const formElement = document.forms["Register"];
  const json = formDataToJSON(formElement);
  

  
  json.email = formElement["email"].value;
  json.password = formElement["password"].value;

  console.log(json);

  try {
     const res = await services.createUser(json);
    console.log(res);
    location.assign("/success.html");
  } catch (err) {
      
      removeAllAlerts();
      for (let message in err.message) {
        alertMessage(err.message[message]);
      }

      console.log(err);
    }
}}