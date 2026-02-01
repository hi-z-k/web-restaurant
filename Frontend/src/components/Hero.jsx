import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RestaurantContext } from '../context/RestaurantContext.js';

const Hero = () => {
  const config = useContext(RestaurantContext);

  const styles = {
    section: { 
      height: '100vh', 
      display: 'grid', 
      gridTemplateColumns: '1.2fr 0.8fr', 
      alignItems: 'center', 
      gap: '4rem', 
      padding: '0 12%' 
    },
    h1: { 
      fontFamily: '"Bebas Neue", cursive', 
      fontSize: '5.5rem', 
      lineHeight: '1', 
      marginBottom: '1.5rem', 
      textTransform: 'uppercase' 
    },
    h5: { 
      color: 'var(--main-color)', 
      letterSpacing: '5px', 
      marginBottom: '1rem', 
      fontWeight: '700' 
    },
    tagline: { 
      display: 'block', 
      fontSize: '1.1rem', 
      color: 'var(--text-muted)', 
      marginBottom: '2.5rem', 
      fontStyle: 'italic' 
    },
    imageWrapper: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    img: {
      width: '100%',
      maxWidth: '500px',
      aspectRatio: '1/1',
      objectFit: 'cover',
      borderRadius: '50%',
      border: '8px solid rgba(147, 112, 219, 0.1)',
      boxShadow: '0 0 50px rgba(147, 112, 219, 0.3)',
      animation: 'float 6s ease-in-out infinite'
    }
  };

  if (!config) return null;

  return (
    <section style={styles.section} id="home">
      <div className="home-text">
        <h5 style={styles.h5}>Welcome to Gourmet Excellence</h5>
        <h1 style={styles.h1}>Exquisite <br/> Flavors</h1>
        
        <p style={styles.tagline}>"{config.tagline}"</p>
        
        <Link to="/menu" className="btn">Explore Menu</Link>
      </div>
      <div className="home-img">
        <img src="https://tb-static.uber.com/prod/image-proc/processed_images/1a113b4c496b92a67f40c222d9d7b257/db809eadd12d21eb61044e0f3bf7c9b7.jpeg" alt="Signature Dish" style={{ width: '100%' }} />
      </div>
    </section>
  );
};

export default Hero;