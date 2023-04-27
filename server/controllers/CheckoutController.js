const Checkout = require('../model/Checkout');

const customerCheckout = async (req, res) => {
  const { products } = req.body;
  try {
    const checkout = await Checkout;
    const newCheckout = {
      id: checkout.length + 1,
      products,
    };
    checkout.push(newCheckout);
    res.status(201).json({ message: 'Success', checkout });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = customerCheckout;
