import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents");

const element = document.querySelector(".product-list");

const prodList = new ProductList("Tents", dataSource, element);

ProductList.init();