import React, { useState, useEffect } from "react";
import "./product-detail.scss";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/dispatsch";
import { singleProductAction } from "../../redux/slice/products.slice";
import { addToCart } from "../../redux/slice/cart.slice";
import LoadingIcon from "../primitives/LoadingIcon";
import Container from "../layouts/container/container";
import ReactStars from "react-rating-stars-component";
import { cart } from "../../assets/images";
import Button from "../primitives/button/button";

const ProductDetail: React.FC = () => {
  const [productCount, setProductCount] = useState<number>(0);

  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector(
    (state: { product: any }) => state.product
  );

  const handleAddToCart = (item: any) => {
    dispatch(addToCart(item));
  };

  const productData = products?.product;

  const handleIncreaseProduct = () => {
    productData?.stock > productCount &&
      setProductCount((prevCount) => prevCount + 1);
  };

  const handleDecreaseProduct = () => {
    productCount > 1 && setProductCount((prevCount) => prevCount - 1);
  };

  useEffect(() => {
    dispatch(singleProductAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <div className="product_container center wrap">
        {loading ? (
          <div className="spinner center">
            <LoadingIcon isLoading={loading} />
          </div>
        ) : (
          <>
            <div className="product_image w_responsive center">
              <img src={productData?.images} className="image" alt="product" />
            </div>
            <div className="product_detail w_responsive left column">
              <div className="product_title sub_heading">
                {productData?.name}
              </div>
              <div className="left">
                <ReactStars
                  count={5}
                  size={14}
                  value={productData?.ratings}
                  activeColor="#ffd700"
                  half={true}
                />
                <div className="text" style={{ marginLeft: "15px" }}>
                  {productData?.numOfReviews} reviews
                </div>
              </div>
              <div className="price_container">
                <div className="price sub_heading">${productData?.price}</div>
                <div className="counter_container left">
                  {/* <div
                    className="counter_minus center"
                    onClick={handleDecreaseProduct}
                  >
                    -
                  </div> */}
                  {/* <div className="counter_value center">{productCount}</div>
                  <div
                    className="counter_add center"
                    onClick={handleIncreaseProduct}
                  >
                    +
                  </div> */}
                </div>
                <div className="left" style={{ marginBottom: "14px" }}>
                  <Button
                    icon={cart}
                    text={"Add to cart"}
                    color={"blue"}
                    onClick={() => {
                      handleAddToCart({
                        id: productData?._id,
                        name: productData?.name,
                        price: productData?.price,
                        stock: productData?.stock,
                      });
                    }}
                  />
                  <Link to="/checkout">
                  <Button text="Buy it now" color={"orange"} />
                  </Link>
                </div>
              </div>
              <div className="stock sub_heading">
                {productData?.stock > 0 ? (
                  <span style={{ color: "green" }}>
                    In stock: {productData?.stock}
                  </span>
                ) : (
                  <span style={{ color: "red" }} className="text">
                    Out of stock
                  </span>
                )}
              </div>
              <div className="description text">{productData?.description}</div>
              <div
                className="text"
                style={{ marginBottom: "20px", fontWeight: "600" }}
              >
                Category: {productData?.category}
              </div>
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default ProductDetail;
