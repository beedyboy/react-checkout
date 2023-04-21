import React from 'react';
import { ItemProps, ProductProps } from '../types';

const Product = ({ product, carts, addProductToCart, removeFromCart }: ProductProps) => {
  const { id, name, description, price, quantity } = product;
  
  return (
    <div className='product-card'>
      <h2>{name}</h2>
      <p>{description}</p>
      <p>Price: ${price}</p>
      <p className='product-quantity'>
        <button
          onClick={() => addProductToCart(id)}
          disabled={
            carts[carts.findIndex((item: { id: number }) => item.id === product.id) as keyof ItemProps]?.count ===
            quantity
          }
        >
          Add
        </button>
        Quantity:
        <span>{quantity}</span>
        <button
          onClick={() => removeFromCart(id)}
          disabled={carts.findIndex((item: { id: number }) => item.id === product.id) === -1 ? true : false}
        >
          Remove
        </button>
      </p>
    </div>
  );
};

export default Product;
