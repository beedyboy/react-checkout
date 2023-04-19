import "../styles/LoadingIcon.css";

const LoadingIcon = ({ isLoading }: any) => {
  return (
    <div className={`loading-icon ${isLoading ? "loading" : ""}`}>
      <span>Health Shop</span>
    </div>
  );
};

export default LoadingIcon;
