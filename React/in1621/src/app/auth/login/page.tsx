'use client';
import LogInForm from "../../../components/auth/LogInForm"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Header from "../../../components/header-footer/Header";
import Footer from "../../../components/header-footer/Footer";

export default function LogIn() {
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
            < LogInForm />
            < Footer />
        </main>
    );
}
  