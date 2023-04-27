import React, { useContext } from "react";
import {  ProductProps } from "../../types";
import { CartContext } from "../../context/cart-context";
export const Product: React.FC<ProductProps> = ({ product }) => {
  const {
  
    addProductToCart,
  } = useContext(CartContext);

  return (
    <div className="product-card" data-testid="addtocartbtn">
      <div className="card">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="price-quantity">
          <p className="price">Price: ${product.price}</p>
          <p className="quantity">Quantity: {product.quantity}</p>
        </div>
        <p className="product-quantity">
          <button
            onClick={() => {
              addProductToCart(product);
            }}
            id="addtocartbtn"
          >
            Add to cart
          </button>
        </p>
      </div>
    </div>
  );
};

export default Product;
