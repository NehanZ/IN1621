import mongoose from 'mongoose';
import connectMongoDB from '/src/lib/mongodb';
import { NextResponse } from 'next/server';
import Order from '/src/models/Order';

export async function POST(request) {
  try {
    // Connect to DB
    await connectMongoDB();

    // Parse JSON body
    const { userId, items, totalAmount, status, paymentDetails, deliveryInfo } = await request.json();

    // Validate required fields
    if (!userId || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields: userId, items" },
        { status: 400 }
      );
    }

    // Helper function to safely create ObjectId
    const createObjectId = (id) => {
      if (!id) return null;
      
      // If it's already an ObjectId, return as is
      if (mongoose.Types.ObjectId.isValid(id) && typeof id === 'object') {
        return id;
      }
      
      // If it's a valid ObjectId string (24 characters, hexadecimal)
      if (typeof id === 'string' && /^[0-9a-fA-F]{24}$/.test(id)) {
        return new mongoose.Types.ObjectId(id);
      }
      
      return null;
    };

    // Sanitize items to ensure product is an ObjectId
    const sanitizedItems = items.map((item, index) => {
      // Handle both item.product and item.id for flexibility
      const productIdValue = item.product || item.id;
      const productId = createObjectId(productIdValue);
      
      if (!productId) {
        throw new Error(`Invalid product ID at item ${index}: "${productIdValue}". Expected a 24-character hex string.`);
      }

      return {
        product: productId,
        quantity: Number(item.quantity) || 1,
        name: item.name || undefined,
        price: Number(item.price) || undefined,
        option: item.option || null
      };
    });

    // Handle userId - can be ObjectId or email string
    let finalUserId;
    if (mongoose.Types.ObjectId.isValid(userId) && /^[0-9a-fA-F]{24}$/.test(userId)) {
      finalUserId = new mongoose.Types.ObjectId(userId);
    } else {
      // Treat as email or string identifier
      finalUserId = userId;
      console.log(`Using email as userId: ${userId}`);
    }

    // Create new order document
    const newOrder = await Order.create({
      userId: finalUserId,
      items: sanitizedItems,
      totalAmount: Number(totalAmount),
      status: (status || 'pending').toLowerCase(), // Ensure lowercase
      paymentDetails: {
        ...paymentDetails,
        amount: Number(paymentDetails?.amount || totalAmount),
        deliveryFee: Number(paymentDetails?.deliveryFee || 0),
        subtotal: Number(paymentDetails?.subtotal || 0),
      },
      deliveryInfo
    });

    console.log('Order created successfully:', newOrder._id);

    return NextResponse.json(
      { 
        message: "Order created successfully", 
        orderId: newOrder._id.toString(),
        success: true 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error occurred:", error);
    
    // Provide more specific error messages
    let errorMessage = "An error occurred while processing the request.";
    
    if (error.message.includes('Invalid product ID')) {
      errorMessage = error.message;
    } else if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      errorMessage = "Validation failed: " + validationErrors.join(', ');
    } else if (error.name === 'CastError') {
      errorMessage = "Invalid ID format provided.";
    } else if (error.code === 11000) {
      errorMessage = "Duplicate entry detected.";
    }

    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
        success: false
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    // Connect to DB
    await connectMongoDB();

    // Get URL and search params
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    const userId = searchParams.get('userId');

    if (orderId) {
      // Fetch specific order by ID
      let order;
      
      // Try to find by ObjectId first
      if (mongoose.Types.ObjectId.isValid(orderId) && /^[0-9a-fA-F]{24}$/.test(orderId)) {
        order = await Order.findById(orderId).populate('items.product').lean();
      }
      
      if (!order) {
        return NextResponse.json(
          { error: "Order not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({ order, success: true });
    }

    // Fetch all orders or orders by userId
    let query = {};
    if (userId) {
      // Handle both ObjectId and email string for userId
      if (mongoose.Types.ObjectId.isValid(userId) && /^[0-9a-fA-F]{24}$/.test(userId)) {
        query.userId = new mongoose.Types.ObjectId(userId);
      } else {
        query.userId = userId; // Treat as email or string
      }
    }

    const orders = await Order.find(query)
      .populate('items.product')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ orders, success: true });

  } catch (error) {
    console.error("Error fetching orders:", error);
    
    let errorMessage = "An error occurred while fetching orders.";
    
    if (error.name === 'CastError') {
      errorMessage = "Invalid ID format provided.";
    }

    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
        success: false
      },
      { status: 500 }
    );
  }
}