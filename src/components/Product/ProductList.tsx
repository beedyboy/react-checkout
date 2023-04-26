import React from "react";
import { Product as ProductType } from "../../types/";
import ProductItem from "./ProductItem";
import "./Styles/ProductList.css";

interface ProductListProps {
  products: ProductType[];
  addProductToCart: (productId: number) => void;
  removeProductFromCart: (productId: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, addProductToCart, removeProductFromCart }) => {
  return (
    <div>
      <h1>Health Products</h1>

      <div className="card-container">
        {products.map((product) => (
          <div key={product.id} className="card">
            <ProductItem product={product} addProductToCart={() => addProductToCart(product.id)} removeFromCart={() => removeProductFromCart(product.id)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
