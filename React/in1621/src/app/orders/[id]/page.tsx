// Add these states
const [order, setOrder] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

// Fetch order data
useEffect(() => {
  const fetchOrder = async () => {
    try {
      const res = await fetch(`/api/orders/${params.orderId}`);
      const data = await res.json();
      setOrder(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  fetchOrder();
}, [params.orderId]);

// Handle loading/error states
if (loading) return <LoadingSpinner />;
if (error) return <Error message={error} />;
if (!order) return <NotFound />;