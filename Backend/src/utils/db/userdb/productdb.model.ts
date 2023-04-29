import { Schema, Model } from 'mongoose';
import ProductInterface from './productdb.interface';
import DB from '../db_manager';
import * as dotenv from 'dotenv';

dotenv.config();

async function productModel() {
  const db = new DB(`${process.env.URI_STRING}`);
  await db.connect()
  const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }});

  const Product: Model<ProductInterface> = db.connection().model<ProductInterface>('Product', ProductSchema);
  return Product
}

export default productModel;