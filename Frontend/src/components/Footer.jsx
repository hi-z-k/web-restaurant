import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RestaurantContext } from '../context/RestaurantContext.js';
import '../styles/Footer.css';

const Footer = () => {
  const config = useContext(RestaurantContext);

  if (!config) return null;

  const [firstName, ...rest] = config.name.split(' ');
  const restOfName = rest.join(' ');

  return (
    <footer className="main-footer">
      <div className="footer-container">
        
        <div className="footer-brand">
          <Link to="/" className="logo">
            {firstName}<span>{restOfName}</span>
          </Link>
          <p className="footer-tagline">
            {config.tagline}
          </p>
        </div>

        <div className="footer-contact">
          <h4 className="footer-heading">Contact Info</h4>
          <p className="footer-contact-text">Email: {config.email}</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 {config.name} — All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;