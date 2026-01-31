import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RestaurantContext } from '../context/RestaurantContext.js';
import { AuthContext } from '../context/AuthContext.js';

const CallToAction = () => {
  const config = useContext(RestaurantContext);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const styles = {
    section: {
      padding: '100px 12%',
      textAlign: 'center',
      borderTop: '1px solid rgba(147, 112, 219, 0.1)',
    },
    title: {
      fontFamily: '"Bebas Neue", cursive',
      fontSize: '3.5rem',
      color: '#fff',
      marginBottom: '1.5rem',
      letterSpacing: '2px'
    },
    text: {
      color: 'var(--text-muted)',
      fontSize: '1.2rem',
      maxWidth: '600px',
      margin: '0 auto 2.5rem'
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      flexWrap: 'wrap'
    },
    primaryButton: {
      padding: '18px 45px',
      background: 'var(--main-color)',
      color: '#fff',
      fontFamily: '"Bebas Neue", cursive',
      fontSize: '1.5rem',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
      transition: 'var(--transition)',
      boxShadow: '0 10px 20px rgba(147, 112, 219, 0.2)'
    },
    secondaryButton: {
      padding: '18px 45px',
      background: 'transparent',
      color: '#fff',
      fontFamily: '"Bebas Neue", cursive',
      fontSize: '1.5rem',
      borderRadius: '4px',
      border: '2px solid var(--main-color)',
      cursor: 'pointer',
      transition: 'var(--transition)'
    }
  };

  if (!config || isLoggedIn) return null;

  const handleAuthRedirect = () => {
    navigate('/login');
  };

  return (
    <section style={styles.section} id="auth">
      <h2 style={styles.title}>Join {config.name}</h2>
      <p style={styles.text}>
        Experience world-class dining. Login to manage your bookings or sign up to join our loyalty program.
      </p>
      
      <div style={styles.buttonContainer}>
        <button onClick={handleAuthRedirect} style={styles.primaryButton}>
          Login
        </button>
        <button onClick={handleAuthRedirect} style={styles.secondaryButton}>
          Sign Up
        </button>
      </div>
    </section>
  );
};

export default CallToAction;