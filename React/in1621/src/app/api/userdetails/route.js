import connectMongoDB from "../../../lib/mongodb";
import { NextResponse } from "next/server";
import UserDetails from "../../../models/UserDetails";

export async function POST(request) {
  try {
    const { userId, firstname, lastname, mnumber, address } = await request.json();

    console.log("Received data:", { userId, firstname, lastname, mnumber, address });

    await connectMongoDB();

    const newDetail = await UserDetails.create({
      userId,
      firstname,
      lastname,
      mnumber,
      address,
    });

    return NextResponse.json({ message: "User details saved", detailId: newDetail._id }, { status: 201 });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({ error: "An error occurred while processing the request." }, { status: 500 });
  }
}
