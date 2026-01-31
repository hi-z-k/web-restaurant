import { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { RestaurantContext } from '../context/RestaurantContext.js';
import { CartContext } from '../context/CartContext.js';

const Header = () => {
  const config = useContext(RestaurantContext);
  const { cart } = useContext(CartContext);

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
    }
  };

  if (!config) return null;

  const [firstName, ...rest] = config.name.split(' ');
  const restOfName = rest.join(' ');

  return (
    <header style={styles.header}>
      <Link to="/" className="logo">
        {firstName}<span>{restOfName}</span>
      </Link>
      
      <ul style={styles.navbar}>
        <li><NavLink to="/" style={styles.navLink}>Home</NavLink></li>
        <li><NavLink to="/menu" style={styles.navLink}>Menu</NavLink></li>
        <li>
          <NavLink to="/checkout" style={styles.navLink}>
            Checkout
            {cartCount > 0 && <span style={styles.cartBadge}>{cartCount}</span>}
          </NavLink>
        </li>
        <li><NavLink to="/auth" style={styles.navLink}>Login</NavLink></li>
      </ul>
    </header>
  );
};

export default Header;