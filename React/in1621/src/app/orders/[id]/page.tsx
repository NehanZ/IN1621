'use client';
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '../../../components/header-footer/Header';
import Footer from '../../../components/header-footer/Footer';

export default function OrderDetails() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id;
  
  // In a real app, you would fetch this data from an API based on the orderId
  const [orderDetails] = useState({
    id: orderId || 'ORD-2023-001',
    dateTime: '2023-11-15 14:30',
    totalPrice: 2450,
    status: 'Delivered',
    customerName: 'John Doe',
    deliveryAddress: '123 Coffee Street, Colombo 07, Sri Lanka',
    paymentMethod: 'Credit Card',
    items: [
      {
        id: 1,
        name: 'Cappuccino',
        price: 600,
        quantity: 2,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Cappuccino_in_original.jpg/1920px-Cappuccino_in_original.jpg'
      },
      {
        id: 2,
        name: 'Chocolate Croissant',
        price: 450,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1000&auto=format&fit=crop'
      },
      {
        id: 3,
        name: 'Mocha',
        price: 700,
        quantity: 1,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOCj_gHGzcoR4OYogtn-3igpzgFB-oFUJqDQ&s'
      }
    ]
  });

  const goBack = () => {
    router.push('/orders'); // Fixed typo in route ('oders' → 'orders')
  };

  // Calculate subtotal
  const subtotal = orderDetails.items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  // Delivery fee
  const deliveryFee = 100;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Order Details Section */}
      <main className="flex-grow py-16 px-6 bg-[#f5ede8]">
        <div className="max-w-6xl mx-auto">
          <button 
            onClick={goBack}
            className="flex items-center text-[#8a5a44] hover:text-[#c28f5a] mb-6 font-medium"
          >
            <span className="mr-2">←</span> Back to Orders
          </button>
          
          {/* Rest of your order details content */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden p-6 mb-8">
            {/* ... existing order details JSX ... */}
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-[#8a5a44]">Need Help?</h2>
            <p className="mb-4">If you have any questions or concerns about your order, please contact our customer service.</p>
            <button
              onClick={() => router.push('/contact')}
              className="inline-block bg-[#c28f5a] text-white py-2 px-6 rounded-md hover:bg-[#a67748] transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}