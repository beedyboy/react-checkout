import Product from './productdb.model';
import ProductInterface from "./productdb.interface";

// interface for the user query
interface productQueryInterface {
  [key: string]: any;
}

// User CRUD operations module
export default class ProductCRUD {

  static async create(product: ProductInterface) {
    const createdUser = await Product.create(product);
    return createdUser;
  }

  static async readAll() {
    const products = await Product.find();
    return products;
  }

  static async readByQuery(query: productQueryInterface) {
    const product = await Product.findOne(query);
    return product;
  }

  static async update(id: string, product: ProductInterface) {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    return updatedProduct;
  }

  static async updateByQuery(query: productQueryInterface, user: ProductInterface) {
  const updatedProduct = await Product.findOneAndUpdate(query, user, { new: true });
  return updatedProduct;
}

  static async delete(query: productQueryInterface) {
    const deletedProduct = await Product.deleteMany(query);
    return deletedProduct;
  }
}