
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const { phone } = await req.json();

        if (!phone) {
            return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
        }

        // Generate a 4-digit OTP
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        const otpExpires = Date.now() + 5 * 60 * 1000; // 5 mins

        let user = await User.findOne({ phone });

        if (!user) {
            // Create user if not exists
            user = await User.create({
                phone,
                name: "New User",
                role: "user",
                authType: "phone",
                resetOtp: otp,
                resetOtpExpires: otpExpires
            });
        } else {
            // Update exist user
            user.resetOtp = otp;
            user.resetOtpExpires = otpExpires;
            await user.save();
        }

        console.log(`[DEV OTP] For ${phone}: ${otp}`);

        // In production, integrate SMS provider here (e.g., Twilio, Firebase)
        return NextResponse.json({ success: true, message: "OTP sent successfully" });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
