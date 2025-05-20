import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectMongoDB from "../../../lib/mongodb";
import User from "../../../models/User";
import UserDetails from "../../../models/UserDetails";

// GET - Get user account details
export async function GET() {
    const session = await getServerSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await connectMongoDB();
        
        const user = await User.findOne({ email: session.user.email }).select("-password");
        const userDetails = await UserDetails.findOne({ userId: user._id });
        
        return NextResponse.json({ 
            user, 
            userDetails 
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 });
    }
}

// PUT - Update user details
export async function PUT(request) {
    const session = await getServerSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { firstname, lastname, mnumber, address } = await request.json();
        await connectMongoDB();
        
        const user = await User.findOne({ email: session.user.email });
        const updatedDetails = await UserDetails.findOneAndUpdate(
            { userId: user._id },
            { firstname, lastname, mnumber, address },
            { new: true, upsert: true }
        );
        
        return NextResponse.json({ 
            message: "User details updated", 
            details: updatedDetails 
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update user details" }, { status: 500 });
    }
}

// DELETE - Delete user account
export async function DELETE() {
    const session = await getServerSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await connectMongoDB();
        
        const user = await User.findOne({ email: session.user.email });
        await UserDetails.deleteOne({ userId: user._id });
        await User.deleteOne({ _id: user._id });
        
        return NextResponse.json({ message: "Account deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete account" }, { status: 500 });
    }
}