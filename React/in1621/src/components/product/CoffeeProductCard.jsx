'use client';

import Link from 'next/link';
import Image from 'next/image';

const CoffeeProductCard = ({ product }) => {
  const { _id, name, description, price, image, stock } = product;

  return (
    <div className="bg-[#D5CEA3] rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg hover:translate-y-[-5px]">
      <div className="relative h-48 w-full">
        <Image
          src={image || '/images/placeholder.png'}
          alt={`${name}`}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold text-[#3C2A21]">{name}</h3>
        <p className="text-[#1A120B] text-sm mb-4">{description}</p>
        <p className="text-lg font-bold text-[#3C2A21]">LKR {price}</p>
        <p className="text-sm text-[#3C2A21]">Stock: {stock}</p>
      </div>
    </div>
  );
};

export default CoffeeProductCard;