import TableRow from "./TableRow";
import TableHeader from "./TableHead";

const OrderTable = ({
  cart,
  products,
  addProductToCart,
  removeProductFromCart,
}) => {
  return (
    <table className="order-summary-table">
      <TableHeader />
      <tbody>
        {Object.keys(cart).map((productId) => {
          const product = products.find(
            (p) => p.id === parseInt(productId)
          );
          const quantity = cart[productId];
          return (
            <TableRow
              product={product}
              quantity={quantity}
              productId={productId}
              addProductToCart={addProductToCart}
              removeProductFromCart={removeProductFromCart}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default OrderTable;
