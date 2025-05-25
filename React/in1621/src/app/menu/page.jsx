'use client';
import { useState, useEffect } from 'react';
import Header from '../../components/header-footer/Header';
import Footer from '../../components/header-footer/Footer';
import CoffeeProductCard from '../../components/product/CoffeeProductCard';

const MenuPage = () => {
  const [products, setProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch('/api/product');
        if (!res.ok) {
          throw new Error('Failed to fetch menu');
        }

        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to load menu:', error);
      }
    };

    fetchMenu();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeFilter === 'all' || product.category === activeFilter;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
    <>
      <Header />
      <div className="min-h-screen bg-[#E5E5CB] py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-[#3C2A21] mb-2 text-center">Our Menu</h1>
          <p className="text-[#1A120B] text-center mb-8">Discover our delicious offerings</p>

          {/* Search and Filter Section */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
            <input
              type="text"
              placeholder="Search menu items..."
              className="px-4 py-2 rounded-lg border border-[#3C2A21] bg-[#D5CEA3] text-[#1A120B] w-full md:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

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
      <Footer />
    </>
  );
};

export default MenuPage;
