const db = require('../models');

// Create main model
const Product = db.products;

// Create product
module.exports.createProduct = async (req, res) => {
  try {
    let { name, description, price, quantity } = req.body
    if(!name || !description || !price || !quantity) throw new error('All fields must be filled');

    const product = new Product({
      name: name,
      description: description,
      price: price,
      quantity: quantity,
    })


    const savedProduct = await product.save()

    console.log(savedProduct)

    return res.status(201).json({
      message: 'Product successfully created',
      product: savedProduct
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong'
    })
  }
}

module.exports.getProducts = async (req, res) => {
  try {
    const product = await Product.findAll({});

    if(!product) {
      return res.status(404).json({
        message: "No product found in the database",
      })
    }

    return res.status(200).json({
        message: "product fetched successfully",
        data: product,
    })
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findOne({
      where: {
        id: id,
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "product not found in the database",
      });
    } else {
      res.status(200).json({
        message: "product fetched successfully",
        data: product,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, price, description, publish } = req.body;

  try {
    const product = await Product.update(
      {
        title: title,
        price: price,
        description: description,
        publish: publish
      },
      {
      where: {
        id: id,
      },
    }
    );

    if (!product) {
      return res.status(404).json({
        message: "product not found in the database",
      });
    } else {
      res.status(200).json({
        message: `product with id ${id} successfully updated`,
        product: product
      })
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.destroy({
      where: {
        id: id,
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "product not found in the database",
      });
    } else {
      res.status(200).json({
        message: "product deleted successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// 1 to many product controller
module.exports.getProductReviews = async (req, res) => {
  try {
    const product = await Product.findAll({
      include: [{
        model: Review,
        as: 'review'
      }],
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({
      message: "product review fetched successfully",
      data: product
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}