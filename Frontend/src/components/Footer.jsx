import { useContext } from 'react';
import { Link } from 'react-router-dom';
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
      gridTemplateAreas: `
        "brand contact"
      `,
      gridTemplateColumns: '1.5fr 1fr',
      gap: '40px 6rem',
      alignItems: 'start'
    },
    brandArea: {
      gridArea: 'brand'
    },
    contactArea: {
      gridArea: 'contact'
    },
    tagline: {
      color: 'var(--text-muted)', 
      marginTop: '15px',
      lineHeight: '1.6',
      maxWidth: '400px'
    },
    h4: {
      fontFamily: '"Bebas Neue", cursive',
      fontSize: '1.8rem',
      letterSpacing: '2px',
      marginBottom: '20px',
      color: '#fff',
      textTransform: 'uppercase'
    },
    contactText: {
      color: 'var(--text-muted)',
      marginBottom: '10px'
    },
    socialContainer: {
      display: 'flex',
      gap: '15px',
      marginTop: '15px'
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

  const [firstName, ...rest] = config.name.split(' ');
  const restOfName = rest.join(' ');

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        
        <div style={styles.brandArea}>
          <Link to="/" className="logo">
            {firstName}<span>{restOfName}</span>
          </Link>
          <p style={styles.tagline}>
            {config.tagline}
          </p>
        </div>

        <div style={styles.contactArea}>
          <h4 style={styles.h4}>Contact Info</h4>
          <p style={styles.contactText}>Email: {config.email}</p>
        </div>

      </div>

      <div style={styles.bottom}>
        <p>© 2026 {config.name} — All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;