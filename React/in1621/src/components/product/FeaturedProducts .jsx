import React from 'react';
import CoffeeProductCard from './CoffeeProductCard';

const FeaturedProducts = ({ products }) => {

  const featured = products.slice(0, 3);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {featured.length > 0 ? (
        featured.map((product) => (
          <CoffeeProductCard key={product._id} product={product} />
        ))
      ) : (
        <p className="col-span-full text-center">No featured products available.</p>
      )}
    </div>
  );
};

export default FeaturedProducts;