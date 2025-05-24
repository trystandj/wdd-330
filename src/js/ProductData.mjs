const baseURL = import.meta.env.VITE_SERVER_URL

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
  }
  
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result
  }
  
  async findProductById(id) {
    const product = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(product)
    return data.Result
  }
  
  // Add this new method for search
  async searchProducts(searchTerm) {
    try {
      // Try server-side search first if your API supports it
      const response = await fetch(`${baseURL}products/search?q=${encodeURIComponent(searchTerm)}`);
      if (response.ok) {
        const data = await convertToJson(response);
        return data.Result;
      }
    } catch (error) {
      console.log('Server search not available, falling back to client-side search');
    }
    
    // Fallback: get all products and filter client-side
    // You might want to get products from multiple categories
    const categories = ['tents', 'backpacks', 'sleeping-bags', 'hammocks']; // adjust based on your categories
    let allProducts = [];
    
    for (const category of categories) {
      try {
        const categoryProducts = await this.getData(category);
        allProducts = allProducts.concat(categoryProducts);
      } catch (error) {
        console.log(`Error loading ${category}:`, error);
      }
    }
    
    // Filter products based on search term
    const searchLower = searchTerm.toLowerCase();
    return allProducts.filter(product => 
      product.Name.toLowerCase().includes(searchLower) ||
      product.Brand.Name.toLowerCase().includes(searchLower) ||
      (product.DescriptionHtmlSimple && product.DescriptionHtmlSimple.toLowerCase().includes(searchLower))
    );
  }
}