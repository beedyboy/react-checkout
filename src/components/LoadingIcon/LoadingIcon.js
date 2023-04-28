import "./LoadingIcon.css";

const LoadingIcon = ({ isLoading }) => (
  <div className={`${isLoading ? "loading-div" : "hide"}`}>
    <span
      className={`loading-icon ${isLoading ? "loading" : ""}`}
    >
      Health Shop
    </span>
  </div>
);

export default LoadingIcon;
