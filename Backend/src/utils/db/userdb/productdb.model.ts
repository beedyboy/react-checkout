import { Schema, Model } from 'mongoose';
import ProductInterface from './productdb.interface';
import DB from '../db_manager';
import * as dotenv from 'dotenv';

dotenv.config();

const db = new DB(process.env.URI_STRING + `/${process.env.DB_NAME}`);

console.log(db.connection())
const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const Product: Model<ProductInterface> = db.connection().model<ProductInterface>('Product', ProductSchema);

export default Product;