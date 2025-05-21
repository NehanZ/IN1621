'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Orders() {
  const router = useRouter();
  
  // Sample order data - in a real app, you would fetch this from an API
  const [orders, setOrders] = useState([
    {
      id: 'ORD-2023-001',
      dateTime: '2023-11-15 14:30',
      totalPrice: 2450,
      status: 'Delivered'
    },
    {
      id: 'ORD-2023-002',
      dateTime: '2023-11-20 10:15',
      totalPrice: 1800,
      status: 'Delivered'
    },
    {
      id: 'ORD-2023-003',
      dateTime: '2023-12-05 16:45',
      totalPrice: 3200,
      status: 'Cancelled'
    },
    {
      id: 'ORD-2024-001',
      dateTime: '2024-01-10 09:20',
      totalPrice: 1650,
      status: 'Delivered'
    },
    {
      id: 'ORD-2024-002',
      dateTime: '2024-01-25 13:10',
      totalPrice: 2100,
      status: 'Cancelled'
    }
  ]);

  const viewOrderDetails = (orderId) => {
    router.push(`/orders/${orderId}`);
  };

  return (
    <>
      {/* Hero Section */}
      <section
        className="hero"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=1471&auto=format&fit=crop')`,
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
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <h1 className="text-5xl font-bold relative z-10">My Orders</h1>
      </section>

      {/* Orders Section */}
      <section className="orders py-16 px-6 bg-[#f5ede8]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-[#8a5a44]">Order History</h2>
          
          {orders.length > 0 ? (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#2a1f1a] text-white">
                    <tr>
                      <th className="py-3 px-6 text-left">Order ID</th>
                      <th className="py-3 px-6 text-left">Date & Time</th>
                      <th className="py-3 px-6 text-left">Total Price</th>
                      <th className="py-3 px-6 text-left">Status</th>
                      <th className="py-3 px-6 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="py-4 px-6">{order.id}</td>
                        <td className="py-4 px-6">{order.dateTime}</td>
                        <td className="py-4 px-6">LKR {order.totalPrice.toLocaleString()}</td>
                        <td className="py-4 px-6">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            order.status === 'Delivered' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <button 
                            onClick={() => viewOrderDetails(order.id)}
                            className="text-[#c28f5a] hover:text-[#8a5a44] font-medium"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <p className="text-lg text-gray-600">You haven't placed any orders yet.</p>
              <a href="#" className="mt-4 inline-block bg-[#c28f5a] text-white py-2 px-6 rounded-md hover:bg-[#a67748] transition-colors">
                Browse Menu
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  );
}