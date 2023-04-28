import { Document } from 'mongoose';

interface ProductDbInterface extends Document {
  _id?: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export default ProductDbInterface;