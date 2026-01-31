import { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { RestaurantContext } from '../context/RestaurantContext.js';
import { CartContext } from '../context/CartContext.js';
import { AuthContext } from '../context/AuthContext.js';

const Header = () => {
  const config = useContext(RestaurantContext);
  const { cart } = useContext(CartContext);
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  const cartCount = cart.reduce((acc, item) => acc + item.count, 0);

  const styles = {
    header: {
      position: 'fixed',
      top: 0,
      left: 0,
      background: 'var(--secondary-bg)',
      width: '100%',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backdropFilter: 'blur(10px)',
      padding: '25px 12%',
      borderBottom: '1px solid rgba(147, 112, 219, 0.2)'
    },
    navbar: {
      display: 'flex',
      alignItems: 'center',
      listStyle: 'none',
      margin: 0,
      padding: 0
    },
    navLink: ({ isActive }) => ({
      color: isActive ? 'var(--main-color)' : '#fff',
      fontSize: '1rem',
      fontWeight: '500',
      padding: '10px 20px',
      transition: '0.3s',
      textDecoration: 'none',
      borderBottom: isActive ? '2px solid var(--main-color)' : 'none'
    }),
    cartBadge: {
      background: 'var(--main-color)',
      color: '#fff',
      borderRadius: '50%',
      padding: '2px 8px',
      fontSize: '0.8rem',
      marginLeft: '5px',
      verticalAlign: 'middle'
    },
    userSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginLeft: '15px',
      padding: '5px 10px',
      borderRadius: '20px',
      background: 'rgba(255, 255, 255, 0.05)'
    },
    profileIcon: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      background: 'var(--main-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontWeight: 'bold',
      fontSize: '0.9rem'
    },
    userInfo: { 
      display: 'flex', 
      flexDirection: 'column' 
    },
    userName: {
      color: '#fff',
      fontSize: '0.9rem',
      fontWeight: '500'
    },
    logoutBtn: {
      background: 'transparent',
      border: 'none',
      color: '#ff4d4d',
      cursor: 'pointer',
      fontSize: '0.8rem',
      padding: '0',
      textDecoration: 'underline',
      textAlign: 'left'
    }
  };

  if (!config) return null;

  const [firstName, ...rest] = config.name.split(' ');
  const restOfName = rest.join(' ');
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <header style={styles.header}>
      <Link to="/" className="logo">
        {firstName}<span>{restOfName}</span>
      </Link>
      
      <nav>
        <ul style={styles.navbar}>
          <li><NavLink to="/" style={styles.navLink}>Home</NavLink></li>
          <li><NavLink to="/menu" style={styles.navLink}>Menu</NavLink></li>
          <li>
            <NavLink to="/checkout" style={styles.navLink}>
              Checkout
              {cartCount > 0 && <span style={styles.cartBadge}>{cartCount}</span>}
            </NavLink>
          </li>
          
          {isLoggedIn ? (
            <li style={styles.userSection}>
              <div style={styles.profileIcon}>{userInitial}</div>
              <div style={styles.userInfo}>
                <span style={styles.userName}>{user?.name}</span>
                <button onClick={logout} style={styles.logoutBtn}>Logout</button>
              </div>
            </li>
          ) : (
            <li>
              <NavLink to="/login" style={styles.navLink}>
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