import User from "../../../models/User";
import connectMongoDB from "../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { firstname, lastname, mnumber, address} = await request.jason(); 

        console.log("Received data:", {firstname, lastname, mnumber, address});
        await connectMongoDB();

        await User.findByIdAndUpdate(userId, {
            firstname: fname,
            lastname: lname,
            mnumber: number,
            address: address,
            });
    } catch (error) {
        console.error("Error occurred:", error);
        return NextResponse.json({ error: "An error occurred while processing the request." }, { status: 500 });
    }
}  