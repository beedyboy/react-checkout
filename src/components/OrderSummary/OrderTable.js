import TableRow from "./TableRow";
import TableHeader from "./TableHead";
import { Fragment, useContext } from "react";
import { CheckoutContext } from "../../context/CheckoutContext";

const OrderTable = () => {
  const { state } = useContext(CheckoutContext);

  return (
    <table className="order-summary-table">
      <TableHeader />
      <tbody>
        {Object.keys(state.cart).map((productId) => {
          const product = state.products.find(
            (p) => p.id === parseInt(productId)
          );
          const quantity = state.cart[productId];
          return (
            <Fragment key={productId}>
              <TableRow
                product={product}
                quantity={quantity}
                productId={productId}
              />
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

export default OrderTable;
