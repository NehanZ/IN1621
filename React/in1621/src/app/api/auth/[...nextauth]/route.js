import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import  connectMongoDB  from "../../../../lib/mongodb";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";

export  const authOptions = {

    providers : [
        CredentialProvider({
            name : "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
              
            async authorize(credentials) {
                const { email, password } = credentials;
            
                try {
                    await connectMongoDB();
                    const user = await User.findOne({ email });
            
                    if (!user) {
                        throw new Error("user_not_found");
                    }
            
                    const isPasswordCorrect = await bcrypt.compare(password, user.password);
                    if (!isPasswordCorrect) {
                        throw new Error("invalid_password");
                    }
            
                    return {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.name || user.username || email.split("@")[0],
                    };
            
                } catch (error) {
                    console.error("Auth error:", error.message);
                    throw new Error(error.message);
                }
            }
            
        }),
    ],
    session : {
        strategy : "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages : {
        signIn : "/auth/login",
        // signOut : "/auth/signout",
        // error : "/auth/error",
        // verifyRequest : "/auth/verify-request",
        // newUser : null, // Will disable the new account creation screen
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };