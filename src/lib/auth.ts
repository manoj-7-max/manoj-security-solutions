
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                googleToken: { label: "Google Token", type: "text" }
            },
            async authorize(credentials) {
                await dbConnect();

                // --- GOOGLE AUTH FLOW ---
                if (credentials?.googleToken) {
                    let payload;

                    try {
                        if (process.env.GOOGLE_CLIENT_ID) {
                            const ticket = await client.verifyIdToken({
                                idToken: credentials.googleToken,
                                audience: process.env.GOOGLE_CLIENT_ID,
                            });
                            payload = ticket.getPayload();
                        } else {
                            // Legacy Manual Decode (Fallback)
                            const base64Url = credentials.googleToken.split('.')[1];
                            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                            }).join(''));
                            payload = JSON.parse(jsonPayload);
                        }
                    } catch (e) {
                        console.error("Google Token Verify Error", e);
                        return null;
                    }

                    if (!payload?.email) return null;

                    let user = await User.findOne({ email: payload.email });

                    if (!user) {
                        user = await User.create({
                            name: payload.name,
                            email: payload.email,
                            authType: "google",
                            googleId: payload.sub,
                            picture: payload.picture,
                            role: "user"
                        });
                    }

                    return {
                        id: user._id.toString(),
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        image: user.picture
                    };
                }

                // --- EMAIL/PASSWORD FLOW ---
                const email = credentials?.email;
                const password = credentials?.password;

                if (!email || !password) return null;

                // Hardcoded Admin
                if (email === 'manojr9043@gmail.com' && password === 'Manoj@007') {
                    return { id: 'admin-1', name: 'Manoj', email: 'manojr9043@gmail.com', role: 'admin' };
                }

                const user = await User.findOne({ email });

                if (!user) return null;
                // In production, use bcrypt.compare(password, user.password)
                if (user.password !== password) return null;

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    image: user.picture // Fix: Include image in session
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }

            // Support session updates from client-side
            if (trigger === "update" && session) {
                if (session.name) token.name = session.name;
                if (session.image) token.picture = session.image;
            }

            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role as string;
                session.user.id = token.id as string;
                // Ensure updates propagate to session
                if (token.name) session.user.name = token.name;
                if (token.picture) session.user.image = token.picture;
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
