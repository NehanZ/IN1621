import { NextResponse } from 'next/server';
import connectMongoDB from '../../../lib/mongodb';
import Product from '../../../models/Product';

export async function GET() {
  try {
    await connectMongoDB();
    const products = await Product.find({});
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ message: 'An error occurred while fetching products.' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectMongoDB();
    const body = await request.json();
    const { name, description, price, category, stock, image } = body;

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      image,
    });

    await newProduct.save();
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json({ message: 'An error occurred while adding the product.' }, { status: 500 });
  }
}