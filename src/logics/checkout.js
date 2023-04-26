import React, { useCallback, useEffect, useState } from "react";
import { CheckoutUI } from "../ui";
import { getProducts } from "../services";

/**
 *
 * @param {
 *  productListProps : { products, addProductToCart, removeProductFromCart},
 *  productProps: { product, addProductToCart, removeFromCart },
 *  products:
 * } props
 * @returns React.ReactNode
 */
export default function Checkout() {
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await getProducts();
      setProducts(data);
    }
    fetchData();
  }, []);
  const addProductToCart = useCallback(
    (productId) => {
      if (carts.indexOf(productId) === -1) {
        return setCarts([...carts, productId]);
      }
    },
    [JSON.stringify(carts)]
  );

  const removeProductFromCart = useCallback(
    (productId) => {
      carts.splice(carts.indexOf(productId), 1);
      setCarts([...carts]);
    },
    [JSON.stringify(carts)]
  );
  return (
    <CheckoutUI
      carts={carts}
      products={products}
      productListProps={{
        addProductToCart,
        removeProductFromCart,
      }}
    />
  );
}
