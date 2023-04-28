import React, { useContext } from "react";
import { ProductProps } from "../../types";
import { CartContext } from "../../context/cart-context";

export const Product: React.FC<ProductProps> = ({ product }) => {
  const { addProductToCart, cartItems, removeProductFromCart } =
    useContext(CartContext);

  const isInCart = (product: any, cartItems: any[]) => {
    return cartItems.find((item) => item.id === product.id);
  };
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
          {!isInCart(product, cartItems) && (
            <button
              className="button is-black nomad-btn"
              onClick={() => addProductToCart(product)}
            >
              ADD TO CART
            </button>
          )}
          {isInCart(product, cartItems) && (
            <button
              className="button is-white nomad-btn"
              id="btn-white-outline"
              onClick={() => {
                removeProductFromCart(product);
              }}
            >
              REMOVE FROM CART
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

export default Product;
