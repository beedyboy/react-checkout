import React, { useEffect, useState } from "react";
import { Product } from "../../types";
import CartItem from "./CartItem";
import './Styles/CartList.css';

interface CartListProps {
  products: Product[];
  decrementQuantity: (productId: number) => void;
  incrementQuantity: (productId: number) => void;
}

const CartList: React.FC<CartListProps> = ({ products, decrementQuantity, incrementQuantity }) => {
  const [discountApplied, setDiscountApplied] = useState<boolean>(false);
  const subtotal = products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  const discount = subtotal > 1000 ? subtotal * 0.1 : 0;
  const total = subtotal - discount;
  
  useEffect(() => {
    if (discount > 0) {
      setDiscountApplied(true);
    }
  }, [discount]);

  return (
    <div className="checkout-grid">
      <h1>Order Summary</h1>
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
          {products.map((product) => (
            <CartItem
              key={product.id}
              product={product}
              decrementQuantity={() => decrementQuantity(product.id)}
              incrementQuantity={() => incrementQuantity(product.id)}
            />
          ))}
        </tbody>
      </table>
      <p>Subtotal: ${subtotal.toFixed(2)}</p>
      {discountApplied && <p>Discount: ${discount.toFixed(2)}</p>}
      <p>Total: ${total.toFixed(2)}</p>
    </div>
  );
};

export default CartList;
