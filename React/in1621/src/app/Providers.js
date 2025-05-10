"use client";
import { SessionProvider } from "next-auth/react";


export const AuthProvider = ({Children}) => {
    return <SessionProvider>{Children}</SessionProvider>
}