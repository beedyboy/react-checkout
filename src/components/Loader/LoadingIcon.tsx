import "./LoadingIcon.css";
import React from "react";

interface LoadingIconProps {
  isLoading: boolean;
}

const LoadingIcon: React.FC<LoadingIconProps> = ({ isLoading }) => {
  return (
    <div className={`loading-icon ${isLoading ? "loading" : ""}`}>
      <span>Health Shop</span>
    </div>
  );
};

export default LoadingIcon;
