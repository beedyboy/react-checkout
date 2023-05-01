import React from "react";
import "./product-list.scss";
import LoadingIcon from "../primitives/LoadingIcon";
import { useAppDispatch, useAppSelector } from "../../hooks/dispatsch";
import { getProductsAction } from "../../redux/slice/products.slice";
import Product from "../product-item/product";
import Container from "../layouts/container/container";
import Pagination from "react-js-pagination";

const ProductList = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = React.useState<number>(1);


  const { loading, products } = useAppSelector(
    (state: { product: any }) => state.product
  );


  const setCurrentPageNum = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  console.log(products, "****");
  const {resultsPerPage, productCount} = products;


  React.useEffect(() => {
    dispatch(getProductsAction(currentPage));
  }, [dispatch, currentPage]);

  return (
    <Container>
      <div className="latest-products-container left column">
        <div className="latest-product-sub sub-heading">Latest Products</div>
        {loading ? (
          <div className="spinner center">
            <LoadingIcon isLoading={loading} />
          </div>
        ) : (
          <div className="products-container">
            {products &&
              products?.products?.map((product: any, idx: number) => (
                <div className="product-item" key={product?._id}>
                  <Product {...product} />
                </div>
              ))}
          </div>
        )}
      </div>
      <div className="right product_pagination_container">
        {products && resultsPerPage <= productCount && (
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultsPerPage}
            totalItemsCount={productCount}
            onChange={setCurrentPageNum}
            nextPageText={">>"}
            prevPageText={"<<"}
            firstPageText={"First"}
            lastPageText={"Last"}
            innerClass="center"
            itemClass="page_item center"
            linkClass="page_link link text"
            activeClass="active_pagination"
          />
        )}
      </div>
    </Container>
  );
};

export default ProductList;
