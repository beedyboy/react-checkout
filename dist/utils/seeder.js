"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productModel_1 = __importDefault(require("../model/productModel"));
const connectDb_1 = require("../config/connectDb");
// import products from "../data/products.json";
// Run data base connection
(0, connectDb_1.connectDb)();
const seedProducts = async () => {
    try {
        await productModel_1.default.deleteMany();
        console.log("Product Deletes");
        // await Product.insertMany(products);
        console.log("All products are added");
        process.exit();
    }
    catch (error) {
        console.log(error.message);
    }
};
seedProducts();
