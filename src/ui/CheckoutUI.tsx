import React from "react";
import LoadingIcon from "../LoadingIcon";
import { ProductListUI, ProductListUIProps } from "./ProductListUI";
import { numberFormat } from "./common";
import { IOrder, IProduct } from "./types";

export interface OrderProps {
  orders: IOrder[];
  increaseQty: (orderId: number) => void;
  decreaseQty: (orderId: number) => void;
}
export interface CheckoutUIProps {
  products?: IProduct[];
  orderProps?: OrderProps;
  productListProps?: Omit<ProductListUIProps, "products">;
}
export const CheckoutUI: React.FC<CheckoutUIProps> = ({
  products,
  orderProps,
  productListProps,
}) => {
  const { orders, increaseQty, decreaseQty } = orderProps || {}; //js - incase undefined
  if (!products) return <LoadingIcon isLoading />;
  //total summary
  const total = {
    subTotal: 0,
    discount: 0,
  };
  const calculateDiscount = (amount: number, percent: number): number => {
    if (amount >= 1000) {
      return (amount / 100) * percent;
    }
    return 0;
  };
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
            {/* Using order with product structure to ensure only carted list show*/}
            {orders?.map((item) => {
              //using products directly to ensure updated quantity at all times
              const product = products?.find(
                (product) => product.id === item.id
              );
              const amount = item.quantity * item.price;
              //add to total amount
              total.subTotal += amount;
              total.discount = calculateDiscount(total.subTotal, 10);
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
                      disabled={item.quantity === product?.quantity}
                      onClick={() => increaseQty?.(item.id)}
                    >
                      +
                    </button>
                  </td>
                  <td>${numberFormat(amount)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p>Subtotal: ${numberFormat(total.subTotal)}</p>
        <p>Discount: ${numberFormat(total.discount)}</p>
        <p>
          {/*removed discount from total*/}
          Total: ${numberFormat(total.subTotal - total.discount)}
        </p>
      </div>
    </>
  );
};
