'use client';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import BackButton from '../../../components/BackButton';
import { useCart } from '../../../components/context/CartContext';
import { useState, useEffect } from 'react';
import Toast from '../../../components/Toast';

export default function ProductDetails({ params }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${params.id}`);
      if (res.status === 404) {
        setProduct(undefined);
        return;
      }
      const prod = await res.json();
      setProduct(prod);
    };
    fetchProduct();
  }, [params.id]);

  if (product === undefined) {
    return notFound();
  }
  if (!product) {
    return <div>Loading...</div>;
  }

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handleAddToCart = () => {
    if (product.options && product.options.length > 0 && !selectedOption) {
      setToastMessage('Please select an option.');
      setShowToast(true);
      return;
    }
    addToCart({
      ...product,
      option: selectedOption,
      quantity,
    });
    setToastMessage('Added to cart!');
    setShowToast(true);
  };

  return (
    <div className="product-details-container">
      <BackButton />
      <div className="product-details">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={300}
          style={{ objectFit: 'cover', borderRadius: '8px' }}
        />
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <div>
          <strong>Price:</strong> ${product.price}
        </div>
        {product.options && product.options.length > 0 && (
          <div>
            <label>
              <strong>Options:</strong>
              <select value={selectedOption || ''} onChange={handleOptionChange}>
                <option value="" disabled>
                  Select an option
                </option>
                {product.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}
        <div>
          <label>
            <strong>Quantity:</strong>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              style={{ width: '60px', marginLeft: '8px' }}
            />
          </label>
        </div>
        <button onClick={handleAddToCart} style={{ marginTop: '16px' }}>
          Add to Cart
        </button>
      </div>
      {showToast && (
        <Toast message={toastMessage} onClose={() => setShowToast(false)} />
      )}
    </div>
  );
}
