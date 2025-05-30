'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm({ onSuccess }) {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [error, setError] = useState(null);

    const router = useRouter();

    const handleError = (errorMessage) => {
        setError(errorMessage); 
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
        alert("Please fill in all fields.");
        return;
    }

    if (password !== confirmPassword) {
        setError("Passwords do not match.");
        alert("Passwords do not match.");
        return;
    }

    try {
        handleError(null);

        const responseUserExists = await fetch("/api/userexists", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        const { user } = await responseUserExists.json();
        if (user) {
            setError("Email already exists.");
            alert("Email already exists.");
            return;
        }

        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();
        console.log("Register response data:", data);


        if (response.ok && data.userId) {
            alert("User registered successfully.");

            // Clear all fields
            setUsername("");
            setEmail("");
            setPassword("");
            setconfirmPassword("");

            // Notify parent
            setTimeout(() => {
                onSuccess(data.userId);
            }, 300);

        } else {
            console.log("User registration failed.");
            handleError("User registration failed.");
        }

    } catch (error) {
        console.error("Error:", error);
        handleError("Registration failed. Please try again.");
    }
};



    return (
        <div className="flex flex-col items-center justify-center min-h-screen" style={{ backgroundColor: '#E5E5CB', marginTop: 0 }}>
            <h1 className="text-4xl font-bold mb-6" style={{ color: '#1A120B' }}>Register</h1>
            <div className="w- max-w-md rounded-lg shadow-md p-6" style={{ backgroundColor: '#D5CEA3' }}>
                <h2 className="text-lg mb-4 text-center" style={{ color: '#3C2A21' }}>
                    Enter your Email below to create an account.
                </h2>
                <form className="space-y-4 p-4"
                    onSubmit={handleSubmit} >
                    <input
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        placeholder="Username"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                        style={{
                            borderColor: '#3C2A21',
                            color: '#1A120B',
                            backgroundColor: '#D5CEA3',
                            // Removed invalid 'focus' property
                        }}
                        required
                    />
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                        style={{
                            borderColor: '#3C2A21',
                            color: '#1A120B',
                            backgroundColor: '#D5CEA3',
                            // focus: { ringColor: '#3C2A21' }
                        }}
                        required
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                        style={{
                            borderColor: '#3C2A21',
                            color: '#1A120B',
                            backgroundColor: '#D5CEA3',
                            // focus: { ringColor: '#3C2A21' }
                        }}
                        required
                    />
                    <input
                        onChange={(e) => setconfirmPassword(e.target.value)}
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                        style={{
                            borderColor: '#3C2A21',
                            color: '#1A120B',
                            backgroundColor: '#D5CEA3',
                            // focus: { ringColor: '#3C2A21' }
                        }}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full py-2 rounded-lg border-2 border-[#3C2A21] text-[#3C2A21] bg-transparent hover:bg-[#3C2A21] hover:text-[#E5E5CB] transition duration-200 cursor-pointer"
                    >
                        Register
                    </button>
                    <a href="/auth/login" className="text-sm" style={{ color: '#3C2A21' }}>
                        Already have an account? 
                        <span className="hover:underline hover:cursor-pointer">Login here.</span>
                    </a>
                </form>
            </div>
        </div>
    );
}
