import React, { useState, useEffect } from 'react';
import { getProducts } from './api';
import LoadingIcon from './LoadingIcon';

const Product = ({ product, addProductToCart, removeFromCart }) => {
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
  const [isLoading, setIsloading] = useState(true);
  const [productCount, setProductCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProducts();
        setProducts(data);
        setIsloading(false);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []);

  const addProductToCart = (productId) => {
    // find the max-quantity for each product
    setProductCount(
      products.find((product) => product.id === productId).quantity
    );

    // copy items inside cart to a temp-cart variable
    const updatedCartItems = [...cartItems];

    // search if item already exists in cart
    const existingItemIndex = updatedCartItems.findIndex(
      (item) => item.id === productId
    );

    // if item already exists in temp-cart increase quantity and recalculate total
    if (existingItemIndex > -1) {
      updatedCartItems[existingItemIndex].quantity++;
      updatedCartItems[existingItemIndex].total =
        updatedCartItems[existingItemIndex].price *
        updatedCartItems[existingItemIndex].quantity;
    }
    // if its a new item create an object to represent it and push to temp-cart
    else {
      updatedCartItems.push({
        id: products.find((product) => product.id === productId).id,
        name: products.find((product) => product.id === productId).name,
        quantity: 1,
        price: products.find((product) => product.id === productId).price,
        total: products.find((product) => product.id === productId).price * 1,
      });
    }

    // save updated values from temp-cart to actual cart
    setCartItems(updatedCartItems);
  };

  const removeProductFromCart = (productId) => {};
  return (
    <>
      {isLoading ? (
        <>
          {' '}
          <LoadingIcon />
        </>
      ) : (
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
      )}
    </>
  );
};

export default Checkout;
