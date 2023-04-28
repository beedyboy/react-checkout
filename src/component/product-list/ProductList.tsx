import {useContext } from "react";
import { ProductItem} from "../../types";
import Product from "../product/Product";
import { ApiContext } from "../../context/product-context";
import LoadingIcon from "../loading-icon/LoadingIcon";
import { ToastContainer , toast } from "react-toastify";

export const ProductList = () => {
  const { data, isLoaded } = useContext(ApiContext);

  return (
    <div>
      <ToastContainer />
      <div>
      <div className="checkout-head">
     <h1 className="checkout-title">Health Products</h1>
        <a href="/checkout" className="checkout-btn">Proceed to Checkout</a>
     </div>
      </div>
      <div data-testid="addtocartbtn">
        {isLoaded === true ? (
          <div className="container">
            {data.map((product: ProductItem) => (
              <div key={product.id}>
                <Product product={product} />
              </div>
            ))}
          </div>
        ) : (
          <LoadingIcon isLoading={""} open={false} />
        )}
      </div>
    </div>
  );
};

export default ProductList;
