import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import {loadHeaderFooter, getNumberOfItems, getParam} from "./utils.mjs";
import Alert from "./alert.js";

loadHeaderFooter().then(() => {
  getNumberOfItems();
});

const alert = new Alert();
alert.loadAlerts();

const category = getParam("category");

const dataSource = new ProductData("");

const element = document.querySelector(".product-list");

const productList = new ProductList(category, dataSource, element);

productList.init();

document.querySelector("#prod_category").innerHTML = category;