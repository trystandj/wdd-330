import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import {getNumberOfItems, loadHeaderFooter} from "./utils.mjs";


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
    
    // code to change the image size  v
    let imageSize;
    window.addEventListener("resize", () => {    location.reload();});
    if (window.innerWidth > 500) {
        imageSize = product.Images.PrimaryLarge;
    } else {
        imageSize = product.Images.PrimaryMedium;
    }
    // code to change the image size   ^

    document.querySelector('h2').textContent = product.Brand.Name;
    document.querySelector('h3').textContent = product.NameWithoutBrand;

    const productImage = document.getElementById('productImage');
    productImage.src = imageSize;
    productImage.alt = product.NameWithoutBrand;

    document.getElementById('productPrice').textContent = product.FinalPrice;
    document.getElementById('productColor').textContent = product.Colors[0].ColorName;
    document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

    document.getElementById('addToCart').dataset.id = product.Id;
}


window.addEventListener('DOMContentLoaded', getNumberOfItems);