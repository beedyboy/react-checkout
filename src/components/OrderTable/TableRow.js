const TableRow = ({
  product,
  quantity,
  productId,
  addProductToCart,
  removeProductFromCart,
}) => (
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

export default TableRow;
