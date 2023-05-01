import React from "react";
import Container from "../container/container";
import { cart } from "../../../assets/images";
import "./header.scss";

const Header = (): JSX.Element => {

  React.useEffect(() => {}, []);
  return (
    <header className="header-container center">
      <Container>
        <div className=" header between">
          <div className="logo center">
            <a href="/" className="logo-container center link">
              <h1 className="title">HealthShop</h1>
            </a>
          </div>
          <div className="cart-logo-container center">
            <div className="cart-container">
              <img src={cart} alt="Logo" className="cart-icon" />
              <span className="cart-count">0</span>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
