import { ProductUI, ProductUIProps } from "./ProductUI";
import { IProduct } from "./types";

export interface ProductListUIProps {
  products?: IProduct[];
  productProps?: Omit<ProductUIProps, "product">;
}
export const ProductListUI: React.FC<ProductListUIProps> = ({
  products,
  productProps,
}) => {
  return (
    <div>
      <h1>Health Products</h1>

      <div className="card-container">
        {products?.map((product) => (
          <div key={product.id} className="card">
            <ProductUI product={product} {...productProps} />
          </div>
        ))}
      </div>
    </div>
  );
};
