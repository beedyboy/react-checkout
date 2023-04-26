import React from "react";
import { Product } from "../../types";

interface CartItemProps {
    product: Product;
    decrementQuantity: () => void;
    incrementQuantity: () => void;
  }
  
  const CartItem: React.FC<CartItemProps> = ({ product, decrementQuantity, incrementQuantity }) => {
    return (
      <tr>
        <td>{product.name}</td>
        <td>${product.price.toFixed(2)}</td>
        <td>
          <button onClick={decrementQuantity}>-</button>
          {product.quantity}
          <button onClick={incrementQuantity}>+</button>
        </td>
        <td>${(product.price * product.quantity).toFixed(2)}</td>
      </tr>
    );
  };

  export default CartItem;