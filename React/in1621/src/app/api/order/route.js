import connectMongoDB from "/src/lib/mongodb";
import { NextResponse } from "next/server";
import Order from "/src/models/Order";

export async function GET(request) {
  try {
    await connectMongoDB();

    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");
    const orderId = url.searchParams.get("orderId");

    let orders;
    
    // If orderId is provided, fetch single order
    if (orderId) {
      const order = await Order.findById(orderId).populate("items.product");
      
      if (!order) {
        return NextResponse.json(
          { error: "Order not found" },
          { status: 404 }
        );
      }
      
      return NextResponse.json({ order }, { status: 200 });
    }
    
    // Otherwise fetch all orders (with optional userId filter)
    if (userId) {
      orders = await Order.find({ userId }).populate("items.product");
    } else {
      orders = await Order.find().populate("items.product");
    }

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching orders." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
    try {
        const { userId, items, totalAmount, status, paymentDetails } = await request.json();

        console.log("Received Data: ", { userId, items, totalAmount, status, paymentDetails });

        await connectMongoDB();

        const newOrder = await Order.create({
            userId,
            items,
            totalAmount,
            status,
            paymentDetails
        });

        return NextResponse.json(
            { message: "Order details saved", orderId: newOrder._id },
            { status: 201 }
        );

    } catch (error) {
        console.error("Error occurred:", error);
        return NextResponse.json(
            { error: "An error occurred while processing the request." },
            { status: 500 }
        );
    }
}