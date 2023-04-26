import Product from './ProductItem';
import Img from '../../assets/images/health.jpg';

const ProductList = ({
  products,
  addProductToCart,
  removeProductFromCart,
}: any) => {

  return (
    <section className="product-list">
      <h2>Order Products</h2>
      <div className="card-container">
        {products?.map((product: any) => (
          <div
            key={product.id}
            className="card"
            style={{ backgroundImage: `url(${Img})` }}
          >
            <Product product={product} addProductToCart={addProductToCart} removeProductFromCart={removeProductFromCart} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductList;
