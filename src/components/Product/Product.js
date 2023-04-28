import {
  disableButton,
  addOrRemoveFromCart,
} from "../../helpers/helpers";
import React, { useState } from "react";

const Product = ({
  cart,
  product,
  addProductToCart,
  removeProductFromCart,
}) => {
  const [quantity, setQuantity] = useState(
    cart[product.id] || 0
  );

  const { handleAddToCart, handleRemoveFromCart } =
    addOrRemoveFromCart(
      product,
      quantity,
      setQuantity,
      addProductToCart,
      removeProductFromCart
    );

  const { isAddDisabled, isRemoveDisabled } = disableButton(
    cart,
    product
  );

  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
      <p className="product-quantity">
        <button
          onClick={handleAddToCart}
          disabled={isAddDisabled}
        >
          Add
        </button>
        Quantity:
        <span>{quantity}</span>
        <button
          onClick={handleRemoveFromCart}
          disabled={isRemoveDisabled}
        >
          Remove
        </button>
      </p>
      <p>Total: ${(product.price * quantity).toFixed(2)}</p>
    </div>
  );
};

export default Product;
