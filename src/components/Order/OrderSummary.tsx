import React, { useState, useEffect } from 'react';
import { FaCartPlus } from 'react-icons/fa';
import { shallow } from 'zustand/shallow';

import './OrderSummary.scss';
import { GrClose } from 'react-icons/gr';
import useProductStore from '../../utils/store';
import { ProductState } from '../../utils/types';

// type StoreState = {
//   cart: ProductState[];
//   addToCart: (id: number) => void;
// };

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

  const addProductToCart = (product: ProductState) => {
    addToCart(product);
  };

  console.log(cart);

  const removeProductFromCart = (product: ProductState) => {
      removeFromCart(product);
  };

  return (
    <section className={`order-summary ${!showOrder ? 'show' : ''}`}>
      <div onClick={() => setShowOrder(!showOrder)}>
        {showOrder && <GrClose />}
        {!showOrder && <FaCartPlus />}
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
                <button onClick={() => removeProductFromCart(item)}>-</button>
                <span>{item.cartQty}</span>
                <button onClick={() => addProductToCart(item)}>+</button>
              </td>
              <td>${item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <p>
          <span>Subtotal:</span>
          <span>$0</span>
        </p>
        <p>
          <span>Discount:</span>
          <span>$0</span>
        </p>
        <p>
          <span>Total:</span>
          <span>$0</span>
        </p>
      </div>
      <button>Checkout</button>
    </section>
  );
};

export default OrderSummary;
