import { getProducts } from "../../api/api";
import React, { useState, useEffect } from "react";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import ProductList from "../ProductList/ProductList";

const Checkout = () => {
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getProducts();
      setProducts(data);
      setIsLoading(false);
    })();
  }, []);

  const addProductToCart = (productId) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      newCart[productId] = (newCart[productId] || 0) + 1;
      return newCart;
    });
  };

  const removeProductFromCart = (productId) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[productId] > 0) {
        newCart[productId] -= 1;
      }
      if (newCart[productId] === 0) {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const cartSubtotal = Object.keys(cart).reduce(
    (acc, productId) =>
      acc +
      products.find((p) => p.id === parseInt(productId)).price *
        cart[productId],
    0
  );

  const discount = cartSubtotal > 1000 ? cartSubtotal * 0.1 : 0;
  const total = cartSubtotal - discount;

  return (
    <>
      <LoadingIcon isLoading={isLoading} />
      {!isLoading && (
        <>
          <div className="product-grid">
            <ProductList
              cart={cart}
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
                {Object.keys(cart).map((productId) => {
                  const product = products.find(
                    (p) => p.id === parseInt(productId)
                  );
                  const quantity = cart[productId];
                  return (
                    <tr key={productId}>
                      <td>{product.name}</td>
                      <td>${product.price.toFixed(2)}</td>
                      <td>
                        <button
                          onClick={() =>
                            removeProductFromCart(productId)
                          }
                        >
                          -
                        </button>
                        {quantity}
                        <button
                          onClick={() =>
                            addProductToCart(productId)
                          }
                        >
                          +
                        </button>
                      </td>
                      <td>
                        ${(product.price * quantity).toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p>Subtotal: ${cartSubtotal.toFixed(2)}</p>
            <p>Discount: ${discount.toFixed(2)}</p>
            <p>Total: ${total.toFixed(2)}</p>
          </div>
        </>
      )}
    </>
  );
};

export default Checkout;
