import React, { useCallback, useEffect, useState } from "react";
import { CheckoutUI } from "../ui";
import { getProducts } from "../services";

export default function Checkout() {
  const [products, setProducts] = useState([]);
  //TODO:// make cart a global variable using redux, so it can be populated even from the landing page
  //only localize order - see this effect for senior level adjustment
  const [carts, setCarts] = useState([]); //using cart to ensure only selected products are added as order
  //order has property such as quantity
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await getProducts();
      setProducts(data);
    }
    fetchData();
  }, []);
  //TODO: move to redux function (global)
  const addProductToCart = useCallback(
    (productId) => {
      if (carts.indexOf(productId) === -1) {
        const order = products?.find((product) => product.id === productId);
        setCarts([...carts, productId]);
        setOrders((orders) => [...orders, { ...order, quantity: 1 }]);
      }
    },
    [JSON.stringify(carts), JSON.stringify(products)]
  );

  //TODO: move to redux function (global)
  const removeProductFromCart = useCallback(
    (productId) => {
      carts.splice(carts.indexOf(productId), 1);
      const orderIndex = orders.findIndex((order) => order.id === productId);
      if (orderIndex !== -1) {
        orders.splice(orderIndex, 1);
        setOrders([...orders]);
      }
      setCarts([...carts]);
    },
    [JSON.stringify(carts), JSON.stringify(products)]
  );
  const increaseQty = useCallback(
    (orderId) => {
      const orderIndex = orders?.findIndex((order) => order.id === orderId);
      if (orderIndex !== -1) {
        orders[orderIndex].quantity += 1;
        setOrders([...orders]);
      }
    },
    [JSON.stringify(orders)]
  );
  const decreaseQty = useCallback(
    (orderId) => {
      const orderIndex = orders?.findIndex((order) => order.id === orderId);
      if (orderIndex !== -1) {
        orders[orderIndex].quantity -= 1;
        setOrders([...orders]);
      }
    },
    [JSON.stringify(orders)]
  );
  return (
    <CheckoutUI
      orderProps={{
        orders,
        increaseQty,
        decreaseQty,
      }}
      products={products}
      productListProps={{
        addProductToCart,
        removeProductFromCart,
      }}
    />
  );
}
