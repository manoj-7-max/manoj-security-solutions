
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Simple in-memory store. For production scalability, use Redis or Database.
const otpStore = new Map<string, { otp: string; expires: number }>();
// Exporting store so reset-password route can hopefully access it if in same bundle? 
// No, separate route handlers might not share scope in Next.js App Router (each request is isolated).
// We should use a global variable or external store.
// Let's try global for now, but really we should save to DB.

// To enable sharing, let's attach to global if needed, or better: SAVE TO DB (User model).
// We added resetOtp to User model in Step 2332! Let's use THAT!
// Much more reliable.

export async function POST(req: Request) {
    try {
        const { email } = await req.json();
        await dbConnect();
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "Email not found" }, { status: 404 });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Save OTP to Database (Persistent & Reliable)
        user.resetOtp = otp;
        user.resetOtpExpires = Date.now() + 600000; // 10 mins
        await user.save();

        console.log(`[AUTH] Generated OTP for ${email}: ${otp}`);

        const hasCreds = (process.env.SMTP_USER && process.env.SMTP_PASS) ||
            (process.env.EMAIL_USER && process.env.EMAIL_PASS);

        if (!hasCreds) {
            console.log(`[MOCK EMAIL] To: ${email}, OTP: ${otp}`);
            return NextResponse.json({ success: true, message: "Mock email sent (Check logs)" });
        }

        // Configure Nodemailer (Resend/Gmail compatible)
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
            subject: "Password Reset OTP - Manoj Security Solutions",
            text: `Your OTP is: ${otp}\n\nValid for 10 minutes.`,
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Forgot Password Error:", error);
        return NextResponse.json({ error: "Failed to send email: " + error.message }, { status: 500 });
    }
}
