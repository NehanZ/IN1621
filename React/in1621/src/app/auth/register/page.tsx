'use client';
import RegisterForm from "../../../components/auth/RegisterForm";
import UserDetailForm from "../../../components/info/UserDetailForm";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { useState } from "react";

export default async function Register() {
    const session = await getServerSession(authOptions as any);
    const [isRegistered, setIsRegistered] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);

    // if (session) redirect("/account");

    return (
        <main>
            {!isRegistered ? (
                <RegisterForm
                onSuccess={(newUserId: string) => {
                    setIsRegistered(true);
                    setUserId(newUserId);
                }}
                />
            ) : (
                <UserDetailForm userId={userId} />
            )}
        </main>
    );
}
