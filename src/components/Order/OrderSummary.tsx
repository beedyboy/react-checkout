import React, { useState, useEffect } from 'react';
import { FaCartPlus } from 'react-icons/fa';

import './OrderSummary.scss';
import { getProducts } from '../../utils/api';
import { GrClose } from 'react-icons/gr';

const OrderSummary = () => {
  const [products, setProducts] = useState([]);
  const [showOrder, setShowOrder] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data: any = await getProducts();
      setProducts(data);
    }
    fetchData();
  }, []);
  // const addProductToCart = (productId) => {};

  // const removeProductFromCart = (productId) => {};
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
            {products?.map((item: any) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td className="btn-cell">
                  <button>-</button>
                  <span>{item.quantity}</span>
                  <button>+</button>
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
