import { numberFormat } from "./common";

export const ProductUI = ({ product, addProductToCart, removeFromCart }) => {
  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${numberFormat(product.price)}</p>
      <p className="product-quantity">
        <button onClick={() => addProductToCart?.(product.id)}>Add</button>
        Quantity:
        <span>{product.quantity}</span>
        <button onClick={() => removeFromCart?.(product.id)}>Remove</button>
      </p>
    </div>
  );
};
