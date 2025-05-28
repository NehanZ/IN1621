'use client';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import BackButton from '../../../components/BackButton';
import { useCart } from '../../../components/context/CartContext';
import { useState, useEffect } from 'react';
import Toast from '../../../components/Toast';
import Header from '../../../components/header-footer/Header';
import Footer from '../../../components/header-footer/Footer';

export default function ProductDetails() {
  const params = useParams();
  const [selectedOption, setSelectedOption] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const getProduct = () => {
      try {
        setLoading(true);

        if (typeof window !== 'undefined') {
          const storedProducts = sessionStorage.getItem('menuProducts');
          if (storedProducts) {
            const products = JSON.parse(storedProducts);
            const foundProduct = products.find(p => p._id === params.id);

            if (foundProduct) {
              setProduct(foundProduct);
              setLoading(false);
              return;
            }
          }
        }

        fetchProductFromAPI();
      } catch (error) {
        console.error('Error getting product from storage:', error);
        fetchProductFromAPI();
      }
    };

    const fetchProductFromAPI = async () => {
      try {
        const res = await fetch(`/api/products/${params.id}`);

        if (res.status === 404) {
          setProduct(undefined);
          return;
        }

        if (!res.ok) {
          throw new Error('Failed to fetch product');
        }

        const prod = await res.json();
        setProduct(prod);
      } catch (error) {
        console.error('Error fetching product from API:', error);
        setProduct(undefined);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      getProduct();
    }
  }, [params.id]);

  if (product === undefined) return notFound();
  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#E5E5CB] flex items-center justify-center">
          <div className="text-[#3C2A21] text-xl">Loading...</div>
        </div>
        <Footer />
      </>
    );
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
    <>
      <Header />
      <div className="min-h-screen bg-[#E5E5CB] py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <BackButton />

          <div className="bg-[#D5CEA3] rounded-lg shadow-lg overflow-hidden mt-6">
            <div className="md:flex">
              {/* Product Image */}
              <div className="md:w-1/2">
                <div className="relative h-64 md:h-96">
                  <Image
                    src={product.image || '/placeholder-image.jpg'}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                  />
                </div>
              </div>

              {/* Product Details */}
              <div className="md:w-1/2 p-6">
                <h1 className="text-3xl font-bold text-[#3C2A21] mb-4">{product.name}</h1>
                <p className="text-[#1A120B] mb-4 leading-relaxed">{product.description}</p>

                <div className="mb-4">
                  <span className="text-2xl font-bold text-[#3C2A21]">${product.price}</span>
                  <span className="ml-4 text-sm text-[#1A120B] bg-[#E5E5CB] px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>

                {/* Stock Status */}
                {product.stock !== undefined && (
                  <div className="mb-4">
                    <span
                      className={`text-sm px-3 py-1 rounded-full ${
                        product.stock > 0
                          ? 'bg-green-200 text-green-800'
                          : 'bg-red-200 text-red-800'
                      }`}
                    >
                      {product.stock > 0
                        ? `In Stock (${product.stock} available)`
                        : 'Out of Stock'}
                    </span>
                  </div>
                )}

                {/* Options */}
                {product.options && product.options.length > 0 && (
                  <div className="mb-4">
                    <label className="block text-[#3C2A21] font-semibold mb-2">Options:</label>
                    <select
                      value={selectedOption || ''}
                      onChange={handleOptionChange}
                      className="w-full px-3 py-2 border border-[#3C2A21] rounded-lg bg-[#E5E5CB] text-[#1A120B] focus:outline-none focus:ring-2 focus:ring-[#3C2A21]"
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      {product.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Quantity */}
                <div className="mb-6">
                  <label className="block text-[#3C2A21] font-semibold mb-2">Quantity:</label>
                  <input
                    type="number"
                    min="1"
                    max={product.stock || 99}
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-20 px-3 py-2 border border-[#3C2A21] rounded-lg bg-[#E5E5CB] text-[#1A120B] focus:outline-none focus:ring-2 focus:ring-[#3C2A21]"
                  />
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                    product.stock === 0
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      : 'bg-[#3C2A21] text-[#E5E5CB] hover:bg-[#1A120B]'
                  }`}
                >
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showToast && <Toast message={toastMessage} onClose={() => setShowToast(false)} />}
      <Footer />
    </>
  );
}
