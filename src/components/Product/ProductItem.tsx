import React from "react";
import { Product as ProductType } from "../../types";
import "./Styles/Product.css";

interface ProductProps {
  product: ProductType;
  addProductToCart: () => void;
  removeFromCart: () => void;
}

const Product: React.FC<ProductProps> = ({ product, addProductToCart, removeFromCart }) => {
  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p className="product-quantity">
        <button onClick={addProductToCart}>Add</button>
        Quantity:
        <span>{product.quantity}</span>
        <button onClick={removeFromCart}>Remove</button>
      </p>
    </div>
  );
};

export default Product;
