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

export default function getNumberOfItems() {

  const cartItems = getLocalStorage("so-cart");
  if (!cartItems) {
    document.querySelector(".cart-count").classList.add("hidden");
    const numberOfItems = 0;
    return numberOfItems;
  } else {
     const numberOfItems = cartItems.length;
  
 
  document.querySelector(".cart-count").innerHTML = numberOfItems;
  document.querySelector(".cart-count").classList.remove("hidden");
  if (numberOfItems === 0) {
    document.querySelector(".cart-count").classList.add("hidden");
  }
}
}