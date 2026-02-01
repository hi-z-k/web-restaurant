const About = () => {
  const styles = {
    section: { display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: '8rem', padding: '120px 12%', background: 'var(--secondary-bg)' },
    h2: { fontFamily: '"Bebas Neue", cursive', fontSize: '3.5rem', marginBottom: '2rem', textTransform: 'uppercase' },
    img: { width: '100%', borderRadius: '4px', boxShadow: '-25px 25px 0px var(--main-color)' }
  };

  return (
    <section style={styles.section} id="about">
      <div className="about-img">
        <img src="https://s.hdnux.com/photos/01/44/62/50/26421770/5/1920x0.jpg" alt="Dining Area" style={styles.img} />
      </div>
      <div className="about-text">
        <h3 style={{ fontFamily: '"Bebas Neue", cursive', color: 'var(--main-color)', fontSize: '1.8rem' }}>Our Story</h3>
        <h2 style={styles.h2}>Redefining Modern Dining</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2rem' }}>
          Founded in 2023, The Bistro was born out of a passion for fusion cuisine. We believe that dining is an art form.
        </p>
      </div>
    </section>
  );
};

export default About;