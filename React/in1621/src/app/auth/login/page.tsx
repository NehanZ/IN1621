'use client';
import LogInForm from "../../../components/auth/LogInForm"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

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
            <LogInForm />
        </main>
    );
}
  