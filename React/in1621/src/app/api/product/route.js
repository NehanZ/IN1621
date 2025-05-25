// app/api/products/route.js
/*export async function GET() {
  const products = [
    // Your product data here
  ];
  return Response.json(products);
}*/
import { NextResponse } from "next/server";

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

export async function GET(req) {
  

  return NextResponse.json(products);
}
