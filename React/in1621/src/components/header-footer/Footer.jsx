'use client';
import Link from 'next/link';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 1500);
  };

  return (
    <footer className="bg-[#2a1f1a] text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="hover:text-[#c28f5a] transition-colors flex items-center gap-2">
                  HOME
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#c28f5a] transition-colors flex items-center gap-2">
                  ABOUT
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-[#c28f5a] transition-colors flex items-center gap-2">
                  MENU
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#c28f5a] transition-colors flex items-center gap-2">
                  CONTACT
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-[#c28f5a] transition-colors flex items-center gap-2">
                  CART
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">CONTACT</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 flex-shrink-0 text-[#c28f5a]" size={18} />
                <p>Colombo 07, Sri Lanka</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-[#c28f5a]" size={18} />
                <a href="tel:+940207313535" className="hover:text-[#c28f5a] transition-colors">
                  +94 020 731 3535
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-1 flex-shrink-0 text-[#c28f5a]" size={18} />
                <div>
                  <p>Monday - Friday: 7:00 AM - 9:00 PM</p>
                  <p>Weekends: 8:00 AM - 10:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="mb-4">Subscribe to receive updates, promotions, and coffee tips!</p>
            
            {isSubscribed ? (
              <div className="bg-[#c28f5a]/20 border border-[#c28f5a] p-4 rounded-lg">
                <p className="text-center text-[#c28f5a] font-medium">
                  Thank you for subscribing! Check your email for confirmation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex items-center gap-3 bg-[#3C2A21] p-3 rounded-lg">
                  <Mail className="text-[#c28f5a]" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="bg-transparent flex-grow focus:outline-none placeholder-gray-400"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    isLoading
                      ? 'bg-gray-500 cursor-not-allowed'
                      : 'bg-[#c28f5a] hover:bg-[#a5774a]'
                  }`}
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe'}
                </button>
                <p className="text-xs text-gray-400">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Ecafe Coffee. All Rights Reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-[#c28f5a] transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#c28f5a] transition-colors text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}