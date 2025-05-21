'use client';
import Image from 'next/image';
import Header from '../../components/header-footer/Header';
import Footer from '../../components/header-footer/Footer'

const teamMembers = [
  {
    name: 'Jane Doe',
    role: 'Founder & Head Barista',
    image: '/images/jane.jpg',
    bio: 'Jane brings 10 years of coffee artistry to Ecafe Coffee.',
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
    bio: 'Ayesha spreads the love for Ecafe Coffee far and wide.',
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#E5E5CB] gap-y-14">
      <Header />
      {/* Hero Section */}
      <section 
        className="h-96 flex items-center justify-center bg-cover bg-center text-white text-center"
        style={{ backgroundImage: "url('https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/56/b5/6a/idees-art-cafe-shop-kastoria.jpg?w=800&h=-1&s=1')" }}
      >
        <div className="bg-black bg-opacity-50 p-8 rounded-lg">
          <h1 className="text-4xl font-bold mb-4">Welcome to Ecafe Coffee</h1>
          <p className="text-xl">Discover our passion in every cup</p>
        </div>
      </section>

      {/* About Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Our Story */}
        <section className="mb-16 shadow-md">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#3C2A21] mb-6">Our Story</h2>
            <p className="text-lg text-[#1A120B]">
              Ecafe Coffee began with a single idea: bring the world's finest beans to Sri Lanka. 
              Our passion for craftsmanship, community, and sustainability drives every cup we serve. 
              What started as a small coffee cart on the streets of Colombo has now blossomed into one 
              of Sri Lanka's beloved coffee shops, known for its exceptional service and locally-sourced beans.
            </p>
          </div>
        </section>

        {/* Our Mission */}
        <section className="mb-16 bg-[#E5E5CB] p-8 rounded-lg shadow-md">
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
            From the baristas to the managers, everyone at Ecafe shares a passion for creating 
            a coffee culture that celebrates quality, community, and sustainability.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-[#e9e9db] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
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
      < Footer />
    </div>
  );
}