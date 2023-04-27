import { useMemo } from 'react'
import { ProductListTypes, ProductState } from '../../utils/types';

type ProductItemType = {
  product: ProductState;
} & ProductListTypes;

const Product = ({ product, addProductToCart, removeProductFromCart, cart }: ProductItemType) => {
  const cartItem = useMemo(() => cart.find((item: any) => item.id === product.id), [cart, product.id]);
  product.cartQty = cartItem ? cartItem.cartQty : 0;

  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>${product.price}</p>
      <p>
        Available Quantity: <span>{product.quantity}</span>
      </p>
      <p>{product.description}</p>
      <div>
        <button onClick={() => addProductToCart(product)} disabled={product.cartQty === product.quantity}>Add</button>
        <p>
          <span>{product.quantity}</span>
        </p>
        <button
          onClick={() => removeProductFromCart(product)}
          disabled={product.cartQty <= 0}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default Product;
