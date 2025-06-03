'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Add timeout to prevent hanging requests
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const res = await fetch('/api/order', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        
        if (data.success) {
          setOrders(data.orders || []);
        } else {
          throw new Error('Failed to fetch orders from response');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        if (err.name === 'AbortError') {
          setError('Request timed out. Please try again.');
        } else {
          setError(err.message || 'Failed to fetch orders');
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);

  const viewOrderDetails = (orderId) => {
    router.push(`/orders/${orderId}`);
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  const retryFetch = () => {
    setError(null);
    setLoading(true);
    // Re-trigger useEffect
    window.location.reload();
  };

  // Loading Spinner Component
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c28f5a]"></div>
    </div>
  );

  // Error Component
  const ErrorMessage = ({ message }) => (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      <p className="font-semibold">Error: {message}</p>
      <button 
        onClick={retryFetch}
        className="mt-2 bg-red-600 text-white py-1 px-3 rounded text-sm hover:bg-red-700 transition-colors"
      >
        Retry
      </button>
    </div>
  );

  return (
    <div>
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
          
          {error && <ErrorMessage message={error} />}
          
          {loading ? (
            <LoadingSpinner />
          ) : orders.length > 0 ? (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#2a1f1a] text-white">
                    <tr>
                      <th className="py-3 px-6 text-left">Order ID</th>
                      <th className="py-3 px-6 text-left">Date & Time</th>
                      <th className="py-3 px-6 text-left">Items</th>
                      <th className="py-3 px-6 text-left">Total Amount</th>
                      <th className="py-3 px-6 text-left">Status</th>
                      <th className="py-3 px-6 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50">
                        <td className="py-4 px-6">#{order._id.slice(-8)}</td>
                        <td className="py-4 px-6">{formatDate(order.createdAt)}</td>
                        <td className="py-4 px-6">
                          {order.items?.length || 0} item(s)
                        </td>
                        <td className="py-4 px-6">
                          LKR {order.totalAmount?.toLocaleString() || '0'}
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            order.status === 'delivered' 
                              ? 'bg-green-100 text-green-800' 
                              : order.status === 'processing'
                              ? 'bg-yellow-100 text-yellow-800'
                              : order.status === 'pending'
                              ? 'bg-blue-100 text-blue-800'
                              : order.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : order.status === 'cancelled'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status?.charAt(0)?.toUpperCase() + order.status?.slice(1) || 'Unknown'}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <button 
                            onClick={() => viewOrderDetails(order._id)}
                            className="text-[#c28f5a] hover:text-[#8a5a44] font-medium transition-colors"
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
              <button 
                onClick={() => router.push('/menu')}
                className="mt-4 inline-block bg-[#c28f5a] text-white py-2 px-6 rounded-md hover:bg-[#a67748] transition-colors"
              >
                Browse Menu
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default OrdersPage;