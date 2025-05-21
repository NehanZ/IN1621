'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { useCart } from '../../components/context/CartContext';


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <header className="bg-[#2a1f1a] text-white py-4 px-6 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold hover:text-[#c28f5a] transition-colors">
          Ecafe
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {[
              { href: '/', label: 'HOME' },
              { href: '/about', label: 'ABOUT' },
              { href: '/menu', label: 'MENU' },
              { href: '/contact', label: 'CONTACT' },
            ].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="relative group">
                  <span >
                    {item.label}
                  </span>
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#ffffff] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Cart and Mobile Menu Button */}
        <div className="flex items-center space-x-6">
          <Link href="/cart" className="relative hover:text-[#c28f5a]">
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#c28f5a] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          <Link href="/account" className="hover:text-[#c28f5a] transition-colors">
            <User size={24} />
          </Link>

          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#2a1f1a] absolute top-16 left-0 right-0 shadow-lg">
          <nav className="container mx-auto px-6 py-4">
            <ul className="flex flex-col space-y-4">
              {[
                { href: '/', label: 'HOME' },
                { href: '/about', label: 'ABOUT' },
                { href: '/menu', label: 'MENU' },
                { href: '/contact', label: 'CONTACT' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="relative group block py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="group-hover:text-[#c28f5a] transition-colors duration-300">
                      {item.label}
                    </span>
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#c28f5a] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
