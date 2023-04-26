import { useEffect, useState } from 'react';
import ProductList from '../components/Product/ProductList';
import { getProducts } from '../utils/api';
import Layout from '../components/Layout';

import '../components/Product/Product.scss';
import OrderSummary from '../components/Order/OrderSummary';
import useProductStore from '../utils/store';
import { ProductState } from '../utils/types';

const Product = () => {
  const [products, setProducts] = useState([]);
  const addToCart = useProductStore((state) => state.addToCart);

  useEffect(() => {
    async function fetchData() {
      const data: any = await getProducts();
      setProducts(data);
    }
    fetchData();
  }, []);

  const addProductToCart = (product: ProductState) => {
    addToCart(product);
  };

  return (
    <Layout>
      <main className="checkout">
        <ProductList
          products={products}
          addProductToCart={addProductToCart}
          // removeProductFromCart={removeProductFromCart}
        />
        <OrderSummary />
      </main>
    </Layout>
  );
};

export default Product;
