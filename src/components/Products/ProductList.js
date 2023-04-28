import Product from "./Product";
import { useContext } from "react";
import { CheckoutContext } from "../../context/CheckoutContext";

const ProductList = () => {
  const { state } = useContext(CheckoutContext);
  return (
    <div className="product-grid">
      <div>
        <h1>Health Products</h1>
        <div className="card-container">
          {state.products.map((product) => (
            <div
              key={product.id}
              className="card"
            >
              <Product product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
