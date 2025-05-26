import { getLocalStorage, setLocalStorage } from "./utils.mjs";
const cartElement = document.getElementById("cart-items");
import {
  getNumberOfItems,
  loadHeaderFooter,
  calcDiscountPrice,
} from "./utils.mjs";

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
    addCartItemQuantityListener();
    getNumberOfItems();
  } else {
    cartElement.innerHTML = "Your cart is empty!";
  }
}

function calcTotalCart() {
  const cartItems = getLocalStorage("so-cart");
  const cartFooter = document.querySelector("#cart-footer");
  if (!cartItems || cartItems.length === 0) {
    cartFooter.classList.add("hide");
  } else {
    cartFooter.classList.remove("hide");
    let total = cartItems.reduce(
      (sum, item) =>
        sum + calcDiscountPrice(item.FinalPrice) * (item.quantity ?? 1),
      0,
    );

    // console.log(total);
    document.querySelector("#cart-calc").innerHTML = total.toFixed(2);
  }
}

function cartItemTemplate(item, index) {
  const newItem = `<li class="cart-card divider">
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
  <button id="cart-item-quantity-minus" data-index="${item.quantity}">-</button>
  <button id="cart-item-quantity-add" data-index="${item.quantity}">+</button>
  <p class="cart-card__quantity">qty: ${item.quantity ?? 1}</p>
  <p class="cart-card__price">$${calcDiscountPrice(item.FinalPrice)}</p>
</li>`;

  return newItem;
}

function removeProductFromCart(index) {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.splice(index, 1);
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}

function updateCarrtItemQuantity(index, action) {
  const cartItems = getLocalStorage("so-cart") || [];
  const item = cartItems[index];

  if (action === "add" && item.quantity < 99) {
    item.quantity = (item.quantity || 1) + 1;
  } else if (action === "minus" && item.quantity > 1) {
    item.quantity -= 1;
  } else if (action === "minus" && item.quantity === 1) {
    removeProductFromCart(index);
    return;
  }

  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}

function addCartItemQuantityListener() {
  const minusButtons = document.querySelectorAll("#cart-item-quantity-minus");
  const addButtons = document.querySelectorAll("#cart-item-quantity-add");

  minusButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      updateCarrtItemQuantity(index, "minus");
      calcTotalCart();
    });
  });

  addButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      updateCarrtItemQuantity(index, "add");
      calcTotalCart();
    });
  });
}

renderCartContents();
loadHeaderFooter();
calcTotalCart();
