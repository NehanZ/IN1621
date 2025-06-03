'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { notFound } from 'next/navigation';

const OrderDetailsPage = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const getOrder = () => {
      try {
        setLoading(true);
        setError(null);
        
        // First try to get order from sessionStorage (from orders list page)
        if (typeof window !== 'undefined') {
          const storedOrders = sessionStorage.getItem('userOrders') || sessionStorage.getItem('orders');
          if (storedOrders) {
            const orders = JSON.parse(storedOrders);
            const foundOrder = orders.find(o => o._id === params.id);
            
            if (foundOrder) {
              setOrder(foundOrder);
              setLoading(false);
              return;
            }
          }
        }
        
        // Fallback: fetch individual order if not found in sessionStorage
        fetchOrderFromAPI();
        
      } catch (error) {
        console.error('Error getting order from storage:', error);
        fetchOrderFromAPI();
      }
    };

    const fetchOrderFromAPI = async () => {
      try {
        console.log('Fetching order with ID:', params.id);
        
        const res = await fetch(`/api/order?orderId=${params.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (res.status === 404) {
          setOrder(undefined);
          return;
        }
        
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        console.log('API Response:', data);
        
        if (data.success && data.order) {
          setOrder(data.order);
        } else {
          throw new Error('Order not found in response');
        }
      } catch (error) {
        console.error('Error fetching order from API:', error);
        setError(error.message || 'Failed to fetch order details');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      getOrder();
    }
  }, [params.id]);

  const goBack = () => {
    router.push('/order');
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  // Calculate totals
  const calculateTotals = () => {
    if (!order || !order.items) return { subtotal: 0, deliveryFee: 0 };
    
    const subtotal = order.items.reduce((sum, item) => {
      const price = item.product?.price || item.price || 0;
      const quantity = item.quantity || 0;
      return sum + (price * quantity);
    }, 0);
    
    const deliveryFee = order.paymentDetails?.deliveryFee || 250; // Use from order or default
    return { subtotal, deliveryFee };
  };

  if (order === undefined) {
    return (
      <section className="order-details py-16 px-6 bg-[#f5ede8]">
        <div className="max-w-6xl mx-auto">
          <button 
            onClick={goBack}
            className="flex items-center text-[#8a5a44] hover:text-[#c28f5a] mb-6 font-medium"
          >
            <span className="mr-2">←</span> Back to Orders
          </button>
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4 text-center">
            <p>Order not found</p>
            <button 
              onClick={goBack}
              className="mt-2 bg-[#c28f5a] text-white py-2 px-4 rounded hover:bg-[#a67748] transition-colors"
            >
              Back to Orders
            </button>
          </div>
        </div>
      </section>
    );
  }
  
  if (loading) {
    return (
      <section className="order-details py-16 px-6 bg-[#f5ede8]">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c28f5a]"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="order-details py-16 px-6 bg-[#f5ede8]">
        <div className="max-w-6xl mx-auto">
          <button 
            onClick={goBack}
            className="flex items-center text-[#8a5a44] hover:text-[#c28f5a] mb-6 font-medium"
          >
            <span className="mr-2">←</span> Back to Orders
          </button>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p className="font-semibold">Error: {error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-2 bg-red-600 text-white py-1 px-3 rounded text-sm hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!order) {
    return (
      <section className="order-details py-16 px-6 bg-[#f5ede8]">
        <div className="max-w-6xl mx-auto">
          <button 
            onClick={goBack}
            className="flex items-center text-[#8a5a44] hover:text-[#c28f5a] mb-6 font-medium"
          >
            <span className="mr-2">←</span> Back to Orders
          </button>
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4 text-center">
            <p>Order not found</p>
            <button 
              onClick={goBack}
              className="mt-2 bg-[#c28f5a] text-white py-2 px-4 rounded hover:bg-[#a67748] transition-colors"
            >
              Back to Orders
            </button>
          </div>
        </div>
      </section>
    );
  }

  const { subtotal, deliveryFee } = calculateTotals();

  return (
    <section className="order-details py-16 px-6 bg-[#f5ede8]">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={goBack}
          className="flex items-center text-[#8a5a44] hover:text-[#c28f5a] mb-6 font-medium transition-colors"
        >
          <span className="mr-2">←</span> Back to Orders
        </button>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-6 border-b border-gray-200">
            <div>
              <h1 className="text-3xl font-bold text-[#8a5a44] mb-2">
                Order #{order._id?.slice(-8)}
              </h1>
              <p className="text-gray-600">
                Placed on {formatDate(order.createdAt)}
              </p>
            </div>
            <span className={`mt-4 md:mt-0 px-4 py-2 rounded-full text-sm font-semibold ${
              order.status === 'delivered' 
                ? 'bg-green-100 text-green-800' 
                : order.status === 'processing'
                ? 'bg-yellow-100 text-yellow-800'
                : order.status === 'pending'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {order.status?.charAt(0)?.toUpperCase() + order.status?.slice(1) || 'Unknown'}
            </span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-semibold mb-3 text-[#8a5a44]">Customer Information</h2>
              <p className="mb-1">
                <span className="font-medium">User ID:</span> {order.userId || 'N/A'}
              </p>
              <p>
                <span className="font-medium">Order ID:</span> {order._id}
              </p>
              {order.deliveryInfo && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Delivery Address:</h3>
                  <p className="text-sm text-gray-600">
                    {order.deliveryInfo.fullName && <span>{order.deliveryInfo.fullName}<br /></span>}
                    {order.deliveryInfo.address && <span>{order.deliveryInfo.address}<br /></span>}
                    {order.deliveryInfo.city && <span>{order.deliveryInfo.city}, </span>}
                    {order.deliveryInfo.district && <span>{order.deliveryInfo.district}<br /></span>}
                    {order.deliveryInfo.phone && <span>Phone: {order.deliveryInfo.phone}</span>}
                  </p>
                </div>
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3 text-[#8a5a44]">Payment Information</h2>
              <p className="mb-1">
                <span className="font-medium">Method:</span> {order.paymentDetails?.method || 'N/A'}
              </p>
              <p className="mb-1">
                <span className="font-medium">Transaction ID:</span> {order.paymentDetails?.transactionId || 'N/A'}
              </p>
              <p>
                <span className="font-medium">Order Status:</span> {order.status || 'N/A'}
              </p>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold mb-4 text-[#8a5a44]">Order Items</h2>
          {order.items && order.items.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full mb-8">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left">Item</th>
                    <th className="py-3 px-4 text-right">Price</th>
                    <th className="py-3 px-4 text-right">Quantity</th>
                    <th className="py-3 px-4 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {order.items.map((item, index) => {
                    const product = item.product || {};
                    const price = product.price || item.price || 0;
                    const quantity = item.quantity || 0;
                    const itemTotal = price * quantity;

                    return (
                      <tr key={item._id || index} className="hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            {product.image && (
                              <img 
                                src={product.image} 
                                alt={product.name || 'Product'} 
                                className="w-16 h-16 object-cover rounded-md mr-4"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                }}
                              />
                            )}
                            <div>
                              <span className="font-medium">
                                {product.name || item.name || 'Unknown Item'}
                              </span>
                              {item.option && (
                                <p className="text-sm text-gray-500">Option: {item.option}</p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right">
                          LKR {price.toLocaleString()}
                        </td>
                        <td className="py-4 px-4 text-right">{quantity}</td>
                        <td className="py-4 px-4 text-right font-medium">
                          LKR {itemTotal.toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600 mb-8">No items found for this order.</p>
          )}
          
          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>LKR {(order.paymentDetails?.subtotal || subtotal).toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Delivery Fee</span>
              <span>LKR {(order.paymentDetails?.deliveryFee || deliveryFee).toLocaleString()}</span>
            </div>
            {order.paymentDetails?.promoCode && (
              <div className="flex justify-between mb-2 text-green-600">
                <span>Promo Code ({order.paymentDetails.promoCode})</span>
                <span>Applied</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-gray-200">
              <span>Total</span>
              <span className="text-[#8a5a44]">
                LKR {(order.totalAmount || 0).toLocaleString()}
              </span>
            </div>
          </div>
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
    </section>
  );
};

export default OrderDetailsPage;