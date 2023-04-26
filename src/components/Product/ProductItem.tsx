const Product = ({ product, addProductToCart, removeFromCart }: any) => {
  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>${product.price}</p>
      <p>Available Quantity: <span>{product.quantity}</span></p>
      <p>{product.description}</p>
      <div>
        <button onClick={() => addProductToCart(product)}>Add</button>
        <p>
          <span>{product.quantity}</span>
        </p>
        <button onClick={removeFromCart}>Remove</button>
      </div>
    </div>
  );
};

export default Product;
