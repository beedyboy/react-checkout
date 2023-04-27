import './LoadingIcon.scss';

type LoadingIconType = {
  isLoading: boolean;
};

const LoadingIcon = ({ isLoading }: LoadingIconType) => {
  return <div className="lds-dual-ring"></div>;
};

export default LoadingIcon;
