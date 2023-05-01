"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleProduct = exports.getAllProducts = void 0;
const productModel_1 = __importDefault(require("../model/productModel"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const catchAsyncErrors_1 = __importDefault(require("../middleware/catchAsyncErrors"));
const apiQuery_1 = __importDefault(require("../utils/apiQuery"));
// Get all Products, Route to => api/v1/products?keyword=apple GET ***
exports.getAllProducts = (0, catchAsyncErrors_1.default)(async (req, res, next) => {
    const resultsPerPage = 4;
    const productCount = await productModel_1.default.countDocuments();
    const apiQuery = new apiQuery_1.default(productModel_1.default.find(), req.query).paginate(resultsPerPage);
    const products = await apiQuery.query;
    res.status(200).json({
        message: "All Products",
        success: true,
        productCount,
        resultsPerPage,
        products,
    });
});
// Get single Product, Route to => api/v1/product/:id GET ***
exports.getSingleProduct = (0, catchAsyncErrors_1.default)(async (req, res, next) => {
    const product = await productModel_1.default.findById(req.params.id);
    if (!product) {
        return next(new errorHandler_1.default("Product not found", 404));
    }
    res.status(200).json({
        message: "Product Found",
        success: true,
        product,
    });
});
