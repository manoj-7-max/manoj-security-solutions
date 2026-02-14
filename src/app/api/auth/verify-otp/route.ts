
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { SignJWT } from "jose";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const { phone, otp } = await req.json();

        if (!phone || !otp) {
            return NextResponse.json({ error: "Phone and OTP are required" }, { status: 400 });
        }

        const user = await User.findOne({ phone });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        if (user.resetOtp !== otp || user.resetOtpExpires < Date.now()) {
            return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
        }

        // Clear OTP
        user.resetOtp = undefined;
        user.resetOtpExpires = undefined;
        await user.save();

        // Normally NextAuth handles session, but for custom auth we might return a token or user object
        // Since we are using NextAuth, we ideally want to sign them in via Credentials provider.
        // However, standard NextAuth flow is client-side.
        // This API is for verification. The client will call signIn('credentials') after this succeeds?
        // Actually, let's make this return success so client can proceed.

        return NextResponse.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone
            }
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
