import React from 'react';

const FeaturedProducts = ({ products }) => (
  <div>
    {products && products.length > 0 ? (
      <ul>
        {products.map((product) => (
          <li key={product.id || product._id}>{product.name}</li>
        ))}
      </ul>
    ) : (
      <p>No featured products available.</p>
    )}
  </div>
);

export default FeaturedProducts;