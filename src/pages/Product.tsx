import { useEffect, useState } from 'react';
import ProductList from '../components/Product/ProductList';
import { getProducts } from '../utils/api';
import Layout from '../components/Layout';

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
      <div className="product-grid">
        <ProductList
          products={products}
          // addProductToCart={addProductToCart}
          // removeProductFromCart={removeProductFromCart}
        />
      </div>
    </Layout>
  );
};

export default Product;
