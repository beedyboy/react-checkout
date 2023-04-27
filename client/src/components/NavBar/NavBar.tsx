import { NavLink } from 'react-router-dom';
import { MdShoppingCartCheckout } from 'react-icons/md';
import { FaCartPlus } from 'react-icons/fa';

import './NavBar.scss';

const NavBar = () => {
  return (
    <header>
      <div>
        <FaCartPlus color="#44536e" size="1.4rem"/>
        <a href="/">Health Shop</a>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <MdShoppingCartCheckout />
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
