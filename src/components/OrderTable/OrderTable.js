const OrderTable = ({
  cart,
  products,
  addProductToCart,
  removeProductFromCart,
}) => {
  return (
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
        {Object.keys(cart).map((productId) => {
          const product = products.find(
            (p) => p.id === parseInt(productId)
          );
          const quantity = cart[productId];
          return (
            <tr key={productId}>
              <td>{product.name}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>
                <button
                  onClick={() =>
                    removeProductFromCart(productId)
                  }
                >
                  -
                </button>
                {quantity}
                <button
                  onClick={() => addProductToCart(productId)}
                >
                  +
                </button>
              </td>
              <td>${(product.price * quantity).toFixed(2)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default OrderTable;
