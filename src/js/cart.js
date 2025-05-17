import { getLocalStorage, setLocalStorage } from "./utils.mjs";
const cartElement = document.getElementById("cart-items");
import getNumberOfItems from "./utils.mjs";

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
      });
    });
    getNumberOfItems();
  } else {
    
    cartElement.innerHTML = "Your cart is empty!";
  }
}

function cartItemTemplate(item, index) {
  const newItem = `<li class="cart-card divider">
  <button id="remove-button" data-index="${index}">&times;</button>
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
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

renderCartContents();
getNumberOfItems();
