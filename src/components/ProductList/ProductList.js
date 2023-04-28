import Product from "../Product/Product";

const ProductList = ({
  cart,
  products,
  addProductToCart,
  removeProductFromCart,
}) => {
  return (
    <div>
      <h1>Health Products</h1>

      <div className="card-container">
        {products.map((product) => (
          <div
            key={product.id}
            className="card"
          >
            <Product
              cart={cart}
              product={product}
              addProductToCart={addProductToCart}
              removeProductFromCart={removeProductFromCart}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
