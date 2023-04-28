import { useContext } from "react";
import OrderTable from "./OrderTable";
import { CheckoutContext } from "../../context/CheckoutContext";

const OrderSummary = () => {
  const { total, discount, cartSubtotal } =
    useContext(CheckoutContext);

  return (
    <div className="checkout-grid">
      <h1>Order Summary</h1>
      <OrderTable />
      <p>Subtotal: ${cartSubtotal.toFixed(2)}</p>
      <p>Discount: ${discount.toFixed(2)}</p>
      <p>Total: ${total.toFixed(2)}</p>
    </div>
  );
};

export default OrderSummary;
