// components/product/ProductCard.tsx
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../../components/context/CartContext';

const CoffeeProductCard = ({ product }) => {
  const { id, name, description, price, image, category } = product;
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({
      id,
      name,
      price,
      image,
    });
  };

  return (
    <div className="bg-[#D5CEA3] rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg hover:translate-y-[-5px] cursor-pointer">
      <Link href={`/menu/${id}`} className="block">
        <div className="relative h-48 w-full">
          <Image
            src={image}
            alt={`${name} - ${category}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/menu/${id}`} className="text-xl font-semibold text-[#3C2A21] hover:underline">
            {name}
          </Link>
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
            onClick={handleAddToCart}
            className="bg-[#3C2A21] text-[#E5E5CB] text-sm px-4 py-2 rounded hover:bg-[#1A120B] transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeProductCard;