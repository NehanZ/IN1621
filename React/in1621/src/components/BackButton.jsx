'use client';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const BackButton = () => {
  return (
    <Link 
      href="/menu"
      className="flex items-center text-[#3C2A21] hover:text-[#1A120B] mb-6 transition-colors"
    >
      <ArrowLeft className="mr-2" size={20} />
      Back to Menu
    </Link>
  );
};

export default BackButton;