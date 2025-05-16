//  *  1st W Changed  *   // import { setLocalStorage } from "./utils.mjs"; 
// import { getLocalStorage , setLocalStorage, getParam } from "./utils.mjs";
import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productId = getParam("Product");

const product = new ProductDetails(productId, dataSource);
product.init();

// console.log(dataSource.findProductById(productId));

// function addProductToCart(product) {
//   // next line is the original
//   // setLocalStorage("so-cart", product);

//   let cart = getLocalStorage("so-cart");

//   if (!Array.isArray(cart)) {
//     cart = [];

//     cart.push(product); // add individual products 

//     setLocalStorage("so-cart", cart);
//   }
// }

// // add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// // add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);
