import {
  disableButton,
  addOrRemoveFromCart,
} from "../../helpers/helpers";

const Product = ({
  cart,
  product,
  addProductToCart,
  removeProductFromCart,
}) => {
  const { handleAddToCart, handleRemoveFromCart } =
    addOrRemoveFromCart(
      product,
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
        <span>{cart[product.id]}</span>
        <button
          onClick={handleRemoveFromCart}
          disabled={isRemoveDisabled}
        >
          Remove
        </button>
      </p>
      <p>Total: ${(product.price * product.id).toFixed(2)}</p>
    </div>
  );
};

export default Product;
