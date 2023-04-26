import React, { useState, useMemo } from 'react';
import { FaCartPlus } from 'react-icons/fa';
import { shallow } from 'zustand/shallow';

import './OrderSummary.scss';
import { GrClose } from 'react-icons/gr';
import useProductStore from '../../utils/store';

const OrderSummary = () => {
  const [showOrder, setShowOrder] = useState(true);
  const { addToCart, removeFromCart } = useProductStore(
    (state) => ({
      addToCart: state.addToCart,
      removeFromCart: state.removeFromCart,
    }),
    shallow
  );
  const cart = useProductStore((state) => state.cart);

  const calcSubTotal = () => {
    return cart
      .reduce((acc, cur) => cur.cartQty * cur.price + acc, 0)
      .toFixed(2);
  };

  const subTotal = useMemo(() => calcSubTotal(), [cart]);
  const discount = Number(subTotal)  > 1000 ? Number(subTotal) * 0.1 : 0;

  return (
    <section className={`order-summary ${!showOrder ? 'show' : ''}`}>
      <div onClick={() => setShowOrder(!showOrder)}>
        {showOrder && <GrClose />}
        {!showOrder && 
            <div>
                <FaCartPlus />
                <span>{cart.length}</span>
            </div>
        }
      </div>
      <h2>Order Summary</h2>
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
                <button onClick={() => removeFromCart(item)}>-</button>
                <span>{item.cartQty}</span>
                <button
                  onClick={() => addToCart(item)}
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
      <div>
        <p>
          <span>Subtotal:</span>
          <span>${subTotal}</span>
        </p>
        {Number(subTotal) >= 1000 && (
          <p>
            <span>Discount:</span>
            <span>${(discount).toFixed(2)}</span>
          </p>
        )}
        <p>
          <span>Total:</span>
          <span>${(Number(subTotal) - discount).toFixed(2)}</span>
        </p>
      </div>
      <button>Checkout</button>
    </section>
  );
};

export default OrderSummary;
