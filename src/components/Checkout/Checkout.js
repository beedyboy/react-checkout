import { Fragment, useContext } from "react";
import { ErrorMssg } from "../ErrorMssg/ErrorMssg";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import ProductList from "../Products/ProductList";
import OrderSummary from "../OrderSummary/OrderSummary";
import { CheckoutContext } from "../../context/CheckoutContext";

const Checkout = () => {
  const { state } = useContext(CheckoutContext);

  return (
    <>
      {state.errorFetching ? (
        <ErrorMssg />
      ) : (
        <Fragment>
          <LoadingIcon />
          {!state.isLoading && (
            <Fragment>
              <ProductList />
              <OrderSummary />
            </Fragment>
          )}
        </Fragment>
      )}
    </>
  );
};

export default Checkout;
