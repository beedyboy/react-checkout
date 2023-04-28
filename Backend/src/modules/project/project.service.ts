import ProductInterface from '../../utils/db/userdb/productdb.interface';
import ProductCRUD from '../../utils/db/userdb/productdb.manager';

export async function createProduct(productData: ProductInterface): Promise<ProductInterface> {
  let {name, description, price, quantity} = productData;
  const product: ProductInterface = {
    name, description, price, quantity
  }
  const newProduct = await ProductCRUD.create(product);
  return newProduct;
}

