
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { email, otp, password } = await req.json();

        await dbConnect();
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "Email not found" }, { status: 404 });
        }

        // Verify OTP from Database (Robust)
        if (!user.resetOtp || user.resetOtp !== otp) {
            return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
        }

        if (user.resetOtpExpires < Date.now()) {
            return NextResponse.json({ error: "OTP Expired" }, { status: 400 });
        }

        // OTP Verified, Upadate Password
        user.password = password; // In production this should be hashed (bcrypt)
        user.resetOtp = undefined;
        user.resetOtpExpires = undefined;
        await user.save();

        return NextResponse.json({ success: true, message: "Password updated successfully" });
    } catch (error: any) {
        console.error("Reset Password Error:", error);
        return NextResponse.json({ error: "Failed to reset password: " + error.message }, { status: 500 });
    }
}
