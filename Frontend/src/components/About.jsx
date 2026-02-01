import '../styles/About.css';

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-img">
        <img src="img/restaurant-interior.jpg" alt="Dining Area" />
      </div>
      <div className="about-text">
        <h3>Our Story</h3>
        <h2>Redefining Modern Dining</h2>
        <p>
          Founded in 2023, The Bistro was born out of a passion for fusion cuisine. We believe that dining is an art form.
        </p>
        <a href="#reservation" className="btn">Visit Us Today</a>
      </div>
    </section>
  );
};

export default About;