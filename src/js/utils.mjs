// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param)
  return product;
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {

  const htmlStrings = list.map(templateFn);
      if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function getNumberOfItems() {
  const cartCountElement = document.querySelector(".cart-count");
  const cartItems = getLocalStorage("so-cart");


  if (!cartCountElement) {

    return 0;
  }

  if (!cartItems) {
    cartCountElement.classList.add("hidden");
    cartCountElement.innerHTML = "0";
    return 0;
  } else {
    const numberOfItems = cartItems.length;
    cartCountElement.innerHTML = numberOfItems;
    cartCountElement.classList.remove("hidden");

    if (numberOfItems === 0) {
      cartCountElement.classList.add("hidden");
    }

    return numberOfItems;
  }
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}


export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  // Load the header and footer templates in from the partials using the loadTemplate.
  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate = await loadTemplate("../partials/footer.html");
  //Grab the header and footer placeholder elements out of the DOM
  const headerElement = document.querySelector("#header");
  const footerElement = document.querySelector("#footer");
  // Render the header and footer using renderWithTemplate
  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}