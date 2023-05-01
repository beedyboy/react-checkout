import React from "react";
import { logo, facebook, whatsapp, google, call } from "../../../assets/images";
import Container from "../container/container";
import "./footer.scss";

const Footer = () => {
  return (
    <div className="footer-container center">
      <Container>
        <div className="footer">
          <div className="box space-around">
            <a href="/" className="logo-container center link">
              <h1 className="title">Health Shop</h1>
            </a>
            <div className="icons-container center">
              Reach us on:{" "}
              <a href="mailto:healthshop@gmail.com" className="limk">
                <img src={google} alt="Google" className="icon" />
              </a>
              <a href="https://facebook.com" className="link">
                <img src={facebook} alt="Google" className="icon" />
              </a>
              <a href="https://whatsapp.com" className="link">
                <img src={whatsapp} alt="Google" className="icon" />
              </a>
            </div>
            <div className="call-us-container">
              <a href="tel:00012345" className="logo-container center link">
                <img src={call} alt="Logo" className="call-icon" />
                <h1 className="title">Call Us</h1>
              </a>
            </div>
          </div>
          <div className="center reserve-text">
            Health Shop - 2021-2023, All right reserved
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
