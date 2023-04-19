import { ProductProps } from "../utils/InterfaceData";

const Product = ({
  product,
  addProductToCart,
  removeFromCart,
  addedIds,
}: ProductProps) => {
  const checkItem = addedIds.includes(product?.id.toString());

  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p className="product-quantity">
        <button
          value={product.id}
          disabled={checkItem ? true : false}
          onClick={(e) => addProductToCart(product.id)}
          className={checkItem ? "" : "cursor-pointer"}
          data-testid="addproduct"
        >
          Add
        </button>
        Quantity:
        <span>{product.quantity}</span>
        <button
          disabled={!checkItem ? true : false}
          onClick={() => removeFromCart(product.id)}
          className={!checkItem ? "" : "cursor-pointer"}
          data-testid="removeproduct"
        >
          Remove
        </button>
      </p>
    </div>
  );
};

export default Product;
