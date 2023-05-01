import React from "react";
import "./product.scss";
import { eye, cart, love } from "../../assets/images";
import ReactStars from "react-rating-stars-component";
import {Link} from "react-router-dom"

interface ProductProps {
    name: string;
    price: number;
    description: string;
    ratings: number;
    images: string;
    category: string;
    seller: string;
    stock: number;
    _id: string;
  }

const Product: React.FC<ProductProps> = ({name, price, description, ratings, images, category, seller, stock, _id}) => {
  const [like, setLike] = React.useState('unlike');

  const handleLikeClick = () => {
    like === 'like' ? setLike('unlike') : setLike('like');
  }

  return (
    <div className="product-container center column">
      <img src={images} alt="product" className="product-image" />
      <div className="description center column">
        <div className="title">{name}</div>
        <div className="price">${price}</div>
        <div className="rating center text">
          <ReactStars
            count={5}
            // onChange={ratingChanged}
            size={12}
            value={ratings}
            activeColor="#ffd700"
            half={true}
          />
          {/* <div style={{marginLeft: '5px'}}>{numOfReviews} Reviews</div> */}
        </div>
      </div>
      <div className="cart-view ">
        <div className="add-to-cart center">
          <div className="cart-text center">
            <span className="none_mobile">Add to cart</span>
            <img src={cart} alt="cart" className="cart-icon" />
          </div>
          <Link to={`/product/${_id}`} className="view">
            <img src={eye} alt="view" className="view-icon" />
          </Link>
        </div>
      </div>
      <div className={`center ${like}`} onClick={handleLikeClick}>
        <img src={love} alt="love icon"/>
      </div>
    </div>
  );
};

export default Product;
