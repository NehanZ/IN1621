import User from "../../../models/User";
import connectMongoDB from "../../../lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";


export async function POST(request) {
    try{
        const { username, email, password } = await request.json();

        console.log("Received data:", { username, email, password });
        const hashPassword = await bcrypt.hash(password, 10);
        await connectMongoDB();
        await User.create({ username, email, password: hashPassword });

        return NextResponse.json({ message: "User Registered" }, { status: 201 });

    }catch (error) {
        console.error("Error in POST request:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}