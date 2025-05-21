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