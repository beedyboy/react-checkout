import { useEffect, useState } from 'react';
import ProductList from '../components/Product/ProductList';
import { getProducts } from '../utils/api';
import Layout from '../components/Layout';
import { shallow } from 'zustand/shallow';

import '../components/Product/Product.scss';
import OrderSummary from '../components/Order/OrderSummary';
import useProductStore from '../utils/store';
import LoadingIcon from '../components/LoadingIcon/LoadingIcon';

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const { addToCart, removeFromCart } = useProductStore(
    (state) => ({
      addToCart: state.addToCart,
      removeFromCart: state.removeFromCart,
    }),
    shallow
  );
  const cart = useProductStore((state) => state.cart);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('http://localhost:5000/products')
      const data = await res.json();
      setProducts(data.products);
    }
    fetchData();
  }, []);

  return (
    <Layout>
      <main className="checkout">
        {products.length <= 0 ? (
          <LoadingIcon isLoading={products.length === 0} />
        ) : (
          <ProductList
            products={products}
            addProductToCart={addToCart}
            removeProductFromCart={removeFromCart}
            cart={cart}
          />
        )}
        <OrderSummary
          addProductToCart={addToCart}
          removeProductFromCart={removeFromCart}
          cart={cart}
        />
      </main>
    </Layout>
  );
};

export default Checkout;
