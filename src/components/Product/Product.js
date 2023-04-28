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

  const handleAddToCart = () => {
    addProductToCart(product.id);
    setQuantity(parseInt(quantity) + 1);
  };

  const handleRemoveFromCart = () => {
    removeProductFromCart(product.id);
    setQuantity(parseInt(quantity) - 1);
  };

  const isAddDisabled =
    product.quantity === 0 ||
    (cart[product.id] || 0) === product.quantity;
  const isRemoveDisabled = (cart[product.id] || 0) === 0;

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
