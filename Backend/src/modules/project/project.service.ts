import ProductDbInterface from '../../utils/db/product/productdb.interface';
import ProductCRUD from '../../utils/db/product/productdb.manager';
import ProductInterface from './product.interface';

export async function createProduct(productData: ProductInterface): Promise<ProductDbInterface> {
  let {name, description, price, quantity} = productData;
  const product: ProductInterface = {
    name, description, price, quantity
  }
  const newProduct = await ProductCRUD.create(product);
  return newProduct;
}
