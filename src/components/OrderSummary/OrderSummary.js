const OrderSummary = ({
  cart,
  total,
  discount,
  products,
  cartSubtotal,
  addProductToCart,
  removeProductFromCart,
}) => (
  <div className="checkout-grid">
    <h1>Order Summary</h1>
    <OrderTable
      cart={cart}
      products={products}
      addProductToCart={addProductToCart}
      removeProductFromCart={removeProductFromCart}
    />
    <p>Subtotal: ${cartSubtotal.toFixed(2)}</p>
    <p>Discount: ${discount.toFixed(2)}</p>
    <p>Total: ${total.toFixed(2)}</p>
  </div>
);

export default OrderSummary;
