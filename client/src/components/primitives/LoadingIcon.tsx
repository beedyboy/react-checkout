import React from "react";
import "./LoadingIcon.css";

interface LoadingIconProps {
  isLoading: boolean;
}

const LoadingIcon = ({ isLoading }: LoadingIconProps) => {
  return (
    <div className={`loading-icon ${isLoading ? "loading" : ""}`}>
      <span>Health Shop</span>
    </div>
  );
};

export default LoadingIcon;
