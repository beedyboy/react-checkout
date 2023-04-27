import React, { useState, useEffect } from "react";
import { getProducts } from "./api";
import LoadingIcon from "./LoadingIcon";

const Product = ({ product, addProductToCart, removeFromCart }) => {
  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p className="product-quantity">
        <button onClick={() => addProductToCart(product.id)}>Add</button>
        Quantity:
        <span>{product.quantity}</span>
        <button onClick={() => removeFromCart(product.id)}>Remove</button>
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
          <div key={product.id} className="card">
            <Product
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

const Checkout = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    let subTotal = cart.reduce(
      (acc, product) => (acc += product.price * product.quantity),
      0
    );

    let discount = 0;
    let total = subTotal;

    if (subTotal > 1000) {
      discount = subTotal * 0.1;

      total -= discount;
    }
    setSubTotal(subTotal);
    setDiscount(discount);
    setTotal(total);
  }, [cart]);

  const addProductToCart = (productId) => {
    const product = products.find((product) => product.id === productId);

    if (product) {
      const cartItem = cart.find((product) => product.id === productId);

      if (cartItem) return;

      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeProductFromCart = (productId) => {
    const cartItem = cart.find((product) => product.id === productId);

    if (cartItem) {
      const newCart = cart.filter((product) => product.id !== productId);

      setCart(newCart);
    }
  };

  const increaseQuantity = (productId) => {
    const product = products.find((product) => product.id === productId);

    const cartItem = cart.find((product) => product.id === productId);

    if (cartItem) {
      if (cartItem.quantity >= product.quantity) return;

      const newCart = cart.filter((product) => product.id !== productId);

      setCart([...newCart, { ...cartItem, quantity: cartItem.quantity + 1 }]);
    }
  };

  const decreaseQuantity = (productId) => {
    const cartItem = cart.find((product) => product.id === productId);

    if (cartItem) {
      if (cartItem.quantity <= 1) return;

      const newCart = cart.filter((product) => product.id !== productId);

      setCart([...newCart, { ...cartItem, quantity: cartItem.quantity - 1 }]);
    }
  };

  return (
    <>
      <div className="product-grid">
        {loading ? (
          <LoadingIcon isLoading={loading} />
        ) : (
          <ProductList
            products={products}
            addProductToCart={addProductToCart}
            removeProductFromCart={removeProductFromCart}
          />
        )}
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

          {cart.length > 0 && (
            <tbody>
              {cart
                .sort((a, b) => a.id - b.id)
                .map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>${item.price}</td>
                    <td>
                      <button onClick={() => decreaseQuantity(item.id)}>
                        -
                      </button>
                      {item.quantity}
                      <button onClick={() => increaseQuantity(item.id)}>
                        +
                      </button>
                    </td>
                    <td>${item.price}</td>
                  </tr>
                ))}
            </tbody>
          )}
        </table>
        <p>Subtotal: ${subTotal.toFixed(2)}</p>
        <p>Discount: ${discount.toFixed(2)}</p>
        <p>Total: ${total.toFixed(2)}</p>
      </div>
    </>
  );
};

export default Checkout;
