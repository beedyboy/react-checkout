import { Link } from "react-router-dom";

import './NotFound.scss'

const NotFound = () => {
    return ( 
        <div className="not-found">
             <h3>Looks like you are lost</h3>
             <img src="/404.svg" alt="not found"/>
             <Link to="/">Go Back Home</Link>
        </div>
     );
}
 
export default NotFound;