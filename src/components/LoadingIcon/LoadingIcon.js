import "./LoadingIcon.css";

const LoadingIcon = ({ isLoading }) => {
  return (
    <div className="loading-div">
      <span
        className={`loading-icon ${
          isLoading ? "loading" : "hide"
        }`}
      >
        Health Shop
      </span>
    </div>
  );
};

export default LoadingIcon;
