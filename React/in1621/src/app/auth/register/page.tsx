'use client';
import RegisterForm from "../../../components/auth/RegisterForm";
import UserDetailForm from "../../../components/info/UserdetailForm";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Register() {
    const [isRegistered, setIsRegistered] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session) {
            router.replace("/account");
        }
    }, [session, router]);

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
