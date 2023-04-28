import { getProducts } from "../../api/api";
import React, { useState, useEffect } from "react";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import ProductList from "../ProductList/ProductList";
import OrderSummary from "../OrderSummary/OrderSummary";

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
          <ProductList
            cart={cart}
            products={products}
            addProductToCart={addProductToCart}
            removeProductFromCart={removeProductFromCart}
          />
          <OrderSummary
            cart={cart}
            total={total}
            discount={discount}
            cartSubtotal={cartSubtotal}
            addProductToCart={addProductToCart}
            removeProductFromCart={removeProductFromCart}
          />
        </>
      )}
    </>
  );
};

export default Checkout;
