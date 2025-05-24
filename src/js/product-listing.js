import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

// const topElement = document.getElementById("title");
const category = getParam("category");
// topElement.textContent += `: ${category
//   .split("-")
//   .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//   .join(" ")}`;
console.log(category);
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const productList = new ProductList(category, dataSource, element);




productList.init();


