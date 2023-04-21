import React, { useState, useEffect } from 'react';
import getProducts from '../api';
import { LoadingIcon, Carts, ProductList } from './';
import { ItemProps, ProductProps } from '../types';

const Checkout = () => {
  const [loading, SetLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<ProductProps[]|ItemProps>([]);
  const [cart, setCart] = useState<ItemProps[]>([]);

  useEffect(() => {
    async function fetchData() {
      await getProducts()
        .then((data) => {
          setProducts(data)
          SetLoading(false);
        })
        .catch((error) => {
          alert("Failed to fetch products!");
          console.error(error);
        });
    }
    fetchData();
  }, []);

  const addProductToCart = (productId: number) => {
    const existingCartItem = cart.find((item: { id: number }) => item.id === productId);
    if (existingCartItem) {
      if (existingCartItem.count < existingCartItem.quantity) {
        setCart(cart.map((item) => (item.id === productId ? { ...item, count: item.count + 1 } : item)));
      }
    } else {
      const product = products.find((product: { id?: number }) => product.id === productId);
      setCart([...cart, { ...product, count: 1 }]);
    }
  };

  const removeProductFromCart = (productId: number) => {
    const existingCartItem = cart.find((item) => item.id === productId);
    if (existingCartItem && existingCartItem.count === 1) {
      setCart(cart.filter((item) => item.id !== productId));
    } else {
      setCart(cart.map((item) => (item.id === productId ? { ...item, count: item.count - 1 } : item)));
    }
  };

  return (
    <>
      {loading ? (
        <LoadingIcon />
      ) : (
        <>
          <div className='product-grid'>
            <ProductList
              products={products}
              carts={cart}
              addProductToCart={addProductToCart}
              removeFromCart={removeProductFromCart}
            />
          </div>
          <div className='checkout-grid'>
            <h1>Order Summary</h1>
            <Carts carts={cart} addProductToCart={addProductToCart} removeFromCart={removeProductFromCart} />
          </div>
        </>
      )}
    </>
  );
};

export default Checkout;
