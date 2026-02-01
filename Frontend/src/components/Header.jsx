import { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { RestaurantContext } from '../context/RestaurantContext.js';
import { CartContext } from '../context/CartContext.js';
import { AuthContext } from '../context/AuthContext.js';
import '../styles/Header.css';

const UserBadge = ({ user, onLogout }) => {
  const isAdmin = user?.role === 'admin';
  const firstName = user?.name ? user.name.split(' ')[0] : 'User';
  const initial = firstName.charAt(0).toUpperCase();

  return (
    <li className="user-badge-container">
      <div className="user-avatar">{initial}</div>
      <div className="user-details">
        <span className="user-name">{firstName} {isAdmin && "(Admin)"}</span>
        {!isAdmin && <span className="user-phone">{user?.phone}</span>}
        <button onClick={onLogout} className="logout-btn">Logout</button>
      </div>
    </li>
  );
};

const Header = () => {
  const config = useContext(RestaurantContext);
  const { cart } = useContext(CartContext);
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  const cartCount = cart.reduce((acc, item) => acc + item.count, 0);

  if (!config) return null;

  const [resFirstName, ...resRest] = config.name.split(' ');
  const resRestOfName = resRest.join(' ');

  return (
    <header className="main-header">
      <Link to="/" className="logo">
        {resFirstName}<span>{resRestOfName}</span>
      </Link>
      
      <nav>
        <ul className="navbar-list">
          <li><NavLink to="/" className="nav-link">Home</NavLink></li>
          <li><NavLink to="/menu" className="nav-link">Menu</NavLink></li>
          <li>
            <NavLink to="/checkout" className="nav-link">
              Checkout
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </NavLink>
          </li>
          
          {isLoggedIn ? (
            <UserBadge user={user} onLogout={logout} />
          ) : (
            <li>
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;