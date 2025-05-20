'use client';
import CoffeeProductCard from './CoffeeProductCard';

const FeaturedProducts = ({ products }) => {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-[#3C2A21] mb-4">Our Favorites</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.slice(0, 4).map(product => (
          <CoffeeProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;