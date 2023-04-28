import productModel from './productdb.model';
import ProductDbInterface from './productdb.interface';
import ProductInterface from '../../../modules/project/product.interface';

// interface for the user query
interface productQueryInterface {
  [key: string]: any;
}

// User CRUD operations module
export default class ProductCRUD {

  static async create(product: ProductInterface): Promise<ProductDbInterface> {
    const Product = await productModel()
    const createdProduct = await Product.create(product);
    return createdProduct;
  }

  static async readAll() {
    const Product = await productModel()
    const products = await Product.find();
    return products;
  }

  static async readByQuery(query: productQueryInterface) {
    const Product = await productModel()
    const product = await Product.findOne(query);
    return product;
  }

  static async update(id: string, product: ProductInterface) {
    const Product = await productModel()
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    return updatedProduct;
  }

  static async updateByQuery(query: productQueryInterface, product: ProductInterface) {
  const Product = await productModel()
  const updatedProduct = await Product.findOneAndUpdate(query, product, { new: true });
  return updatedProduct;
}

  static async delete(query: productQueryInterface) {
    const Product = await productModel()
    const deletedProduct = await Product.deleteMany(query);
    return deletedProduct;
  }
}