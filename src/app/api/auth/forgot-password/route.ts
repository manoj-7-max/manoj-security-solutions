
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();
        await dbConnect();

        console.log(`[Forgot Password] Request for: ${email}`);

        const user = await User.findOne({ email });

        if (!user) {
            console.log(`[Forgot Password] Email not found: ${email}`);
            return NextResponse.json({ error: "Email not found" }, { status: 404 });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Save OTP to DB
        user.resetOtp = otp;
        user.resetOtpExpires = Date.now() + 600000; // 10 mins
        await user.save();

        console.log(`[AUTH] Generated OTP for ${email}: ${otp}`);

        // Check credentials
        const hasUser = process.env.SMTP_USER || process.env.EMAIL_USER;
        const hasPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;

        if (!hasUser || !hasPass) {
            console.log(`[MOCK EMAIL] OTP: ${otp}`);
            // RETURN OTP IN RESPONSE FOR DEBUGGING ONLY
            return NextResponse.json({
                success: true,
                message: "Mock Mode: See Console/Alert",
                debugOtp: otp
            });
        }

        // Configure Nodemailer
        try {
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST || "smtp.gmail.com",
                port: parseInt(process.env.SMTP_PORT || "587"),
                secure: process.env.SMTP_SECURE === "true",
                auth: {
                    user: process.env.SMTP_USER || process.env.EMAIL_USER,
                    pass: process.env.SMTP_PASS || process.env.EMAIL_PASS,
                },
            });

            await transporter.sendMail({
                from: process.env.EMAIL_USER || "auth@manojsecurity.com",
                to: email,
                subject: "Password Reset OTP",
                text: `Your OTP is: ${otp}`,
            });

            return NextResponse.json({ success: true });

        } catch (emailError: any) {
            console.error("Email Send Failed:", emailError);
            // Fallback: Return OTP to user if email fails (Emergency Access)
            return NextResponse.json({
                success: true,
                message: "Email failed, here is your OTP (Dev Mode)",
                debugOtp: otp
            });
        }

    } catch (error: any) {
        console.error("Forgot Password Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
