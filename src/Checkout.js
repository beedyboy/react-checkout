import React, { useState, useEffect } from "react";
import { getProducts } from "./api";
import LoadingIcon from "./LoadingIcon";

const Product = ({
  product,
  removeFromCart,
  addProductToCart,
}) => {
  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p className="product-quantity">
        <button onClick={addProductToCart}>Add</button>
        Quantity:
        <span>{product.quantity}</span>
        <button onClick={removeFromCart}>Remove</button>
      </p>
    </div>
  );
};

export const ProductList = ({
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
            <Product product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

const Checkout = () => {
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getProducts();
      setProducts(data);
    }
    fetchData();
  }, []);

  const addProductToCart = (productId) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      newCart[productId] = (newCart[productId] || 0) + 1;
      return newCart;
    });
  };

  const removeProductFromCart = (productId) => {};
  return (
    <>
      <div className="product-grid">
        <ProductList
          products={products}
          addProductToCart={addProductToCart}
          removeProductFromCart={removeProductFromCart}
        />
      </div>
      <div className="checkout-grid">
        <h1>Order Summary</h1>
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
            {products.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <button>-</button>
                  {item.quantity}
                  <button>+</button>
                </td>
                <td>${item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>Subtotal: $0</p>
        <p>Discount: $0</p>
        <p>Total: $0</p>
      </div>
    </>
  );
};

export default Checkout;
