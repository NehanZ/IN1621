'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CoffeeProductCard from '../../components/product/CoffeeProductCard';

const MenuPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const products = [
    {
      id: 1,
      name: 'Classic Cappuccino',
      description: 'Perfect balance of espresso, steamed milk and silky foam',
      price: '350',
      image: '/images/cappuccino.jpg',
      category: 'coffee',
      details: 'Our signature cappuccino made with locally sourced coffee beans and organic milk. Served in a 8oz cup.'
    },
    {
      id: 2,
      name: 'Butter Croissant',
      description: 'Flaky, buttery pastry baked fresh daily',
      price: '250',
      image: '/images/croissant.jpg',
      category: 'buns',
      details: 'Made with French butter and slow-fermented dough for maximum flavor. Perfect with our coffee.'
    },
    {
      id: 3,
      name: 'Chocolate Cupcake',
      description: 'Rich chocolate cake with velvety frosting',
      price: '300',
      image: '/images/cupcake.jpg',
      category: 'cupcakes',
      details: 'Moist chocolate cake topped with our special chocolate ganache. Contains dairy and gluten.'
    },
    {
      id: 4,
      name: 'Blueberry Muffin',
      description: 'Gluten-free muffin with fresh blueberries',
      price: '400',
      image: '/images/muffin.jpg',
      category: 'cakes',
      details: 'Made with almond flour and packed with antioxidant-rich blueberries. Gluten-free and dairy-free option available.'
    },
    {
      id: 5,
      name: 'Latte',
      description: 'Smooth espresso with steamed milk',
      price: '320',
      image: '/images/latte.jpg',
      category: 'coffee',
      details: 'Our creamy latte made with double shot of espresso and your choice of milk. Available in regular, soy, or oat milk.'
    },
    {
      id: 6,
      name: 'Cinnamon Roll',
      description: 'Sweet bun with cinnamon sugar filling',
      price: '280',
      image: '/images/cinnamon-roll.jpg',
      category: 'buns',
      details: 'Freshly baked cinnamon rolls with cream cheese icing. Best served warm.'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeFilter === 'all' || product.category === activeFilter;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'coffee', name: 'Coffees' },
    { id: 'buns', name: 'Buns' },
    { id: 'cakes', name: 'Cakes' },
    { id: 'cupcakes', name: 'Cupcakes' }
  ];

  return (
    <div className="min-h-screen bg-[#E5E5CB] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-[#3C2A21] mb-2 text-center">Our Menu</h1>
        <p className="text-[#1A120B] text-center mb-8">Discover our delicious offerings</p>
        
        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="w-full md:w-auto">
            <input
              type="text"
              placeholder="Search menu items..."
              className="px-4 py-2 rounded-lg border border-[#3C2A21] bg-[#D5CEA3] text-[#1A120B] w-full md:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === category.id
                    ? 'bg-[#3C2A21] text-[#E5E5CB]'
                    : 'bg-[#D5CEA3] text-[#3C2A21] hover:bg-[#3C2A21] hover:text-[#E5E5CB]'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <CoffeeProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-[#3C2A21] text-lg">No items found matching your search</p>
            <button 
              onClick={() => {
                setActiveFilter('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-[#3C2A21] text-[#E5E5CB] rounded-lg hover:bg-[#1A120B]"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;