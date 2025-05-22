import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import {getNumberOfItems, loadHeaderFooter} from "./utils.mjs";
import Alert from "./alert.js";


const alert = new Alert();
alert.loadAlerts();

const dataSource = new ProductData("tents");

const element = document.querySelector(".product-list");

const productList = new ProductList("Tents", dataSource, element);

productList.init();
loadHeaderFooter();
getNumberOfItems();
