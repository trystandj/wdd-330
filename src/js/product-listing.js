import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";
import { updateBreadcrumb } from "./breadcrumb";

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

async function getNumberOfItems() {}

(async function () {
  const products = await productList.returnData();
  const numOfProducts = products.length;

  const productData = {
    pageType: "category",
    category: category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" "),
    productCount: numOfProducts,
  };

  (async function () {
    await loadHeaderFooter();
    updateBreadcrumb(productData);
  })();
})();

productList.init();
