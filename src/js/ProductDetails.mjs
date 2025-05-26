import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import {getNumberOfItems, loadHeaderFooter, calcDiscountPrice} from "./utils.mjs";


export default class ProductDetails { 
    constructor(productId, dataSource){
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }


    async init() {
        // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        this.product = await this.dataSource.findProductById(this.productId);
        // the product details are needed before rendering the HTML
        this.renderProductDetails();
        // once the HTML is rendered, add a listener to the Add to Cart button
        // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
        document.getElementById('addToCart')
            .addEventListener('click', this.addProductToCart.bind(this));
        // add a listener to the cart icon to update the number of items in the cart
        document.addEventListener('click', getNumberOfItems);
        calcDiscount(this.product);

    }



    addProductToCart() {
        const cartItems = getLocalStorage("so-cart") || [];

        const existingItem = cartItems.find(item => item.Id === this.product.Id)

        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1
        } else {
            const productToAdd = { ...this.product, quantity: 1 }
            cartItems.push(productToAdd);
        }
        setLocalStorage("so-cart", cartItems);
    }


    renderProductDetails() {
        renderProducts(this.product);
    }


}


function renderProducts(product) {
    document.querySelector('h2').textContent = product.Brand.Name;
    document.querySelector('h3').textContent = product.NameWithoutBrand;

    const productImage = document.getElementById('productImage');
    productImage.src = product.Images.PrimaryLarge;
    productImage.alt = product.NameWithoutBrand;

    document.getElementById('productPrice').textContent = "$" + product.FinalPrice;
    document.getElementById('productColor').textContent = product.Colors[0].ColorName;
    document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

    document.getElementById('addToCart').dataset.id = product.Id;
}

export function calcDiscount(product) {
    const discountPrice = calcDiscountPrice(product.FinalPrice);
    const discountPriceContainer = document.querySelector(".product__discount"); 

    if (!discountPriceContainer) return; 

    if (discountPrice < product.FinalPrice) {
        const price = document.querySelector(".product-card__price");
        price.style.textDecoration = "line-through";
        price.style.color = "rgba(0, 0, 0, 0.7)";
        discountPriceContainer.classList.remove("hide");
        discountPriceContainer.innerHTML = "$" + `${discountPrice}`;
    } else {
        discountPriceContainer.classList.add("hide");
    }
}



window.addEventListener('DOMContentLoaded', getNumberOfItems);