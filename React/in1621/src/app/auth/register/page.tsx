'use client';
import RegisterForm from "../../../components/auth/RegisterForm";
import UserDetailForm from "../../../components/info/UserdetailForm";
import Header from "../../../components/header-footer/Header";
import Footer from "../../../components/header-footer/Footer";
import { useState, useEffect } from "react";
import { useSession, SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Register() {
    return (
        <SessionProvider>
            <RegisterContent />
        </SessionProvider>
    );
}

function RegisterContent() {
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
            < Header />
            {!isRegistered ? (
                < RegisterForm
                    onSuccess={(newUserId: string) => {
                        setIsRegistered(true);
                        setUserId(newUserId);
                    }}
                />
            ) : (
                < UserDetailForm userId={userId} />
            )}
            < Footer />
        </main>
    );
}
