
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await dbConnect();

                const email = credentials?.email;
                const password = credentials?.password;

                if (!email || !password) {
                    return null;
                }

                // Hardcoded Admin
                if (email === 'manojr9043@gmail.com' && password === 'Manoj@007') {
                    return { id: 'admin-1', name: 'Manoj', email: 'manojr9043@gmail.com', role: 'admin' };
                }

                // Staff Seed Check (Manual Seed check for 'staff')
                if (email === 'staff@manojsecurity.com' && password === 'staff123') {
                    // Check DB too? If seeded.
                    // Let's rely on DB lookup below which should find seeded staff.
                }

                const user = await User.findOne({ email });

                if (!user) {
                    return null;
                }

                if (user.password !== password) {
                    return null;
                }

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role;
                session.user.id = token.id;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login',
        error: '/login',
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
