import React from 'react';
import Product from './Product';
import { ProductProps } from '../types';

const ProductList = ({ products, carts, addProductToCart, removeFromCart }: ProductProps) => {
  return (
    <div>
      <h1>Health Products</h1>

      <div className='card-container'>
        {products.map((product: ProductProps) => (
          <div key={product.id} className='card'>
            <Product
              product={product}
              carts={carts}
              addProductToCart={addProductToCart}
              removeFromCart={removeFromCart}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
