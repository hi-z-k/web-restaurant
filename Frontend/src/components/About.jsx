const About = () => {
  const styles = {
    section: { display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: '8rem', padding: '120px 12%', background: 'var(--secondary-bg)' },
    h2: { fontFamily: '"Bebas Neue", cursive', fontSize: '3.5rem', marginBottom: '2rem', textTransform: 'uppercase' },
    img: { width: '100%', borderRadius: '4px', boxShadow: '-25px 25px 0px var(--main-color)' }
  };

  return (
    <section style={styles.section} id="about">
      <div className="about-img">
        <img src="img/restaurant-interior.jpg" alt="Dining Area" style={styles.img} />
      </div>
      <div className="about-text">
        <h3 style={{ fontFamily: '"Bebas Neue", cursive', color: 'var(--main-color)', fontSize: '1.8rem' }}>Our Story</h3>
        <h2 style={styles.h2}>Redefining Modern Dining</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2rem' }}>
          Founded in 2023, The Bistro was born out of a passion for fusion cuisine. We believe that dining is an art form.
        </p>
        <a href="#reservation" className="btn">Visit Us Today</a>
      </div>
    </section>
  );
};

export default About;