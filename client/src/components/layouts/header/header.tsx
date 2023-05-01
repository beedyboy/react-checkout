import React from "react";
import Container from "../container/container";
import { cart } from "../../../assets/images";
import "./header.scss";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../hooks/dispatsch";

const Header = (): JSX.Element => {

  const cartItems = useAppSelector((state: { cart: any }) => state.cart);

  React.useEffect(() => {}, []);
  return (
    <header className="header-container center">
      <Container>
        <div className=" header between">
          <div className="logo center">
            <Link to="/" className="logo-container center link">
              <h1 className="title">HealthShop</h1>
            </Link>
          </div>
          <div className="cart-logo-container center">
            <Link to={"/checkout"} className="cart-container">
              <img src={cart} alt="Logo" className="cart-icon" />
              <span className="cart-count">{cartItems?.items?.length || 0}</span>
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
