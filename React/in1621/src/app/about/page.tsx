const teamMembers = [
    {
      name: 'Jane Doe',
      role: 'Founder & Head Barista',
      image: '/images/jane.jpg',
      bio: 'Jane brings 10 years of coffee artistry to Bartons Coffee.',
    },
    {
      name: 'John Smith',
      role: 'Operations Manager',
      image: '/images/john.jpg',
      bio: 'John ensures every cup of coffee meets our quality standards.',
    },
    {
      name: 'Ayesha Perera',
      role: 'Marketing Lead',
      image: '/images/ayesha.jpg',
      bio: 'Ayesha spreads the love for Bartons Coffee far and wide.',
    },
  ];


import React from 'react';

export default function About() {
  return (
    <>
      {/* Header */}
      <header className="main-header">
        <div className="logo">BARTONS</div>
        <nav className="nav">
          <ul>
            <li><a href="/">HOME</a></li>
            <li><a href="/about">ABOUT</a></li>
            <li><a href="#">MENU</a></li>
            <li><a href="#">CONTACT</a></li>
            <li><a href="#">CART</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        className="hero"
        style={{
          backgroundImage: `url('https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/56/b5/6a/idees-art-cafe-shop-kastoria.jpg?w=800&h=-1&s=1')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <h1>Welcome to Bartons Coffee</h1>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="about-content">
          <div className="about-text">
            <h2>About Us</h2>
            <p>
              Bartons Coffee is a Sri Lankan-based coffee shop dedicated to serving the finest
              coffee. Our beans are sourced from local farmers, ensuring freshness and quality
              in every cup.
            </p>
          </div>
        </div>
      </section>
            {/* Story */}
            {/*<h3>Our Story</h3>
            <p>
              Bartons Coffee was founded with a passion for high-quality coffee. What started as a small coffee cart on the streets of Colombo has now blossomed into one of Sri Lanka's beloved coffee shops, known for its exceptional service and locally-sourced beans.
            </p>

            {/* Mission */}
            {/*<h3>Our Mission</h3>
            <p>
              Our mission is simple: to provide every customer with a warm, memorable experience and the best-tasting coffee made from the freshest beans. We aim to foster connections through our coffee, one cup at a time.
            </p>

            {/* Team */}
            {/*<h3>Meet Our Team</h3>
            <p>
              Our team consists of coffee enthusiasts who are dedicated to perfecting every cup. From the baristas to the managers, everyone at Bartons shares a passion for creating a coffee culture that celebrates quality, community, and sustainability.
            </p>*/}
            <section className="about-section">
  <h2>Our Story</h2>
  <div className="about-content">
    <p>
      Bartons Coffee began with a single idea: bring the world's finest beans to Sri Lanka. Our passion for craftsmanship, community, and sustainability drives every cup we serve.Bartons Coffee was founded with a passion for high-quality coffee. What started as a small coffee cart on the streets of Colombo has now blossomed into one of Sri Lanka's beloved coffee shops, known for its exceptional service and locally-sourced beans.
    </p>
  </div>
</section>

<section className="about-section">
  <h2>Our Mission</h2>
  <div className="about-content">
    <p>
      Our mission is simple: to provide every customer with a warm, memorable experience and the best-tasting coffee made from the freshest beans. We aim to foster connections through our coffee, one cup at a time.We aim to provide an exceptional coffee experience while supporting local farmers and maintaining eco-friendly practices.
    </p>
  </div>
</section>

<section className="about-section">
  <h2>Meet the Team</h2>
  <p>
     Our team consists of coffee enthusiasts who are dedicated to perfecting every cup. From the baristas to the managers, everyone at Bartons shares a passion for creating a coffee culture that celebrates quality, community, and sustainability.
  </p>
  <div className="team-container">
    {teamMembers.map((member, index) => (
      <div className="team-member" key={index}>
        <img src={member.image} alt={member.name} />
        <h3>{member.name}</h3>
        <p className="role">{member.role}</p>
        <p>{member.bio}</p>
      </div>
    ))}
  </div>
</section>

            <div className="button-right">
                <button className="btn-secondary">LEARN MORE</button>
            </div>

          {/*</div>
        </div>
      </section>*/}

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <div className="footer-links">
            <ul>
              <li><a href="/">HOME</a></li>
              <li><a href="/about">ABOUT</a></li>
              <li><a href="#">MENU</a></li>
              <li><a href="#">CONTACT</a></li>
              <li><a href="#">CART</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h3>CONTACT</h3>
            <p>Colombo 07, Sri Lanka</p>
            <p><a href="tel:+940207313535">+94 020 731 3535</a></p>
          </div>
          <div className="footer-logo">
            <h2>BARTONS</h2>
          </div>
        </div>
        <p className="footer-bottom">&copy; 2025 Bartons Coffee. All Rights Reserved.</p>
      </footer>
    </>
  );
}