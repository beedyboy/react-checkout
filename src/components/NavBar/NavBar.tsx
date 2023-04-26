import { NavLink } from 'react-router-dom';
import { MdShoppingCartCheckout } from 'react-icons/md';

import './NavBar.scss';

const NavBar = () => {
  return (
    <header>
      <div>
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
