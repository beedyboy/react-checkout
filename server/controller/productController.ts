import { Request, Response, NextFunction } from "express";
import Product from "../model/productModel";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middleware/catchAsyncErrors";
import APIQuery from "../utils/apiQuery";

// Get all Products, Route to => api/v1/products?keyword=apple GET ***
export const getAllProducts = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const resultsPerPage = 4;
    const productCount = await Product.countDocuments();

    const apiQuery = new APIQuery(Product.find(), req.query).paginate(
      resultsPerPage
    );

    const products = await apiQuery.query;
    res.status(200).json({
      message: "All Products",
      success: true,
      productCount,
      resultsPerPage,
      products,
    });
  }
);

// Get single Product, Route to => api/v1/product/:id GET ***
export const getSingleProduct = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
      message: "Product Found",
      success: true,
      product,
    });
  }
);
