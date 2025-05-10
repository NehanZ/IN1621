'use client';
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function AccountDetails() {

    const { data: session } = useSession();

    if (!session) {
        if (typeof window !== "undefined") {
            window.location.href = "/auth/login";
        }
        return null;
    }

    return (
        <div className="flex flex-col place-items-center h-screen justify-center">
            <h1 className="text-2xl font-bold text-center ">My Account</h1>
            <div className="shadow-lg p-8 bg-zince-300/10 flex flex-col gap-2 my-6 rounded-lg">
                <div className="mb-2">
                    Name : <span className="font-bold">{session?.user?.username}</span>
                </div>
                <div className="mb-2">
                    Email : <span className="font-bold">{session?.user?.email}</span>
                </div>
                <button
                    onClick={() => signOut()}
                    type="submit"
                    className="w-full py-2 rounded-lg border-2 border-[#3C2A21] text-[#3C2A21] bg-transparent hover:bg-[#3C2A21] hover:text-[#E5E5CB] transition duration-200 cursor-pointer"
                    >
                    LogOut
                </button>
            </div>
        </div>
    );
}