"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";
import { auth } from "@/lib/firebase";

declare global {
    interface Window {
        recaptchaVerifier: any;
    }
}

export default function PhoneLogin() {
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Initialize Recaptcha
        if (!window.recaptchaVerifier && auth) {
            try {
                window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                    'size': 'invisible',
                    'callback': () => { },
                    'expired-callback': () => toast.error("Recaptcha expired")
                });
            } catch (e) {
                console.error("Recaptcha Error:", e);
            }
        }
    }, []);

    async function handleSendOtp(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        // Format phone to E.164 (e.g. +919876543210)
        let formattedPhone = phone;
        if (!phone.startsWith("+")) {
            formattedPhone = "+91" + phone; // Default to India
        }

        try {
            if (!window.recaptchaVerifier) throw new Error("Recaptcha not initialized. Check config.");

            const confirmation = await signInWithPhoneNumber(auth, formattedPhone, window.recaptchaVerifier);
            setConfirmationResult(confirmation);
            toast.success("OTP Sent via SMS!");
            setStep(2);
        } catch (error: any) {
            console.error(error);
            if (error.code === 'auth/invalid-phone-number') {
                toast.error("Invalid phone number format.");
            } else if (error.code === 'auth/missing-client-identifier') {
                toast.error("Firebase Config Missing. Check src/lib/firebase.ts");
            } else {
                toast.error("Failed to send SMS: " + error.message);
            }
        }
        setLoading(false);
    }

    async function handleVerifyOtp(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        try {
            if (!confirmationResult) throw new Error("No OTP session found");

            // Verify OTP with Firebase
            const result = await confirmationResult.confirm(otp);
            const user = result.user;
            const idToken = await user.getIdToken();

            // Sign in to NextAuth using the ID Token
            const signInRes = await signIn("credentials", {
                redirect: false,
                isOtpLogin: 'true',
                idToken: idToken, // Send token for validation
                phone: user.phoneNumber
            });

            if (signInRes?.error) {
                toast.error(signInRes.error);
            } else {
                toast.success("Logged in successfully!");
                router.push("/admin/dashboard");
                router.refresh();
            }

        } catch (error: any) {
            toast.error("Invalid OTP or Verification Failed");
            console.error(error);
        }
        setLoading(false);
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-card rounded-xl shadow-lg border border-border">
            <h2 className="text-2xl font-bold mb-4 text-center">Mobile Login</h2>

            <div id="recaptcha-container"></div>

            {step === 1 ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Phone Number</label>
                        <input
                            type="tel"
                            className="input-field w-full"
                            placeholder="e.g. 9876543210"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <button disabled={loading} className="btn-primary w-full py-2">
                        {loading ? "Sending..." : "Send OTP"}
                    </button>
                    {!auth.currentUser && (
                        <p className="text-xs text-center text-red-400 mt-2">
                            * Requires Valid Firebase Config in src/lib/firebase.ts
                        </p>
                    )}
                </form>
            ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Enter OTP</label>
                        <input
                            type="text"
                            className="input-field w-full text-center tracking-widest text-xl"
                            placeholder="XXXXXX"
                            maxLength={6}
                            value={otp}
                            onChange={e => setOtp(e.target.value)}
                            required
                        />
                    </div>
                    <button disabled={loading} className="btn-primary w-full py-2">
                        {loading ? "Verifying..." : "Verify & Login"}
                    </button>
                    <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-sm text-primary w-full text-center mt-2 hover:underline"
                    >
                        Change Number
                    </button>
                </form>
            )}
        </div>
    );
}
