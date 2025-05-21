'use client';
import Link from 'next/link';
import Image from 'next/image';

const CoffeeProductCard = ({ product }) => {
  const { id, name, description, price, image, category } = product;

  const handleCardClick = () => {
    window.location.href = `/menu/${id}`;
  };

  return (
    <div
      className="bg-[#D5CEA3] rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg hover:translate-y-[-5px] cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={`${name} - ${category}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-[#3C2A21] hover:underline">
            {name}
          </h3>
          <span className="bg-[#3C2A21] text-[#E5E5CB] text-xs px-2 py-1 rounded-full">
            {category ? category.charAt(0).toUpperCase() + category.slice(1) : ''}
          </span>
        </div>
        
        <p className="text-[#1A120B] text-sm mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-[#3C2A21]">LKR {price}</span>
          <button
            onClick={e => {
              e.stopPropagation();
              window.location.href = `/menu/${id}`;
            }}
            className="bg-[#3C2A21] text-[#E5E5CB] text-sm px-4 py-2 rounded hover:bg-[#1A120B] transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeProductCard;