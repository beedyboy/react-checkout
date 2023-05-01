import mongoose, { Model } from "mongoose";

const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
    maxlength: [100, "Product name must be at least 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    maxlength: [5, "Product price must be at least 100 characters"],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
    minlength: [30, "Product description must be at least 30 characters"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    required: [true, "Product category is required"],
    enum: {
      values: [
        "Vitamins and Supplements",
        "Personal Care",
        "Sports Nutrition",
        "Natural and Organic",
        "Medical Devices",
        "Over-the-Counter (OTC) Medications",
      ],
      message: "Please select a valid category",
    },
  },
  seller: {
    type: String,
    required: [true, "Product seller is required"],
  },
  stock: {
    type: Number,
    required: [true, "Product stock is required"],
    maxLength: [5, "Product stock must be at most 10 characters"],
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model("Product", productSchema);
