import RegisterForm from "../../../components/auth/RegisterForm";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function Register() {
    const session = await getServerSession(authOptions as any);

    if (session) redirect("/account");

    return (
        <main>
            <RegisterForm />
        </main>
    );
}
