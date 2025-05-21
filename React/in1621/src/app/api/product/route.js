// app/api/products/route.js
export async function GET() {
  const products = [
    // Your product data here
  ];
  return Response.json(products);
}