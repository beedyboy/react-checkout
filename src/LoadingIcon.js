import './LoadingIcon.css';
import { Spin } from 'react-cssfx-loading';

const LoadingIcon = ({ isLoading }) => {
  return (
    <div className={`loading-icon ${isLoading ? 'loading' : ''}`}>
      <Spin color="#8a2b06" width="70px" height="70px" duration="2s" />
    </div>
  );
};

export default LoadingIcon;
