import {
  disableButton,
  addOrRemoveFromCart,
} from "../../helpers/helpers";
import { useContext } from "react";
import { CheckoutContext } from "../../context/CheckoutContext";

const Product = ({ product }) => {
  const { state, addProductToCart, removeProductFromCart } =
    useContext(CheckoutContext);

  const { handleAddToCart, handleRemoveFromCart } =
    addOrRemoveFromCart(
      product,
      addProductToCart,
      removeProductFromCart
    );

  const { isAddDisabled, isRemoveDisabled } = disableButton(
    state.cart,
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
        <span>{state.cart[product.id] || 0}</span>
        <button
          onClick={handleRemoveFromCart}
          disabled={isRemoveDisabled}
        >
          Remove
        </button>
      </p>
      <p>
        Total: $
        {(product.price * state.cart[product.id] || 0).toFixed(
          2
        )}
      </p>
    </div>
  );
};

export default Product;
