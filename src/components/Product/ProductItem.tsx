const Product = ({ product, addProductToCart, removeFromCart }: any) => {
  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>${product.price}</p>
      <p>{product.description}</p>
      <div>
        <button onClick={addProductToCart}>Add</button>
        <p>
          Qty: <span>{product.quantity}</span>
        </p>
        <button onClick={removeFromCart}>Remove</button>
      </div>
    </div>
  );
};

export default Product;
