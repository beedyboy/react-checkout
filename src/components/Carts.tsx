import React, { useEffect, useState } from 'react';
import { ItemProps, ProductProps } from '../types';

const Carts = ({ carts, addProductToCart, removeFromCart }: ProductProps) => {
  const [subTotal, setSubTotal] = useState<number>(0);

  useEffect(() => {
    const calculateTotal = () => {
      let subTotal: number = 0;
      carts.forEach((item: ItemProps) => {
        subTotal += item.price * item.count;
      });
      setSubTotal(+subTotal.toFixed(2));
    };

    calculateTotal();
  }, [carts]);

  const applyDiscount = (): number => {
    if (subTotal > 1000) {
      return +Number(subTotal * 0.1).toFixed(2);
    } else {
      return 0;
    }
  };

  return (
    <>
      <table className='order-summary-table'>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {carts.map((item: ItemProps) => {
            const { id, name, price, quantity, count } = item;
            return (
              <tr key={id}>
                <td>{name}</td>
                <td>${price}</td>
                <td>
                  <button onClick={() => removeFromCart(id)} disabled={count === 1}>
                    -
                  </button>
                  {count}
                  <button onClick={() => addProductToCart(id)} disabled={count === quantity}>
                    +
                  </button>
                </td>
                <td>${Number(price * count).toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>Subtotal: ${subTotal}</p>
      <p>
        Discount: ${applyDiscount()}{' '}
        <small className={subTotal > 1000 ? 'cart-discount' : ''}>{subTotal > 1000 ? '10% discount' : ''}</small>
      </p>
      <p>Total: ${subTotal - applyDiscount()}</p>
    </>
  );
};

export default Carts;
