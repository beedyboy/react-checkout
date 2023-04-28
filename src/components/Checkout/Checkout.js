import {
  totalPrice,
  addOrRemoveProductFromCart,
} from "../../helpers/helpers";
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

  const { addProductToCart, removeProductFromCart } =
    addOrRemoveProductFromCart(setCart);

  const { cartSubtotal, discount, total } = totalPrice(
    cart,
    products
  );

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
            products={products}
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
