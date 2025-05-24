import { renderListWithTemplate } from "./utils.mjs";


function productCardTemplate(product) {
  
  // code to change the image size  v
  let imageSize;
  window.addEventListener("resize", () => {    location.reload();});
  if (window.innerWidth > 500) {
    imageSize = product.Images.PrimaryMedium;
  } else {
    imageSize = product.Images.PrimarySmall;
  }
  // code to change the image size   ^

  return `
    <li class="product-card">
      <a href="/product_pages/?product=${product.Id}">
        <img src="${imageSize}" alt="${product.Name}">
        <h3>${product.Brand.Name}</h3>
        <p>${product.Name}</p>
        <p class="product-card__price"><strong>$${product.FinalPrice}</strong></p>
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
    console.log(list);
    this.renderList(list);
  }

  renderList(list) {
    // const htmlStrings = list.map(productCardTemplate);
    // this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));

    // apply use new utility function instead of the commented code above
    renderListWithTemplate(productCardTemplate, this.listElement, list);

  }

}