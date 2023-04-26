import { useEffect, useState } from 'react';
import ProductList from '../components/Product/ProductList';
import { getProducts } from '../utils/api';
import Layout from '../components/Layout';

import '../components/Product/Product.scss';
import OrderSummary from '../components/Order/OrderSummary';

const Product = () => {
  const [products, setProducts] = useState([]);

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
          // addProductToCart={addProductToCart}
          // removeProductFromCart={removeProductFromCart}
        />
        <OrderSummary />
      </main>
    </Layout>
  );
};

export default Product;
