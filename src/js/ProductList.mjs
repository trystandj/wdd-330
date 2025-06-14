import { renderListWithTemplate, calcDiscountPrice } from "./utils.mjs";

function productCardTemplate(product) {
  const discountPrice = calcDiscountPrice(product.FinalPrice);
  let discountClass = discountPrice >= product.FinalPrice ? "hide" : " ";
  const discount =
    ((product.FinalPrice - discountPrice) / product.FinalPrice) * 100;

  const strikeStyle =
    discountPrice < product.FinalPrice
      ? "text-decoration: line-through; color: rgba(0,0,0,0.7);"
      : "";
  const removeDiscount =
    discountPrice < product.FinalPrice
      ? `<p class="product__discount">$${discountPrice}</p>`
      : "";

  let imageSize;
  window.addEventListener("resize", () => {
    location.reload();
  });
  if (window.innerWidth > 500) {
    imageSize = product.Images.PrimaryMedium;
  } else {
    imageSize = product.Images.PrimarySmall;
  }

  return `
  <li class="product-card" 
      data-name="${product.Name.toLowerCase()}" 
      data-brand="${product.Brand.Name.toLowerCase()}">
    <div class="discounted ${discountClass}">%${discount.toFixed(0)} Off</div>
    <a href="/product_pages/?product=${product.Id}">
      <img src="${imageSize}" alt="${product.Name}">
      <h2>${product.Brand.Name}</h2>
      <h3>${product.Name}</h3>
      <div id="price-wrapper">
        <p class="product-card__price" style="${strikeStyle}">$${product.FinalPrice.toFixed(2)}</p>
        ${removeDiscount}
      </div>
    </a>
  </li>
`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
  }

  async returnData() {
    const list = await this.dataSource.getData(this.category);
    return list;
  }

  renderList(list) {
    // const htmlStrings = list.map(productCardTemplate);
    // this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));

    // apply use new utility function instead of the commented code above
    renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
  }
}
