'use client';
import Link from 'next/link';
import Image from 'next/image';

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

export default function About() {
  return (
    <div className="min-h-screen bg-[#E5E5CB]">
      {/* Header */}
      <header className="bg-black text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">BARTONS</div>
          <nav>
            <ul className="flex space-x-5">
              <li><Link href="/" className="text-sm hover:text-blue-500 transition-colors">HOME</Link></li>
              <li><Link href="/about" className="text-sm hover:text-blue-500 transition-colors">ABOUT</Link></li>
              <li><Link href="/menu" className="text-sm hover:text-blue-500 transition-colors">MENU</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-blue-500 transition-colors">CONTACT</Link></li>
              <li><Link href="/cart" className="text-sm hover:text-blue-500 transition-colors">CART</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="h-96 flex items-center justify-center bg-cover bg-center text-white text-center"
        style={{ backgroundImage: "url('https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/56/b5/6a/idees-art-cafe-shop-kastoria.jpg?w=800&h=-1&s=1')" }}
      >
        <div className="bg-black bg-opacity-50 p-8 rounded-lg">
          <h1 className="text-4xl font-bold mb-4">Welcome to Bartons Coffee</h1>
          <p className="text-xl">Discover our passion in every cup</p>
        </div>
      </section>

      {/* About Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Our Story */}
        <section className="mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#3C2A21] mb-6">Our Story</h2>
            <p className="text-lg text-[#1A120B]">
              Bartons Coffee began with a single idea: bring the world's finest beans to Sri Lanka. 
              Our passion for craftsmanship, community, and sustainability drives every cup we serve. 
              What started as a small coffee cart on the streets of Colombo has now blossomed into one 
              of Sri Lanka's beloved coffee shops, known for its exceptional service and locally-sourced beans.
            </p>
          </div>
        </section>

        {/* Our Mission */}
        <section className="mb-16 bg-[#D5CEA3] p-8 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#3C2A21] mb-6">Our Mission</h2>
            <p className="text-lg text-[#1A120B]">
              Our mission is simple: to provide every customer with a warm, memorable experience 
              and the best-tasting coffee made from the freshest beans. We aim to foster connections 
              through our coffee, one cup at a time while supporting local farmers and maintaining 
              eco-friendly practices.
            </p>
          </div>
        </section>

        {/* Meet the Team */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#3C2A21] mb-8 text-center">Meet the Team</h2>
          <p className="text-lg text-[#1A120B] mb-12 text-center">
            Our team consists of coffee enthusiasts who are dedicated to perfecting every cup. 
            From the baristas to the managers, everyone at Bartons shares a passion for creating 
            a coffee culture that celebrates quality, community, and sustainability.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-64 w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#3C2A21]">{member.name}</h3>
                  <p className="text-[#8a5a44] font-medium mb-2">{member.role}</p>
                  <p className="text-[#1A120B]">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center">
          <button className="bg-[#3C2A21] text-[#E5E5CB] px-6 py-3 rounded-lg hover:bg-[#1A120B] transition-colors">
            LEARN MORE
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#2a1f1a] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="mb-6 md:mb-0">
              <ul className="flex flex-col space-y-2">
                <li><Link href="/" className="hover:text-[#D5CEA3] transition-colors">HOME</Link></li>
                <li><Link href="/about" className="hover:text-[#D5CEA3] transition-colors">ABOUT</Link></li>
                <li><Link href="/menu" className="hover:text-[#D5CEA3] transition-colors">MENU</Link></li>
                <li><Link href="/contact" className="hover:text-[#D5CEA3] transition-colors">CONTACT</Link></li>
                <li><Link href="/cart" className="hover:text-[#D5CEA3] transition-colors">CART</Link></li>
              </ul>
            </div>
            
            <div className="mb-6 md:mb-0">
              <h3 className="text-lg font-bold mb-2">CONTACT</h3>
              <p>Colombo 07, Sri Lanka</p>
              <a href="tel:+940207313535" className="hover:text-[#D5CEA3] transition-colors">+94 020 731 3535</a>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold">BARTONS</h2>
            </div>
          </div>
          
          <p className="text-center text-sm opacity-80">
            © 2025 Bartons Coffee. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}