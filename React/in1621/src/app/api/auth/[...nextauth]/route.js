import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import  connectMongoDB  from "../../../../lib/mongodb";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";


export  const authOptions = {
    providers : [
        CredentialProvider({
            name : "Credentials",
            credentials : {},

            async authorize(credentials) {
                const { email, password } = credentials;
                
                try {
                    await connectMongoDB();
                    const user = await User.findOne({ email});

                    if(!user) {
                       console.log("User not found");
                        return null;
                    }

                    const isPasswordCorrect = await bcrypt.compare(password, user.password);
                    if(!isPasswordCorrect) {
                       console.log("Invalid password");
                        return null;
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.name || user.username || email.split("@")[0]
                      };

                } catch (error) {
                    console.error("Error in authorize:", error);
                    return null;
                }
            }
        }),
    ],
    session : {
        strategy : "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages : {
        signIn : "/auth/signin",
        // signOut : "/auth/signout",
        // error : "/auth/error",
        // verifyRequest : "/auth/verify-request",
        // newUser : null, // Will disable the new account creation screen
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };