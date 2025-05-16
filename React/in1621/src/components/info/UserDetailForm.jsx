'use client';
import { set } from 'mongoose';
import React from 'react';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UserDetailForm({ userId }) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mnumber, setMnumber] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState(null);

    const router = useRouter();

    const handleError = (errorMessage) => {
        setError(errorMessage); 
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!firstName || !lastName || !mnumber || !address) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const response = await fetch("/api/userdetails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, firstName, lastName, mnumber, address }),
            });

            const data = await response.json();

            if (response.ok && data) {
                console.log("User details saved successfully:", data);
                alert("User details saved successfully.");
                router.push("/auth/login"); // Redirect to the home page or any other page
            } else {
                console.log("User details saving failed.");
                alert("User details saving failed.");
            }

        } catch (error) {
            console.error("Error in POST request:", error);
            setError("Internal Server Error");
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen" style={{ backgroundColor: '#E5E5CB', marginTop: 0 }}>
            <h1 className="text-4xl font-bold mb-6" style={{ color: '#1A120B' }}>User Details</h1>
            <div className="w- max-w-md rounded-lg shadow-md p-6" style={{ backgroundColor: '#D5CEA3' }}></div>
                <h2 className="text-lg mb-4 text-center" style={{ color: '#3C2A21' }}>
                    Enter your Details below to create an account.
                </h2>
                <form className="space-y-4 p-4" onSubmit={handleSubmit}>
                    <div className="flex flex-row gap-2.5">
                        <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                            onChange={(e) => setFirstName(e.target.value)}
                            type="text"
                            placeholder="First Name"
                            style={{
                                borderColor: '#3C2A21',
                                color: '#1A120B',
                                backgroundColor: '#D5CEA3',
                            }}
                            required
                        />
                        <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                            onChange={(e) => setLastName(e.target.value)}
                            type="text"
                            placeholder="Last Name"
                            style={{
                                borderColor: '#3C2A21',
                                color: '#1A120B',
                                backgroundColor: '#D5CEA3',
                            }}
                            required
                        />
                    </div>
                    <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                        onChange={(e) => setMnumber(e.target.value)}
                        onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key)) {
                                e.preventDefault();
                            }
                        }}
                        type="tel"
                        placeholder="Mobile Number"
                        pattern="[0-9]{10}"
                        style={{
                            borderColor: '#3C2A21',
                            color: '#1A120B',
                            backgroundColor: '#D5CEA3',
                        }}
                        required
                    />
                    <input className="w-full px-4 py-2 border mb-0 rounded-lg focus:outline-none focus:ring-2"
                        onChange={(e) => setAddress(e.target.value)}
                        type="address"
                        placeholder="Delivery Address"
                        style={{
                            borderColor: '#3C2A21',
                            color: '#1A120B',
                            backgroundColor: '#D5CEA3',
                        }}
                        required
                    />
                    <small className="text-shadow-amber-800">* We only deliver within a 3km radius from our shop.</small>
                    <button
                        type="submit"
                        className="w-full py-2 mt-3 rounded-lg border-2 border-[#3C2A21] text-[#3C2A21] bg-transparent hover:bg-[#3C2A21] hover:text-[#E5E5CB] transition duration-200 cursor-pointer"
                    >
                        Submit
                    </button>
                </form>
        </div>
    );
}
