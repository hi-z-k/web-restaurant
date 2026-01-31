import { useContext } from 'react';
import { RestaurantContext } from '../context/RestaurantContext.js';

const Footer = () => {
  const config = useContext(RestaurantContext);

  const styles = {
    footer: {
      padding: '80px 12% 40px',
      background: 'var(--secondary-bg)',
      borderTop: '2px solid var(--main-color)',
      marginTop: '100px'
    },
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '4rem'
    },
    h4: {
      fontFamily: '"Bebas Neue", cursive',
      fontSize: '1.8rem',
      letterSpacing: '2px',
      marginBottom: '25px',
      color: '#fff',
      textTransform: 'uppercase'
    },
    list: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    link: {
      color: 'var(--text-muted)',
      textDecoration: 'none',
      display: 'block',
      marginBottom: '12px',
      transition: '0.3s',
      fontSize: '1rem'
    },
    contactText: {
      color: 'var(--text-muted)',
      marginBottom: '10px'
    },
    socialContainer: {
      display: 'flex',
      gap: '15px'
    },
    socialIcon: {
      color: 'var(--main-color)',
      fontSize: '1.5rem',
      transition: '0.3s'
    },
    bottom: {
      textAlign: 'center',
      marginTop: '60px',
      paddingTop: '30px',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      color: 'var(--text-muted)',
      fontSize: '0.8rem'
    }
  };

  if (!config) return null;

  const parts = config.name.split(' ');
  const firstName = parts[0];
  const restOfName = parts.slice(1).join(' ');

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div className="footer-box">
          <a href="/" className="logo">
            {firstName}<span>{restOfName}</span>
          </a>
          <p style={{ color: 'var(--text-muted)', marginTop: '15px' }}>
            {config.tagline}
          </p>
        </div>

        <div className="footer-box">
          <h4 style={styles.h4}>Quick Links</h4>
          <ul style={styles.list}>
            <li><a href="#home" style={styles.link}>Home</a></li>
            <li><a href="#menu" style={styles.link}>Menu</a></li>
            <li><a href="#chef" style={styles.link}>Our Chef</a></li>
            <li><a href="#auth" style={styles.link}>Login</a></li>
          </ul>
        </div>

        <div className="footer-box">
          <h4 style={styles.h4}>Contact</h4>
          <p style={styles.contactText}>Email: {config.email}</p>
          <div style={styles.socialContainer}>
            <a href="#" style={styles.socialIcon}><i className='bx bxl-instagram'></i></a>
            <a href="#" style={styles.socialIcon}><i className='bx bxl-facebook'></i></a>
          </div>
        </div>
      </div>

      <div style={styles.bottom}>
        <p>© 2026 {config.name} — All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;