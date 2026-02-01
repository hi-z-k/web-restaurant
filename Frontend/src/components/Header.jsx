import { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { RestaurantContext } from '../context/RestaurantContext.js';
import { CartContext } from '../context/CartContext.js';
import { AuthContext } from '../context/AuthContext.js';

const UserBadge = ({ user, onLogout }) => {
  const isAdmin = user?.role === 'admin';
  const badgeStyles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginLeft: '15px',
      padding: '6px 14px',
      borderRadius: '30px',
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: '0.3s'
    },
    avatar: {
      width: '35px',
      height: '35px',
      borderRadius: '50%',
      background: 'var(--main-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontWeight: 'bold',
      fontSize: '1rem',
      boxShadow: '0 0 15px rgba(147, 112, 219, 0.3)'
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    name: {
      color: '#fff',
      fontSize: '0.85rem',
      fontWeight: '600',
      lineHeight: '1.2'
    },
    phone: {
      color: 'var(--text-muted)',
      fontSize: '0.7rem',
      letterSpacing: '0.5px'
    },
    logout: {
      background: 'transparent',
      border: 'none',
      color: '#ff4d4d',
      cursor: 'pointer',
      fontSize: '0.7rem',
      padding: '0',
      textDecoration: 'none',
      marginTop: '2px',
      opacity: '0.8',
      textAlign: 'left'
    }
  };

  const firstName = user?.name ? user.name.split(' ')[0] : 'User';
  const initial = firstName.charAt(0).toUpperCase();

  return (
    <li style={badgeStyles.container}>
      <div style={badgeStyles.avatar}>{initial}</div>
      <div style={badgeStyles.details}>
        <span style={badgeStyles.name}>{firstName} {isAdmin && "(Admin)"}</span>
        {!isAdmin && <span style={badgeStyles.phone}>{user?.phone}</span>}
        <button onClick={onLogout} style={badgeStyles.logout}>Logout</button>
      </div>
    </li>
  );
};

const Header = () => {
  const config = useContext(RestaurantContext);
  const { cart } = useContext(CartContext);
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  const cartCount = cart.reduce((acc, item) => acc + item.count, 0);
  const isAdmin = isLoggedIn && user?.role === 'admin';

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
    cartBadge: {
      background: 'var(--main-color)',
      color: '#fff',
      borderRadius: '50%',
      padding: '2px 8px',
      fontSize: '0.8rem',
      marginLeft: '5px',
      verticalAlign: 'middle'
    }
  };

  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? 'var(--main-color)' : '#fff',
    fontSize: '1rem',
    fontWeight: '500',
    padding: '10px 20px',
    transition: '0.3s',
    textDecoration: 'none',
    borderBottom: isActive ? '2px solid var(--main-color)' : '2px solid transparent'
  });

  if (!config) return null;

  const [resFirstName, ...resRest] = config.name.split(' ');
  const resRestOfName = resRest.join(' ');

  return (
    <header style={styles.header}>
      <Link to="/" className="logo">
        {resFirstName}<span>{resRestOfName}</span>
      </Link>
      
      <nav>
        <ul style={styles.navbar}>
          {isAdmin ? (
            <>
              <li><NavLink to="/admin" style={navLinkStyle}>Dashboard</NavLink></li>
            </>
          ) : (
            <>
              <li><NavLink to="/" style={navLinkStyle}>Home</NavLink></li>
              <li><NavLink to="/menu" style={navLinkStyle}>Menu</NavLink></li>
              <li>
                <NavLink to="/checkout" style={navLinkStyle}>
                  Checkout
                  {cartCount > 0 && <span style={styles.cartBadge}>{cartCount}</span>}
                </NavLink>
              </li>
            </>
          )}
          
          {isLoggedIn ? (
            <UserBadge user={user} onLogout={logout} />
          ) : (
            <li>
              <NavLink to="/login" style={navLinkStyle}>
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