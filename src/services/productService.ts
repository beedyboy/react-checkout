import { Product } from "../types";

class ProductService {
  async getAllProducts(): Promise<Product[]> {
    const response = await fetch("/api/products");
    const data = await response.json();
    return data;
  }
}

export default new ProductService();
