'use client';
import LogInForm from "../../../components/auth/LogInForm"
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function LogIn() {

    const session = await getServerSession(authOptions as any);
    if ( session ) redirect("\account");

    return (
        <main>
         <LogInForm />
        </main>
    );
     
}
  