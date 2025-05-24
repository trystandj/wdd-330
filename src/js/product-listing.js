import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam, handleSearch, getSearchParam } from "./utils.mjs";

loadHeaderFooter().then(() => {
  // Initialize search functionality after header is loaded
  handleSearch();
});

const topElement = document.getElementById("title");
const category = getParam("category");
const searchTerm = getSearchParam();

const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const productList = new ProductList(category, dataSource, element);

// Handle search vs category listing
if (searchTerm) {
  // This is a search request
  topElement.textContent = `Search Results for: "${searchTerm}"`;
  
  productList.initWithSearch(searchTerm).then(resultCount => {
    if (resultCount === 0) {
      element.innerHTML = '<li class="no-results">No products found matching your search.</li>';
    }
    
    // Add link to clear search
    const clearSearch = document.createElement('div');
    clearSearch.className = 'clear-search';
    clearSearch.innerHTML = '<a href="/product-listing/">← View All Products</a>';
    topElement.after(clearSearch);
  });
} else if (category) {
  // This is a category listing
  topElement.textContent += `: ${category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")}`;
  console.log(category);
  productList.init();
} else {
  // Show all products or handle as needed
  topElement.textContent = "All Products";
  // You might want to implement an "all products" method
}