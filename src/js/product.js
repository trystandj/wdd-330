import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
<<<<<<< HEAD
  let products = getLocalStorage("so-cart");
  if (!Array.isArray(products)) {
    products = [];
  }
  products.push(product);
  setLocalStorage("so-cart", products);
=======
  const cartItems = getLocalStorage("so-cart") || []; // get cart array of items from local storage if null set to empty array
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
>>>>>>> abe33442832fcb1ea279179e16a5f2117d8fc558
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
