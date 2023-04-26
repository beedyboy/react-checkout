import "./LoadingIcon.css";

const LoadingIcon = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className={`loading-icon ${isLoading ? "loading" : ""}`}>
      <span>Health Shop</span>
    </div>
  );
};

export default LoadingIcon;
