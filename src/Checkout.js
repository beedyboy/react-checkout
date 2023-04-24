import React, { useState, useEffect } from "react";
import { getProducts } from "./api";
import LoadingIcon from "./LoadingIcon";
import CartContext from "./context/CartContext";
import { useContext } from "react";

// USED CONTEXT API TO AVOID PROP DRILLING
// THERE ADD AND REMOVE FUNCTIONS ARE NOT NEEDED AS ARGUMENTS
const Product = ({ product }) => {
  const { addToCart, increase, cartItems, removeFromCart } =
    useContext(CartContext);
  const isInCart = () => {
    return !!cartItems.find((item) => item.id === product.id);
  };

  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p className="product-quantity">
        {isInCart(product) && (
          <button
            onClick={() => {
              increase(product);
            }}
          >
            Add More
          </button>
        )}
        Quantity:
        {!isInCart(product) && (
          <button onClick={() => addToCart(product)}>Add</button>
        )}
        <span>{product.quantity}</span>
        <button onClick={() => removeFromCart(product)}>Remove</button>
      </p>
    </div>
  );
};

export const ProductList = ({ products }) => {
  return (
    <div>
      <h1>Health Products</h1>
      <div className="card-container">
        {products.map((product) => (
          <div key={product.id} className="card">
            <Product product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { cartItems, increase, decrease, total } = useContext(CartContext);

  useEffect(() => {
    async function fetchData() {
      const data = await getProducts();
      setProducts(data);
    }
    setIsLoading(true);
    fetchData();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <LoadingIcon />;
  }
  return (
    <>
      <div className="product-grid">
        <ProductList products={products} />
      </div>
      <div className="checkout-grid">
        <h1>Order Summary</h1>
        {cartItems.length === 0 ? (
          <h2>Cart is Empty</h2>
        ) : (
          <table className="order-summary-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>
                    <button
                      disabled={item.quantity <= 1}
                      onClick={() => decrease(item)}
                    >
                      -
                    </button>
                    {item.quantity}
                    <button onClick={() => increase(item)}>+</button>
                  </td>
                  <td>${item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <p>Subtotal: ${total}</p>
        <p>Discount: ${total >= 1000 ? Math.round(total * 10) / 100 : 0}</p>
        <p>
          Total: $
          {(total - (total >= 1000 ? Math.round(total * 10) / 100 : 0)).toFixed(
            2
          )}
        </p>
      </div>
    </>
  );
};

export default Checkout;
