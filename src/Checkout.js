import React, { useState, useEffect } from "react";
import { getProducts } from "./api";
import LoadingIcon from "./LoadingIcon";

const Product = ({ product, cart, refresh }) => {
  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: {dollarFormat(product.price)}</p>
      <p className="product-quantity">
        <button onClick={() => addProductToCart(product, cart, refresh)} disabled={cart[product.id]}>Add</button>
        Quantity:
        <span>{product.quantity}</span>
        <button onClick={() => removeFromCart(product, cart, refresh)} disabled={!cart[product.id]}>Remove</button>
      </p>
    </div>
  );
};

export const ProductList = ({ products, cart, refresh }) => {
  return (
    <div>
      <h1>Health Products</h1>

      <div className="card-container">
        {products.map((product) => (
          <div key={product.id} className="card">
            <Product product={product} cart={cart} refresh={refresh} />
          </div>
        ))}
      </div>
    </div>
  );
};

const Checkout = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getProducts();
      setProducts(data);
    }
    fetchData();
  }, []);
  const refresh = useRefresh();
  const [cart, setCart] = useState({});
  const subtotal = Object.values(cart).reduce((total, { item, quantity }) => total + item.price * quantity, 0);
  return (
    <>
      <div className="product-grid">
        <ProductList products={products} cart={cart} refresh={refresh} />
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
            {Object.values(cart).map(({ quantity, item }) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{dollarFormat(item.price)}</td>
                <td>
                  <button onClick={() => (cart[item.id].quantity--, refresh())} disabled={cart[item.id].quantity === 1}>-</button>
                  {quantity}
                  <button onClick={() => (cart[item.id].quantity++, refresh())} disabled={cart[item.id].quantity === item.quantity}>+</button>
                </td>
                <td>{dollarFormat(item.price * quantity)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>Subtotal: {dollarFormat(subtotal)}</p>
        {(subtotal > 1000) ? <p>Discount: {dollarFormat(0.1 * subtotal)}</p> : ''}
        <p>Total: {dollarFormat(subtotal > 1000 ? 0.9 * subtotal : subtotal)}</p>
      </div>
    </>
  );
};

const addProductToCart = (product, cart, refresh) => {
  cart[product.id] = { quantity: 1, item: product };
  refresh();
};
const removeFromCart = (product, cart, refresh) => {
  delete cart[product.id];
  refresh();
};
function dollarFormat(number) {
  return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
function useRefresh() {
  const [value, setValue] = useState(0);
  return () => setValue(value => value + 1);
}
export default Checkout;
