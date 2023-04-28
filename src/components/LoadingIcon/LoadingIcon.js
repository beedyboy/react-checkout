import "./LoadingIcon.css";

const LoadingIcon = ({ isLoading }) => {
  return (
    <div className={`${isLoading ? "loading-div" : "hide"}`}>
      <span
        className={`loading-icon ${isLoading ? "loading" : ""}`}
      >
        Health Shop
      </span>
    </div>
  );
};

export default LoadingIcon;
