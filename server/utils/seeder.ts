import Product from "../model/productModel";
import { connectDb } from "../config/connectDb";
import products from "../data/product.json";

// Run data base connection
connectDb();

export const seedProducts = async (): Promise<void> => {
  try {
    await Product.deleteMany();
    console.log("Product Deletes");

    await Product.insertMany(products);
    console.log("All products are added");

    process.exit();
  } catch (error: any) {
    console.log(error.message);
  }
};

// seedProducts();
