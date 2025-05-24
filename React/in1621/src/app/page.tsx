'use client';
import Footer from '../components/header-footer/Footer';
import Header from '../components/header-footer/Header';
import FeaturedProducts from '../components/product/FeaturedProducts ';
import SubscriptionPreferences from '../components/subscription/SubscriptionPreferences';
import CustomerReview from '../components/reviews/CustomerReview';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

export default function Home() {
  const featuredProducts = [
    {
      id: 1,
      name: 'Classic Cappuccino',
      price: 350,
      image: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?q=80&w=1000&auto=format&fit=crop',
      description: 'Perfect balance of espresso, steamed milk and foam'
    },
    {
      id: 2,
      name: 'Butter Croissant',
      price: 250,
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1000&auto=format&fit=crop',
      description: 'Flaky, buttery pastry baked fresh daily'
    },
    {
      id: 3,
      name: 'Chocolate Muffin',
      price: 300,
      image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?q=80&w=1000&auto=format&fit=crop',
      description: 'Rich chocolate flavor with a soft, moist texture'
    }
    ,
    {
      id: 4,
      name: 'Butter Croissant',
      price: 250,
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1000&auto=format&fit=crop',
      description: 'Flaky, buttery pastry baked fresh daily'
    },
  ];

  function newsletterSignup(prefs: any) {
    console.log('Newsletter signup preferences:', prefs);
    // TODO: Connect to your newsletter API
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#E5E5CB]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full">
        <Image
          src="/images/bg1.jpeg"
          alt="Bartons Coffee Shop"
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0  bg-opacity-40 flex items-center justify-center"
          style={{
            backgroundImage: "url('../../../in1621/public/images/bg1.jpeg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 1,
          }}
        >
          <div className="text-center px-4">
            <h1 className="text-9xl md:text-7xl font-bold text-white mb-4">Bartons Coffee</h1>
            <p className="text-5xl md:text-2xl text-white mb-8">Serving the finest coffee in Colombo since 2010</p>
            <button className="bg-[#8a5a44] hover:bg-[#6d4737] text-white px-8 py-3 rounded-lg text-lg transition-colors cursor-pointer">
              View Menu
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 bg-[#E5E5CB]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#3C2A21] mb-4">Our Story</h2>
            <p className="text-lg text-[#1A120B] mb-6">
              Bartons Coffee began as a small family-owned café in the heart of Colombo. 
              Today, we're proud to serve our community with ethically-sourced beans 
              and handcrafted beverages made with care.
            </p>
            <button className="flex items-center text-[#8a5a44] hover:text-[#6d4737] font-medium">
              Learn More About Us <ChevronRight className="ml-1" size={20} />
            </button>
          </div>
          <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1463797221720-6b07e6426c24?q=80&w=1000&auto=format&fit=crop"
              alt="Coffee preparation"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-6 bg-[#D5CEA3]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#3C2A21] mb-12 text-center">Our Specialties</h2>
          <FeaturedProducts products={featuredProducts} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-[#E5E5CB]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#3C2A21] mb-12 text-center">What Our Customers Say</h2>
          <CustomerReview />
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-6 bg-[#D5CEA3]">
        <div className="max-w-6xl mx-auto">
          <SubscriptionPreferences />
        </div>
      </section>

      <Footer />
    </div>
  );
}
        
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
import Link from 'next/link';

export default function Home() {
    return (
      

      <>
      <header className="main-header">
        <div className="logo">BARTONS</div>
        <nav className="nav">
          <ul>
            <li><a href="#">HOME</a></li>
            <li>
               <Link href="/about">ABOUT</Link>
            </li>
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
  
