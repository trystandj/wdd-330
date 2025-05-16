import ProductList from "./ProductList.mjs";
import ProductData from "./ProductData.mjs";

const listElement = document.getElementById("product-list")

const data = new ProductData('tents');
const list = new ProductList('tents', data, listElement);

list.init()