import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { updateBreadcrumb } from "./breadcrumb";

const dataSource = new ExternalServices();
const productId = getParam("product");
const product = new ProductDetails(productId, dataSource);

(async function () {
  const productInfo = await product.returnProductData();
  const productCategory = productInfo.Category;

  const productData = {
    pageType: "product",
    category: productCategory
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" "),
  };
  (async function () {
    await loadHeaderFooter();
    updateBreadcrumb(productData);
  })();
})();

product.init();
