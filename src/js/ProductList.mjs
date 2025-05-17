import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
                <a href="product_pages/?product=${product.Id}">
                    <img src="../public/images/tents/${product.Image}" alt="Image of ${product.Brand.Name}">
                    <h2 class="card__brand">${product.Brand.Name}</h2>
                    <h3 class="card__name">${product.Name}</h3>
                    <p class="product-name__price">$${product.ListPrice}</p>
                </a>
            </li>`;
}

export default class ProductList {

    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData();
        console.log(list);
        this.renderList(list);
    }

    renderList(list) {
        // const htmlStrings = list.map(productCardTemplate);
        // this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(''));

        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}