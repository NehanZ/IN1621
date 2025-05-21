import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectMongoDB from "../../../lib/mongodb";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

export async function POST(request) {
    const session = await getServerSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { currentPassword, newPassword } = await request.json();
        await connectMongoDB();
        
        const user = await User.findOne({ email: session.user.email });
        
        // Verify current password
        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
        }
        
        // Hash new password and update
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        
        return NextResponse.json({ message: "Password updated successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to change password" }, { status: 500 });
    }
}