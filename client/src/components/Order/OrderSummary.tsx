import React, { useState, useMemo } from 'react';
import { FaCartPlus } from 'react-icons/fa';

import './OrderSummary.scss';
import { GrClose } from 'react-icons/gr';
import { ProductListTypes } from '../../utils/types';

const OrderSummary = ({
  addProductToCart,
  removeProductFromCart,
  cart,
}: ProductListTypes) => {
  const [showOrder, setShowOrder] = useState(true);

  const subTotal = useMemo(
    () =>
      cart.reduce((acc, cur) => cur.cartQty * cur.price + acc, 0).toFixed(2),
    [cart]
  );
  const discount = Number(subTotal) > 1000 ? Number(subTotal) * 0.1 : 0;

  return (
    <section className={`order-summary ${!showOrder ? 'show' : ''}`}>
      <div onClick={() => setShowOrder(!showOrder)}>
        {showOrder && <GrClose />}
        {!showOrder && (
          <div>
            <FaCartPlus />
            <span>{cart.length}</span>
          </div>
        )}
      </div>
      <h2>Order Summary</h2>
      {cart && cart.length < 1 ? (
        <p className="no-items">No items in cart</p>
      ) : (
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
            {cart?.map((item: any) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td className="btn-cell">
                  <button onClick={() => removeProductFromCart(item)}>-</button>
                  <span>{item.cartQty}</span>
                  <button
                    onClick={() => addProductToCart(item)}
                    disabled={item.cartQty === item.quantity}
                  >
                    +
                  </button>
                </td>
                <td>${(item.price * item.cartQty).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div>
        <p>
          <span>Subtotal:</span>
          <span>${subTotal}</span>
        </p>
        {Number(subTotal) >= 1000 && (
          <p>
            <span>Discount:</span>
            <span>${discount.toFixed(2)}</span>
          </p>
        )}
        <p>
          <span>Total:</span>
          <span>${(Number(subTotal) - discount).toFixed(2)}</span>
        </p>
      </div>
      <button disabled={cart.length < 1}>Checkout</button>
    </section>
  );
};

export default OrderSummary;
