const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
  id: {
    type: Number,
    required: [true, 'Please enter product Id'],
    unique: true,
  },
  name: {
    type: String,
    required: [true, 'Please enter product name'],
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Please enter product description'],
  },
  price: {
    type: Number,
    required: [true, 'please enter product price'],
  },
  quantity: {
    type: Number,
    required: [true, 'please enter product quantity'],
  },
});

const Product = model('Product', ProductSchema);

module.exports = { Product };
