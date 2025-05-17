import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  if ( cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  }
}

function calcTotalCart() {
  const cartItems = getLocalStorage("so-cart") || [];
  if ( cartItems.length == 0) {
    document.querySelector(".hide").classList.add("hide");
  } else {
    document.querySelector(".hide").classList.remove("hide");
    let total = cartItems.reduce( (sum, item) => sum + item.ListPrice, 0);
    // console.log(total);  
    document.querySelector("#cart-calc").innerHTML = total;
  }
  
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
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

renderCartContents();
calcTotalCart();
