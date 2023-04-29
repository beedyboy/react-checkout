// Import productModel for database interaction
import productModel from './productdb.model';

// Import ProductDbInterface and ProductInterface
import ProductDbInterface from './productdb.interface';
import ProductInterface from '../../../modules/project/product.interface';

// Define an interface for the user query
interface productQueryInterface {
  [key: string]: any;
}

export default class ProductCRUD {
  // Declare Product as a static private variable
  private static Product: any;

  // Create a new product
  static async create(product: ProductInterface): Promise<ProductDbInterface> {
    // If Product is not defined, initialize it with productModel()
    if (!this.Product) {
      this.Product = await productModel();
    }

    // Create a new product from the provided ProductInterface
    const newProduct = new this.Product(product);

    // Validate the new product
    try {
      await newProduct.validate();
    } catch (error: any) {
      throw new Error(`Invalid product: ${error.message}`);
    }

    // Save the new product and return it as a plain object
    const createdProduct = await newProduct.save();
    return createdProduct.toObject();
  }

  // Get all products
  static async readAll(): Promise<ProductDbInterface[]> {
    // If Product is not defined, initialize it with productModel()
    if (!this.Product) {
      this.Product = await productModel();
    }

    // Get all products and return them as an array of plain objects
    const products = await this.Product.find({});
    return products.map((product: ProductDbInterface) => product.toObject());
  }

  // Get a product by query
  static async readByQuery(query: productQueryInterface): Promise<ProductDbInterface> {
    // If Product is not defined, initialize it with productModel()
    if (!this.Product) {
      this.Product = await productModel();
    }

    // Find a product that matches the provided query and return it as a plain object
    const product = await this.Product.findOne(query);
    return product.toObject();
  }

  // Update a product by ID
  static async update(id: string, product: ProductInterface): Promise<ProductDbInterface> {
    // If Product is not defined, initialize it with productModel()
    if (!this.Product) {
      this.Product = await productModel();
    }

    // Find a product by ID and update it with the provided ProductInterface
    const updatedProduct = await this.Product.findByIdAndUpdate(id, product, {
      new: true,
    });

    // Throw an error if the product is not found
    if (!updatedProduct) {
      throw new Error('Product not found');
    }

    // Return the updated product as a plain object
    return updatedProduct.toObject();
  }

  // Update a product by query
  static async updateByQuery(query: productQueryInterface, product: ProductInterface): Promise<ProductDbInterface> {
    // If Product is not defined, initialize it with productModel()
    if (!this.Product) {
      this.Product = await productModel();
    }

    // Find a product that matches the provided query and update it with the provided ProductInterface
    const updatedProduct = await this.Product.findOneAndUpdate(query, product, { new: true });

    // Throw an error if the product is not found
    if (!updatedProduct) {
      throw new Error('Product not found');
    }

    // Return the updated product as a plain object
    return updatedProduct.toObject();
  }

  static async delete(query: productQueryInterface): Promise<number> {
    // Check if the Product model has been initialized
    if (!this.Product) {
      this.Product = await productModel();
    }

    // Use the deleteMany method of the Product model to delete products that match the query
    const { deletedCount } = await this.Product.deleteMany(query);

    // If no products were deleted, throw an error
    if (!deletedCount) {
      throw new Error('Product not found');
    }

    // Return the number of products that were deleted
    return deletedCount;
  }
}
