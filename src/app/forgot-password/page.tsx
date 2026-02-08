
"use client";

import { useState } from "react";
import { ArrowLeft, Send, CheckCircle, Key } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
    const router = useRouter();
    const [step, setStep] = useState(1); // 1 = Email, 2 = OTP & New Password
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function handleSendOtp(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                body: JSON.stringify({ email }),
                headers: { "Content-Type": "application/json" }
            });
            const data = await res.json();

            if (res.ok) {
                setStep(2);
                // Check logs if using mock email
                if (data.message && data.message.includes("Mock")) {
                    alert("Dev Mode: Check server logs for OTP");
                }
            } else {
                setError(data.error || "Failed to send OTP");
            }
        } catch (err) {
            setError("Network error");
        } finally {
            setLoading(false);
        }
    }

    async function handleResetPassword(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                body: JSON.stringify({ email, otp, password: newPassword }),
                headers: { "Content-Type": "application/json" }
            });
            const data = await res.json();

            if (res.ok) {
                setSuccess("Password reset successfully! Redirecting...");
                setTimeout(() => router.push("/login"), 2000);
            } else {
                setError(data.error || "Reset failed");
            }
        } catch (err) {
            setError("Network error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[linear-gradient(135deg,#0b0c10_0%,#1f2833_100%)]">
            <div className="w-full max-w-[400px] bg-[#1f2833] p-10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]">

                <h2 className="text-[#66fcf1] text-center text-2xl font-bold mb-4">
                    {step === 1 ? "Reset Password" : "Verify & Reset"}
                </h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500 text-red-500 rounded text-sm text-center">
                        {error}
                    </div>
                )}

                {success ? (
                    <div className="text-center">
                        <div className="bg-green-500/10 text-green-400 p-4 rounded mb-6 border border-green-500/20 flex flex-col items-center gap-2">
                            <CheckCircle className="w-8 h-8" />
                            {success}
                        </div>
                    </div>
                ) : (
                    <>
                        {step === 1 ? (
                            <form onSubmit={handleSendOtp}>
                                <p className="text-[#c5c6c7] text-center mb-6 text-sm">Enter your email to receive a One-Time Password (OTP).</p>
                                <div className="mb-6">
                                    <label className="block mb-2 text-[#c5c6c7] font-medium text-sm">Email Address</label>
                                    <input
                                        type="email" required
                                        value={email} onChange={e => setEmail(e.target.value)}
                                        className="w-full p-3 bg-[#0b0c10] border border-[#45a29e] rounded-md text-white text-sm focus:outline-none focus:border-[#66fcf1]"
                                    />
                                </div>
                                <button disabled={loading} className="w-full py-3 bg-[#66fcf1] text-[#0b0c10] font-bold rounded hover:bg-[#45a29e] transition-colors flex items-center justify-center gap-2">
                                    {loading ? "Sending..." : <><Send className="w-4 h-4" /> Send OTP</>}
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleResetPassword}>
                                <p className="text-[#c5c6c7] text-center mb-6 text-sm">Enter the OTP sent to <b>{email}</b> and set a new password.</p>

                                <div className="mb-4">
                                    <label className="block mb-2 text-[#c5c6c7] font-medium text-sm">Enter OTP</label>
                                    <input
                                        type="text" required maxLength={6}
                                        value={otp} onChange={e => setOtp(e.target.value)}
                                        className="w-full p-3 bg-[#0b0c10] border border-[#45a29e] rounded-md text-white text-sm focus:outline-none focus:border-[#66fcf1] tracking-widest text-center text-lg"
                                        placeholder="******"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block mb-2 text-[#c5c6c7] font-medium text-sm">New Password</label>
                                    <input
                                        type="password" required minLength={6}
                                        value={newPassword} onChange={e => setNewPassword(e.target.value)}
                                        className="w-full p-3 bg-[#0b0c10] border border-[#45a29e] rounded-md text-white text-sm focus:outline-none focus:border-[#66fcf1]"
                                    />
                                </div>

                                <button disabled={loading} className="w-full py-3 bg-[#66fcf1] text-[#0b0c10] font-bold rounded hover:bg-[#45a29e] transition-colors flex items-center justify-center gap-2">
                                    {loading ? "Resetting..." : <><Key className="w-4 h-4" /> Reset Password</>}
                                </button>

                                <div className="text-center mt-4">
                                    <button type="button" onClick={() => setStep(1)} className="text-[#c5c6c7] text-xs underline">
                                        Resend OTP / Change Email
                                    </button>
                                </div>
                            </form>
                        )}
                    </>
                )}

                {!success && (
                    <div className="text-center mt-6">
                        <Link href="/login" className="text-[#c5c6c7] text-sm hover:text-white transition-colors flex items-center justify-center gap-2">
                            <ArrowLeft className="w-4 h-4" /> Back to Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
