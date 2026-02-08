
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { credential } = await req.json();

        // Verify Google Token (More Secure than legacy manual decode)
        // If client ID is missing, fallback to manual decode (Legacy behavior)
        let payload;
        if (process.env.GOOGLE_CLIENT_ID) {
            const ticket = await client.verifyIdToken({
                idToken: credential,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            payload = ticket.getPayload();
        } else {
            // Legacy Manual Decode (Insecure but matches old app without Client Secret)
            const base64Url = credential.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            payload = JSON.parse(jsonPayload);
        }

        if (!payload || !payload.email) {
            return NextResponse.json({ error: "Invalid Token" }, { status: 400 });
        }

        let user = await User.findOne({ email: payload.email });

        if (!user) {
            // Auto-Register via Google
            user = await User.create({
                name: payload.name,
                email: payload.email,
                authType: "google",
                googleId: payload.sub,
                picture: payload.picture,
                role: "user" // Default role
            });
        }

        // Return user info for client-side login
        // Note: NextAuth handles session, but since we are bypassing NextAuth for GSI,
        // we return user data. Ideally, we should create a NextAuth session here.
        // For now, let's return success and let client handle redirect.

        return NextResponse.json({ success: true, user });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
