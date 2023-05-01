"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedProducts = void 0;
const productModel_1 = __importDefault(require("../model/productModel"));
const connectDb_1 = require("../config/connectDb");
const product_json_1 = __importDefault(require("../data/product.json"));
// Run data base connection
(0, connectDb_1.connectDb)();
const seedProducts = async () => {
    try {
        await productModel_1.default.deleteMany();
        console.log("Product Deletes");
        await productModel_1.default.insertMany(product_json_1.default);
        console.log("All products are added");
        process.exit();
    }
    catch (error) {
        console.log(error.message);
    }
};
exports.seedProducts = seedProducts;
// seedProducts();
