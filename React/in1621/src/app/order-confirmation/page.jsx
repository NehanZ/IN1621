// app/order-confirmation/page.tsx
'use client';
import Link from 'next/link';
import Header from '../../components/header-footer/Header';
import Footer from '../../components/header-footer/Footer';

export default function OrderConfirmation() {
  return (
    <div>
      <Header />
      <div className="min-h-screen bg-[#E5E5CB] py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mb-6">
            <svg
              className="w-16 h-16 mx-auto text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-[#3C2A21] mb-4">
            Order Confirmed!
          </h1>
          <p className="text-lg text-[#1A120B] mb-8">
            Thank you for your order. We've received it and will start preparing your coffee soon.
          </p>
          <div className="bg-[#F5F5F5] p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold text-[#3C2A21] mb-4">
              Order Details
            </h2>
            <p className="mb-2">Order #: BRTN-{Math.floor(Math.random() * 10000)}</p>
            <p>Estimated Delivery: 30-45 minutes</p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/menu"
              className="bg-[#3C2A21] text-[#E5E5CB] px-6 py-3 rounded-lg hover:bg-[#1A120B] transition-colors"
            >
              Back to Menu
            </Link>
            <Link
              href="/orders"
              className="bg-[#D5CEA3] text-[#3C2A21] px-6 py-3 rounded-lg hover:bg-[#c5be93] transition-colors"
            >
              View My Orders
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}