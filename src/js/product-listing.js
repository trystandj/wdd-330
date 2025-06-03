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

const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
const productList = new ProductList(category, dataSource, element);

(async function () {
  const products = await productList.returnData();
  const numOfProducts = products.length;

  productList.init().then(() => {
    const productCards = document.querySelectorAll(".product-card");
    const searchInput = document.querySelector("#search");
    const sortSelect = document.getElementById("sort");

    searchInput.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase();
      const searchWords = value.split(/\s+/);

      productCards.forEach((productCard) => {
        const name = productCard.getAttribute("data-name");
        const brand = productCard.getAttribute("data-brand");

        const isMatch = searchWords.every(
          (word) => name.includes(word) || brand.includes(word),
        );

        productCard.style.display = isMatch ? "block" : "none";
      });
    });

    sortSelect.addEventListener("change", async (e) => {
      const sortBy = e.target.value;
      let sortedProducts = await productList.returnData();

      switch (sortBy) {
        case "price-asc":
          sortedProducts.sort((a, b) => a.FinalPrice - b.FinalPrice);
          break;
        case "price-desc":
          sortedProducts.sort((a, b) => b.FinalPrice - a.FinalPrice);
          break;
        case "name-asc":
          sortedProducts.sort((a, b) => a.Name.localeCompare(b.Name));
          break;
        case "name-desc":
          sortedProducts.sort((a, b) => b.Name.localeCompare(a.Name));
          break;
        case "brand-asc":
          sortedProducts.sort((a, b) =>
            a.Brand.Name.localeCompare(b.Brand.Name),
          );
          break;
        case "brand-desc":
          sortedProducts.sort((a, b) =>
            b.Brand.Name.localeCompare(a.Brand.Name),
          );
          break;
        default:
          sortedProducts = await productList.returnData();
          break;
      }

      productList.renderList(sortedProducts);
    });
  });

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
