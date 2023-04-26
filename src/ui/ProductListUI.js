import { ProductUI } from "./ProductUI";

export const ProductListUI = ({
  products,
  addProductToCart,
  removeProductFromCart,
}) => {
  return (
    <div>
      <h1>Health Products</h1>

      <div className="card-container">
        {products.map((product) => (
          <div key={product.id} className="card">
            <ProductUI
              product={product}
              addProductToCart={addProductToCart}
              removeFromCart={removeProductFromCart}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
