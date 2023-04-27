import Product from './ProductItem';
import { ProductListTypes } from '../../utils/types';

const ProductList = ({
  products,
  addProductToCart,
  removeProductFromCart,
  cart
}: ProductListTypes) => {
  return (
    <section className="product-list">
      <h2>Order Products</h2>
      <div className="card-container">
        {products?.map((product: any) => (
          <div
            key={product.id}
            className="card"
            style={{ backgroundImage: `url('/health.jpg')` }}
          >
            <Product
              product={product}
              addProductToCart={addProductToCart}
              removeProductFromCart={removeProductFromCart}
              cart={cart}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductList;
