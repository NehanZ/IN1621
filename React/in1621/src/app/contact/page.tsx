'use client';
import React, { useState } from 'react';
import Header from '../../components/header-footer/Header';
import Footer from '../../components/header-footer/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
      < Header />
      {/* Hero Section */}
      <section
        className="hero"
        style={{
          backgroundImage: `url('/images/contact1.avif')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '40vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div className="absolute inset-0 "></div>
        <h1 className="text-5xl font-bold relative z-10">Contact Us</h1>
      </section>

      <section className="contact py-16 px-6 bg-[#E5E5CB]">
        <div className="contact-content max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="contact-form bg-[#e9e9db] p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-[#8a5a44]">Get In Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name" 
                  required 
                  className="w-full p-3 border border-[#242424] rounded-md focus:outline-none focus:ring-2 focus:ring-[#c28f5a]"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email" 
                  required 
                  className="w-full p-3 border border-[#242424] rounded-md focus:outline-none focus:ring-2 focus:ring-[#c28f5a]"
                />
              </div>
              <div>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message" 
                  required
                  rows={6}
                  className="w-full p-3 border border-[#242424] rounded-md focus:outline-none focus:ring-2 focus:ring-[#c28f5a]"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="bg-[#c28f5a] text-white py-3 px-8 rounded-md hover:bg-[#a67748] transition-colors font-medium"
              >
                SEND MESSAGE
              </button>
            </form>
          </div>
          
          <div className="contact-info bg-[#e9e9db] p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-6 text-[#8a5a44]">Contact Information</h3>
            <div className="space-y-4 mb-8">
              <p className="flex items-start">
                <span className="font-bold mr-2">Address:</span> 
                <span>Colombo 07, Sri Lanka</span>
              </p>
              <p className="flex items-start">
                <span className="font-bold mr-2">Phone:</span> 
                <a href="tel:+940207313535" className="hover:text-[#c28f5a] transition-colors">+94 020 731 3535</a>
              </p>
              <p className="flex items-start">
                <span className="font-bold mr-2">Email:</span> 
                <a href="mailto:info@Ecafe.lk" className="hover:text-[#c28f5a] transition-colors">info@Ecafe.lk</a>
              </p>
            </div>
            
            <h4 className="text-xl font-semibold mb-4 text-[#8a5a44]">Business Hours</h4>
            <div className="space-y-2 mb-8">
              <p>Monday - Friday: 7:00 AM - 8:00 PM</p>
              <p>Saturday - Sunday: 8:00 AM - 9:00 PM</p>
            </div>
            
            <h4 className="text-xl font-semibold mb-4 text-[#8a5a44]">Follow Us</h4>
            <div className="social-links flex space-x-4">
              <a href="#" className="w-10 h-10 bg-[#3b5998] flex items-center justify-center rounded-full text-white hover:opacity-80 transition-opacity">
                <span>FB</span>
              </a>
              <a href="#" className="w-10 h-10 bg-[#E1306C] flex items-center justify-center rounded-full text-white hover:opacity-80 transition-opacity">
                <span>IG</span>
              </a>
              <a href="#" className="w-10 h-10 bg-[#1DA1F2] flex items-center justify-center rounded-full text-white hover:opacity-80 transition-opacity">
                <span>TW</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="map mb-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 text-[#8a5a44]">Find Us</h2>
          <div className="rounded-lg overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.798467112142!2d79.853454415393!3d6.921668295003654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2596b8d5f3b9f%3A0x8a0b4a7e3b1b1b1b!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1630481633181!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
      < Footer />
    </>
  );
}
