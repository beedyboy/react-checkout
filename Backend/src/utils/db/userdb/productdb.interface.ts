import { Document } from 'mongoose';

interface ProductInterface extends Document {
  _id?: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export default ProductInterface;