import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    async function fetchData() {
      const data = await getProducts();
      setProducts(data);
    }
    fetchData();
  }, []);
  const addProductToCart = (productId) => {};

  const removeProductFromCart = (productId) => {};
  return (
    <CheckoutUI
      products={products}
      productListProps={{
        addProductToCart,
        removeProductFromCart,
      }}
    />
  );
}
