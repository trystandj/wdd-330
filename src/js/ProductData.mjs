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
    this.category = category;
    // this.path = `../json/${this.category}.json`;
  }
  
  // getData(category) { return fetch(this.path).then(convertToJson).then((data) => data);}
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    // console.log(data);
    return data.Result;
  }

  async findProductById(id) {
    // const products = await this.getData();
    const product = await fetch(`${baseURL}product/${id}`);
    // return products.find((item) => item.Id === id);
    const data = await convertToJson(product);
    return data.Result;
  }
}
