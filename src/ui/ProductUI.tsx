import { numberFormat } from "./common";
import { IProduct } from "./types";

export interface ProductUIProps {
  product?: IProduct;
  addProductToCart?: (productId: number) => void;
  removeFromCart?: (productId: number) => void;
}
export const ProductUI: React.FC<ProductUIProps> = ({
  product,
  addProductToCart,
  removeFromCart,
}) => {
  return (
    <div className="product-card">
      <h2>{product?.name}</h2>
      <p>{product?.description}</p>
      <p>Price: ${numberFormat(product?.price)}</p>
      <p className="product-quantity">
        <button
          data-testid={`btn-cart-add-${product?.id}`}
          onClick={() => {
            if (product?.id) addProductToCart?.(product.id);
          }}
        >
          Add
        </button>
        Quantity:
        <span>{product?.quantity}</span>
        <button
          data-testid={`btn-cart-remove-${product?.id}`}
          onClick={() => {
            if (product?.id) removeFromCart?.(product.id);
          }}
        >
          Remove
        </button>
      </p>
    </div>
  );
};
