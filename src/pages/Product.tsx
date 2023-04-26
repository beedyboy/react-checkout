import { useEffect, useState } from 'react';
import ProductList from '../components/Product/ProductList';
import { getProducts } from '../utils/api';

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
    <div className="product-grid">
      <ProductList
        products={products}
        // addProductToCart={addProductToCart}
        // removeProductFromCart={removeProductFromCart}
      />
    </div>
  );
};

export default Product;
