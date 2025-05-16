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
    this.path = `../json/${this.category}.json`;
  }
  // The getData() method uses just promises and .then()
  getData() {   
    return fetch(this.path)
      .then(convertToJson)
      //    function(data) { return data; }
      .then((data) => data);
  }
  // findProductById() method uses async/await. 
  async findProductById(id) {
    const products = await this.getData();
    //                   function(item) { return item.Id === id; }
    return products.find((item) => item.Id === id);
  }
}
