import mongoose from 'mongoose';
import connectMongoDB from '/src/lib/mongodb';
import { NextResponse } from 'next/server';
import Order from '/src/models/Order';

export async function GET(request, { params }) {
  try {
    await connectMongoDB();

    const { orderId } = params;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return NextResponse.json(
        { error: "Invalid order ID format" },
        { status: 400 }
      );
    }

    const order = await Order.findById(orderId)
      .populate('items.product')
      .lean();

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    // Convert MongoDB ObjectId to string
    order._id = order._id.toString();
    
    // Convert items' product ObjectIds if they exist
    if (order.items && order.items.length > 0) {
      order.items = order.items.map(item => {
        if (item.product && item.product._id) {
          item.product._id = item.product._id.toString();
        }
        return item;
      });
    }

    return NextResponse.json(
      { order },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch order",
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}