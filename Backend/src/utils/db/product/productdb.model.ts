import { Schema, Model } from 'mongoose';
import ProductInterface from './productdb.interface';
import DB from '../db_manager';
import * as dotenv from 'dotenv';

dotenv.config();

// This function creates a new Mongoose model for the "Product" collection, based on the ProductInterface schema
async function productModel() {
  // Connect to the database using the URI string from the environment variables
  const db = new DB(`${process.env.URI_STRING}`);
  await db.connect()

  // Define the schema for the "Product" collection
  const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
  });

  // Create a new Mongoose model for the "Product" collection, based on the ProductInterface schema
  const Product: Model<ProductInterface> = db.connection().model<ProductInterface>('Product', ProductSchema);
  return Product
}

export default productModel;
