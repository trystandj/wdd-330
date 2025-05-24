import { loadHeaderFooter, getNumberOfItems } from "./utils.mjs";
import Alert from "./alert.js";

const alert = new Alert();
alert.loadAlerts();

loadHeaderFooter().then(() => {
  getNumberOfItems();
});

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // prevent page reload

  const query = searchInput.value.trim();
  if (!query) return;

  try {
    const results = await dataSource.searchByName(query);
    productList.update(results); // Custom method to refresh list
  } catch (error) {
    console.error("Search error:", error);
  }
});

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const query = searchInput.value.trim();
  if (!query) return;

  try {
    const results = await window.dataSource.searchByName(query);
    window.productList.update(results);
  } catch (error) {
    console.error("Search error:", error);
  }
});