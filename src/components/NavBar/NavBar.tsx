import { NavLink } from 'react-router-dom';

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
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/checkout"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Checkout
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
