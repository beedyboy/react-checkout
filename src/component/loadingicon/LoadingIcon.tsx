import "./LoadingIcon.css";
import { FC } from "react";

const LoadingIcon:FC<{isLoading:boolean}> = ({ isLoading }) => {
  return (
    <div className={`loading-icon ${isLoading ? "loading" : ""}`}>
      <span>Health Shop</span>
    </div>
  );
};

export default LoadingIcon;
