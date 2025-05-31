import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";
import { updateBreadcrumb } from "./breadcrumb";

await loadHeaderFooter();

const topElement = document.getElementById("title");
const category = getParam("category");
topElement.textContent += `: ${category
  .split("-")
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  .join(" ")}`;
// console.log(category);
const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
const productList = new ProductList(category, dataSource, element);
const numOfProducts = await productList.returnData()
productList.init();

const productData = {
  pageType: "category",
  category: category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" "),
  productCount: numOfProducts.length,
};

updateBreadcrumb(productData);
