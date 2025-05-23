import { getLocalStorage, setLocalStorage } from "./utils.mjs";

import { getNumberOfItems, loadHeaderFooter } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  if (cartItems) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    const removeButtons = document.querySelectorAll("#remove-button");
    removeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const productId = button.getAttribute("data-index");
        removeProductFromCart(productId);
        calcTotalCart();
      });
    });
    getNumberOfItems();
  } else {
     document.querySelector(".products").insertAdjacentHTML('afterend', "<p>Your cart is empty!</p>");
     console.log("No items in cart");
  }
}

function calcTotalCart() {
  const cartItems = getLocalStorage("so-cart");
  const cartFooter = document.querySelector("#cart-footer");
  if (!cartItems || cartItems.length === 0) {
    cartFooter.classList.add("hide");
  } else {
    cartFooter.classList.remove("hide");
    let total = cartItems.reduce((sum, item) => sum + item.ListPrice, 0);
    // console.log(total);
    document.querySelector("#cart-calc").innerHTML = total;
  }
}

function cartItemTemplate(item, index) {
  const newItem = `<li class="cart-card divider">
  <button id="remove-button" data-index="${index}">&times;</button>
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function removeProductFromCart(index) {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.splice(index, 1);
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}
loadHeaderFooter().then(() => {
    renderCartContents();
    calcTotalCart();
});