import React, { useState, useEffect } from 'react';

const OrdersPage = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders');
        const data = await res.json();
        setOrders(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <Error message={error} />;

  // Render orders here
  return (
    <div>
      {/* Render your orders list */}
      {orders.map((order, idx) => (
        <div key={idx}>{JSON.stringify(order)}</div>
      ))}
    </div>
  );
};

export default OrdersPage;