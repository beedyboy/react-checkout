import { useContext } from "react";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import ProductList from "../ProductList/ProductList";
import OrderSummary from "../OrderSummary/OrderSummary";
import { CheckoutContext } from "../../context/CheckoutContext";

const Checkout = () => {
  const { state } = useContext(CheckoutContext);
  return (
    <>
      <LoadingIcon />
      {!state.isLoading && (
        <>
          <ProductList />
          <OrderSummary />
        </>
      )}
    </>
  );
};

export default Checkout;
