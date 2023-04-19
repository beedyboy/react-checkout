import { ProductDetails, ProductListProps } from "../utils/InterfaceData";
import LoadingIcon from "../utils/LoadingIcon";
import Product from "./Product";

const ProductList = ({
  products,
  addProductToCart,
  removeProductFromCart,
  addedIds,
}: ProductListProps) => {
  return (
    <div>
      <h1>Health Products</h1>

      <div className="card-container">
        {products?.length ? (
          products?.map((product: ProductDetails) => (
            <div key={product.id} className="card" data-testid="products">
              <Product
                product={product}
                addProductToCart={addProductToCart}
                removeFromCart={removeProductFromCart}
                addedIds={addedIds}
              />
            </div>
          ))
        ) : (
          <LoadingIcon />
        )}
      </div>
    </div>
  );
};
export default ProductList;
