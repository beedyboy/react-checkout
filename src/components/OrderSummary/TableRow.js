import { useContext } from "react";
import { CheckoutContext } from "../../context/CheckoutContext";

const TableRow = ({ product, quantity, productId }) => {
  const { addProductToCart, removeProductFromCart } =
    useContext(CheckoutContext);

  return (
    <tr key={productId}>
      <td>{product.name}</td>
      <td>${product.price.toFixed(2)}</td>
      <td>
        <button onClick={() => removeProductFromCart(productId)}>
          -
        </button>
        {quantity}
        <button onClick={() => addProductToCart(productId)}>
          +
        </button>
      </td>
      <td>${(product.price * quantity).toFixed(2)}</td>
    </tr>
  );
};

export default TableRow;
