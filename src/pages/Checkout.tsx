import { useEffect, useState } from 'react';
import ProductList from '../components/Product/ProductList';
import { getProducts } from '../utils/api';
import Layout from '../components/Layout';
import { shallow } from 'zustand/shallow';

import '../components/Product/Product.scss';
import OrderSummary from '../components/Order/OrderSummary';
import useProductStore from '../utils/store';
import { ProductState } from '../utils/types';

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
      const data: any = await getProducts();
      setProducts(data);
    }
    fetchData();
  }, []);

  return (
    <Layout>
      <main className="checkout">
        <ProductList
          products={products}
          addProductToCart={addToCart}
          removeProductFromCart={removeFromCart}
        />
        <OrderSummary />
      </main>
    </Layout>
  );
};

export default Checkout;
