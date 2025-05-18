const menuItems = [
  {
    title: 'Cappuccino',
    description: 'A rich and aromatic coffee beverage made with equal parts espresso, steamed milk, and velvety milk foam.',
    price: 'LKR 600',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Cappuccino_in_original.jpg/1920px-Cappuccino_in_original.jpg',
  },
  {
    title: 'Mocha',
    description: 'A delightful fusion of rich espresso, creamy steamed milk, and decadent chocolate.',
    price: 'LKR 700',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOCj_gHGzcoR4OYogtn-3igpzgFB-oFUJqDQ&s',
  },
  {
    title: 'Latte',
    description: 'A smooth and creamy coffee drink made with a shot of rich espresso and steamed milk.',
    price: 'LKR 650',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMV6MS7HHPPff0HI1O1L1NZubR98OrTdXwxg&s',
  },
  {
    title: 'Cold Java',
    description: 'Made with smooth, cold-brewed or iced espresso, it delivers a rich coffee flavor with a crisp, invigorating finish.',
    price: 'LKR 550',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG_MCPHcGnlCpYjtDVbZTKswkhjYKjUqusEA&s',
  },
];

const reviews = [
  {
    name: 'Mrs. Catherine White',
    title: 'As good as advertised',
    message: 'The coffee at Bartons is simply amazing! The atmosphere is cozy, and the staff is friendly. Highly recommended!',
    time: '44 Hours Ago',
  },
  {
    name: 'Mr. John Doe',
    title: 'Perfect Latte',
    message: 'I had the best latte of my life here. The flavor was rich, and the presentation was beautiful. Will definitely come back!',
    time: '2 Days Ago',
  },
  {
    name: 'Ms. Jane Smith',
    title: 'Great Ambiance',
    message: 'Bartons Coffee has a wonderful ambiance. It\'s the perfect place to relax and enjoy a cup of coffee.',
    time: '1 Week Ago',
  },
];
export default function Home() {
    return (
      /*<div>
        <h1>Home</h1>
        <p>Welcome to the home page!</p>
      </div>*/

      <>
      <header className="main-header">
        <div className="logo">BARTONS</div>
        <nav className="nav">
          <ul>
            <li><a href="#">HOME</a></li>
            <li><a href="#">ABOUT</a></li>
            <li><a href="#">MENU</a></li>
            <li><a href="#">CONTACT</a></li>
            <li><a href="#">CART</a></li>
          </ul>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-text">
          <h1>FRESH COFFEE IN <br /> THE MORNING</h1>
          <p>Welcome to BARTONS, where every cup tells a story!Our cozy café offers the finest handcrafted coffee, made from ethically sourced beans roasted to perfection.</p>
          <button className="btn">ORDER NOW</button>
        </div>
      </section>

      <section className="welcome">
      <div className="welcome-content">
        <div className="welcome-image">
          <img src="https://www.acouplecooks.com/wp-content/uploads/2021/05/Latte-Art-065.jpg" alt="Latte Art" />
        </div>
        <div className="welcome-text">
          <h2>Welcome to Bartons</h2>
          <p>Your best local coffee. In addition to delicious sandwiches, cakes, and hot dishes of the day, we offer a warm and inviting atmosphere for you to enjoy.</p>
          <button className="btn-secondary">VIEW MORE</button>
        </div>
      </div>
    </section>

    <section className="opening-hours">
      <div className="overlay">
        <h2>Opening Hours</h2>
        <div className="hours">
          <p><strong>Mon-Thu</strong> <span>08:00-18:00</span></p>
          <p><strong>Fri</strong> <span>08:00-19:00</span></p>
          <p><strong>Sat</strong> <span>09:00-18:00</span></p>
          <p><strong>Sun</strong> <span>09:00-18:00</span></p>
        </div>
      </div>
    </section>

    <section className="menu">
      <h2>Our Menu</h2>
      <div className="menu-container">
        {menuItems.map((item, index) => (
          <div className="menu-item" key={index}>
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p className="price">{item.price}</p>
            <button className="btn">Order Now</button>
          </div>
        ))}
      </div>
    </section>

    <section className="promotions">
  <h2>Special Promotions</h2>
  <div className="promo-banner">
    <h3>Buy 1 Get 1 Free – This Weekend Only!</h3>
    <p>Available on all Lattes and Cappuccinos</p>
    <button className="btn">Grab the Deal</button>
  </div>
</section>


    <section className="customer-reviews">
      <h2>What Our Customers Say</h2>
      <div className="reviews-container">
        {reviews.map((review, index) => (
          <div className="review" key={index}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXwA_iZLHkWjHbmu7XgTl8DsAR7EkQa2Q72A&s" alt="Customer" />
            <h3>{review.title}</h3>
            <p>"{review.message}"</p>
            <p className="review-author">{review.name}</p>
            <p className="review-time">{review.time}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.798467112142!2d79.853454415393!3d6.921668295003654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2596b8d5f3b9f%3A0x8a0b4a7e3b1b1b1b!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1630481633181!5m2!1sen!2sus"
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </section>

    <footer>
      <div className="footer-content">
        <div className="footer-links">
          <ul>
            <li><a href="#">HOME</a></li>
            <li><a href="#">ABOUT</a></li>
            <li><a href="#">MENU</a></li>
            <li><a href="#">PRODUCTS</a></li>
            <li><a href="#">NEWS</a></li>
            <li><a href="#">LOCATIONS</a></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h3>CONTACT</h3>
          <p>Colombo 07, Sri Lanka</p>
          <p><a href="tel:+940207313535">Tel: +94 020 731 3535</a></p>
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
  