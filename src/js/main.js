import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import getNumberOfItems from "./utils.mjs";

const dataSource = new ProductData("tents");

const element = document.querySelector(".product-list");

const productList = new ProductList("Tents", dataSource, element);
getNumberOfItems();
productList.init();
