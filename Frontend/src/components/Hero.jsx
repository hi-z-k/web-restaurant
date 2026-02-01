import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RestaurantContext } from '../context/RestaurantContext.js';
import '../styles/Hero.css';

const Hero = () => {
  const config = useContext(RestaurantContext);

  if (!config) return null;

  return (
    <section className="hero-section" id="home">
      <div className="home-text">
        <h5 className="hero-subtitle">Welcome to Gourmet Excellence</h5>
        <h1 className="hero-title">Exquisite <br/> Flavors</h1>
        
        <p className="hero-tagline">"{config.tagline}"</p>
        
        <Link to="/menu" className="btn">Explore Menu</Link>
      </div>
      <div className="home-img-container">
        <img src="img/hero-plate.png" alt="Signature Dish" />
      </div>
    </section>
  );
};

export default Hero;