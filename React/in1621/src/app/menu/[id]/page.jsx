import { notFound } from 'next/navigation';
import Image from 'next/image';
import BackButton from '../../../components/BackButton';

const getProductDetails = async (id) => {
  // In a real app, you would fetch this from your database/API
  const products = [
    {
      id: 1,
      name: 'Classic Cappuccino',
      description: 'Perfect balance of espresso, steamed milk and silky foam',
      price: '350',
      image: '/images/cappuccino.jpg',
      category: 'coffee',
      details: 'Our signature cappuccino made with locally sourced coffee beans and organic milk. Served in a 8oz cup.',
      ingredients: 'Espresso, steamed milk, milk foam',
      options: ['Small', 'Medium', 'Large']
    },
    // ... other products
  ];

  return products.find(product => product.id === parseInt(id));
};

export default async function ProductDetails({ params }) {
  const product = await getProductDetails(params.id);
  
  if (!product) {
    return notFound();
  }

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
              />
            </div>
            
            <div className="p-6 md:w-1/2">
              <div className="flex justify-between items-start mb-2">
                <h1 className="text-2xl font-bold text-[#3C2A21]">{product.name}</h1>
                <span className="bg-[#3C2A21] text-[#E5E5CB] text-sm px-3 py-1 rounded-full">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </span>
              </div>
              
              <p className="text-lg font-semibold text-[#3C2A21] mb-4">LKR {product.price}</p>
              
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
                  <div className="flex flex-wrap gap-2">
                    {product.options.map(option => (
                      <span 
                        key={option}
                        className="bg-[#3C2A21] text-[#E5E5CB] px-3 py-1 rounded-full text-sm"
                      >
                        {option}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <button className="w-full bg-[#3C2A21] text-[#E5E5CB] py-3 rounded-lg hover:bg-[#1A120B] transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}