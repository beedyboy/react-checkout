import React from "react";
import LoadingIcon from "../LoadingIcon";
import { ProductListUI } from "./ProductListUI";

export const CheckoutUI = ({ products, orderProps, productListProps }) => {
  const { orders, increaseQty, decreaseQty } = orderProps || {}; //js - incase undefined
  if (!products) return <LoadingIcon />;
  return (
    <>
      <div className="product-grid">
        <ProductListUI {...productListProps} products={products} />
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
            {orders?.map((item) => {
              //using products directly to ensure updated quantity at all times
              const product = products?.find(
                (product) => product.id === item.id
              );
              return (
                <tr key={`cart-item-${item?.id}`}>
                  <td>{item?.name}</td>
                  <td>${item?.price}</td>
                  <td>
                    <button
                      disabled={item.quantity === 1}
                      onClick={() => decreaseQty?.(item.id)}
                    >
                      -
                    </button>
                    {item?.quantity}
                    <button
                      disabled={item.quantity === product.quantity}
                      onClick={() => increaseQty?.(item.id)}
                    >
                      +
                    </button>
                  </td>
                  <td>${item?.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p>Subtotal: $0</p>
        <p>Discount: $0</p>
        <p>Total: $0</p>
      </div>
    </>
  );
};
