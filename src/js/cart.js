import { getLocalStorage, setLocalStorage } from "./utils.mjs";
const cartElement = document.getElementById("cart-items");
import { getNumberOfItems, loadHeaderFooter } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  if (cartItems) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    const removeButtons = document.querySelectorAll(".remove-button");
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
  calcTotalCart();
}

function calcTotalCart() {
  const cartItems = getLocalStorage("so-cart");
  const cartFooter = document.querySelector("#cart-footer");
  if (!cartItems || cartItems.length == 0) {
    cartFooter.classList.add("hide");
  } else {
    cartFooter.classList.remove("hide");
    let total = cartItems.reduce(
      (sum, item) => sum + item.FinalPrice * (item.quantity ?? 1),
      0,
    );
    // console.log(total);
    document.querySelector("#cart-calc").innerHTML = `$${total.toFixed(2)}`;
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <button class="remove-button" data-index="${item.Id}">&times;</button>
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
  <p class="cart-card__quantity">qty: ${item.quantity ?? 1}</p>
  <p class="cart-card__price">$${item.FinalPrice.toFixed(2)}</p>
</li>`;

  return newItem;
}

function removeProductFromCart(productId) {
  let cartItems = getLocalStorage("so-cart") || [];

  for (let i = cartItems.length - 1; i >= 0; i--) {
    if (String(cartItems[i].Id) === String(productId)) {  // FIXED
      if (cartItems[i].quantity > 1) {
        cartItems[i].quantity -= 1;
      } else {
        cartItems.splice(i, 1);
      }
      break;
    }
  }
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}


renderCartContents();
loadHeaderFooter();
calcTotalCart();
