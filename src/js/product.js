import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { updateBreadcrumb } from "./breadcrumb";

const dataSource = new ExternalServices();
const productId = getParam("product");
const product = new ProductDetails(productId, dataSource);
const productInfo = await product.returnProductData();
const category = productInfo.Category;
product.init();

const productData = {
  pageType: "product",
  category: category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" "),
};

(async function () {
  await loadHeaderFooter();
  updateBreadcrumb(productData);
})();
