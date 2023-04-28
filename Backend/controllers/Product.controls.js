const { productServices } = require('../services/product');

const productControls = {
  getAllProducts: async (req, res) => {
    try {
      const products = await productServices.getProducts();

      res.status(200).json(products);
    } catch (error) {
      console.log(error);
    }
  },

  addProducts: async (req, res) => {
    const { id, name, description, price, quantity } = req.body;

    try {
      const product = await productServices.addProduct({
        id,
        name,
        description,
        price,
        quantity,
      });

      res.status(200).json(product);
    } catch (error) {
      console.log(error);
    }
  },

  // getCart: async (req, res) => {
  //   res.send('cart');
  // },
};

module.exports = { productControls };
