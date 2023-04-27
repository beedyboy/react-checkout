import "./LoadingIcon.css";
import { FC } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai"

const LoadingIcon: FC<{ isLoading: boolean }> = ({ isLoading }) => {
  return (
    <div className={isLoading ? "loading-icon" : ""}>
      <span>Health Shop</span>
      <span>
        <AiOutlineLoading3Quarters scale={2} />
      </span>
    </div>
  );
};

export default LoadingIcon;


//loading-icon ${isLoading ? "loading" : ""}`