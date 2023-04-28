const { Product } = require('../models/products.model');

const productServices = {
  getProducts: async () => {
    return Product.find();
  },
  getProductById: async (Id) => {
    return Product.findById(Id);
  },
  addProduct: async (newProduct) => {
    return Product.create(newProduct);
  },
};

module.exports = { productServices };
