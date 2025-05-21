'use client'; // Add this at the top to make it a client component
import { notFound } from 'next/navigation';
import Image from 'next/image';
import BackButton from '../../../components/BackButton';
import { useCart } from '../../../components/context/CartContext';
import { useState } from 'react';
import Toast from '../../../components/Toast';

const getProductDetails = async (id) => {
  // In a real app, you would fetch this from your database/API
  const products = [
    {
      id: 1,
      name: 'Classic Cappuccino',
      description: 'Perfect balance of espresso, steamed milk and silky foam',
      price: 350, // Changed to number type for calculations
      image: '/images/cappuccino.jpg',
      category: 'coffee',
      details: 'Our signature cappuccino made with locally sourced coffee beans and organic milk. Served in a 8oz cup.',
      ingredients: 'Espresso, steamed milk, milk foam',
      options: ['Small', 'Medium', 'Large']
    },
    {
      id: 2,
      name: 'Iced Latte',
      description: 'Chilled espresso with cold milk and ice',
      price: 400,
      image: '/images/iced-latte.jpg',
      category: 'coffee',
      details: 'A refreshing iced latte made with double espresso and fresh cold milk, served over ice.',
      ingredients: 'Espresso, cold milk, ice',
      options: ['Regular', 'Large']
    },
    {
      id: 3,
      name: 'Chocolate Muffin',
      description: 'Rich and moist chocolate muffin',
      price: 250,
      image: '/images/chocolate-muffin.jpg',
      category: 'bakery',
      details: 'A decadent chocolate muffin with chocolate chips, baked fresh daily.',
      ingredients: 'Flour, cocoa, chocolate chips, eggs, sugar, butter',
      options: ['Single', 'Pack of 4']
    },
    {
      id: 4,
      name: 'Green Tea',
      description: 'Soothing hot green tea',
      price: 200,
      image: '/images/green-tea.jpg',
      category: 'tea',
      details: 'Premium green tea leaves brewed to perfection. Served hot.',
      ingredients: 'Green tea leaves, hot water',
      options: ['Cup', 'Pot']
    }
  ];

  return products.find(product => product.id === parseInt(id));
};

import { useEffect } from 'react';

export default function ProductDetails({ params }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  
  useEffect(() => {
    const fetchProduct = async () => {
      const prod = await getProductDetails(params.id);
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

  const handleAddToCart = () => {
    if (product.options && !selectedOption) {
      setToastMessage('Please select an option');
      setShowToast(true);
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      option: selectedOption
    });

    setToastMessage(`${quantity} ${product.name} added to cart`);
    setShowToast(true);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#E5E5CB] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <BackButton />
        
        <div className="bg-[#D5CEA3] rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 relative h-64 md:h-auto">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            <div className="p-6 md:w-1/2">
              <div className="flex justify-between items-start mb-2">
                <h1 className="text-2xl font-bold text-[#3C2A21]">{product.name}</h1>
                <span className="bg-[#3C2A21] text-[#E5E5CB] text-sm px-3 py-1 rounded-full">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </span>
              </div>
              
              <p className="text-lg font-semibold text-[#3C2A21] mb-4">LKR {product.price.toLocaleString()}</p>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-[#3C2A21] mb-2">Description</h2>
                <p className="text-[#1A120B]">{product.details}</p>
              </div>
              
              {product.ingredients && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-[#3C2A21] mb-2">Ingredients</h2>
                  <p className="text-[#1A120B]">{product.ingredients}</p>
                </div>
              )}
              
              {product.options && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-[#3C2A21] mb-2">Options</h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.options.map(option => (
                      <button
                        key={option}
                        onClick={() => setSelectedOption(option)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          selectedOption === option
                            ? 'bg-[#3C2A21] text-[#E5E5CB]'
                            : 'bg-[#E5E5CB] text-[#3C2A21] border border-[#3C2A21]'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center border border-[#3C2A21] rounded-lg">
                  <button 
                    onClick={decrementQuantity}
                    className="px-3 py-1 text-[#3C2A21] hover:bg-[#3C2A21] hover:text-[#E5E5CB] transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4">{quantity}</span>
                  <button 
                    onClick={incrementQuantity}
                    className="px-3 py-1 text-[#3C2A21] hover:bg-[#3C2A21] hover:text-[#E5E5CB] transition-colors"
                  >
                    +
                  </button>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  className="bg-[#3C2A21] text-[#E5E5CB] px-6 py-2 rounded-lg hover:bg-[#1A120B] transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showToast && (
        <Toast 
          message={toastMessage} 
          onClose={() => setShowToast(false)} 
        />
      )}
    </div>
  );
}