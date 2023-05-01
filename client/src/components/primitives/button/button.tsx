import React, { FC } from "react";
import "./button.scss";

interface ButtonProps {
  icon?: string;
  text: string;
  color: "blue" | "orange";
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({icon, text, color, ...others}) => {
  return (
    <div className={`button-${color} center`} {...others}>
      <span className="">{text}</span>
      {icon && <img src={icon} alt="cart" className="cart-icon" />}
    </div>
  );
};

export default Button;
