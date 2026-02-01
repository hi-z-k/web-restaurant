import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RestaurantContext } from '../context/RestaurantContext.js';
import { AuthContext } from '../context/AuthContext.js';
import '../styles/CallToAction.css';

const CallToAction = () => {
  const config = useContext(RestaurantContext);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!config || isLoggedIn) return null;

  const handleAuthRedirect = () => {
    navigate('/login');
  };

  return (
    <section className="cta-section" id="auth">
      <h2 className="cta-title">Join {config.name}</h2>
      <p className="cta-text">
        Experience world-class dining. Login to manage your bookings or sign up to join our loyalty program.
      </p>
      
      <div className="cta-button-container">
        <button onClick={handleAuthRedirect} className="cta-primary-button">
          Login
        </button>
        <button onClick={handleAuthRedirect} className="cta-secondary-button">
          Sign Up
        </button>
      </div>
    </section>
  );
};

export default CallToAction;