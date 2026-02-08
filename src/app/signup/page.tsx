
"use client";

import { useState } from "react";
import { UserPlus, Eye, EyeOff } from "lucide-react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                body: JSON.stringify({ name, email, phone, password }),
                headers: { "Content-Type": "application/json" }
            });
            const data = await res.json();

            if (res.ok) {
                router.push("/login?signup=success");
            } else {
                setError(data.error || "Signup failed");
            }
        } catch (e) {
            setError("Network error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[linear-gradient(135deg,#0b0c10_0%,#1f2833_100%)]">
            <div className="w-full max-w-[400px] bg-[#1f2833] p-10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]">

                <h2 className="text-[#66fcf1] text-center text-2xl font-bold mb-8 flex items-center justify-center gap-2">
                    <UserPlus className="w-6 h-6" /> Sign Up
                </h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500 text-red-500 rounded text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label className="block mb-2 text-[#c5c6c7] font-medium text-sm">Full Name</label>
                        <input
                            type="text" required
                            value={name} onChange={e => setName(e.target.value)}
                            className="w-full p-3 bg-[#0b0c10] border border-[#45a29e] rounded-md text-white text-sm focus:outline-none focus:border-[#66fcf1]"
                        />
                    </div>

                    <div className="mb-5">
                        <label className="block mb-2 text-[#c5c6c7] font-medium text-sm">Email</label>
                        <input
                            type="email" required
                            value={email} onChange={e => setEmail(e.target.value)}
                            className="w-full p-3 bg-[#0b0c10] border border-[#45a29e] rounded-md text-white text-sm focus:outline-none focus:border-[#66fcf1]"
                        />
                    </div>

                    <div className="mb-5">
                        <label className="block mb-2 text-[#c5c6c7] font-medium text-sm">Phone Number</label>
                        <input
                            type="tel" required
                            value={phone} onChange={e => setPhone(e.target.value)}
                            className="w-full p-3 bg-[#0b0c10] border border-[#45a29e] rounded-md text-white text-sm focus:outline-none focus:border-[#66fcf1]"
                        />
                    </div>

                    <div className="mb-5">
                        <label className="block mb-2 text-[#c5c6c7] font-medium text-sm">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required minLength={6}
                                value={password} onChange={e => setPassword(e.target.value)}
                                className="w-full p-3 bg-[#0b0c10] border border-[#45a29e] rounded-md text-white text-sm focus:outline-none focus:border-[#66fcf1] pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 py-3 bg-[#66fcf1] text-[#0b0c10] font-bold rounded hover:bg-[#45a29e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

                <div className="text-center mt-6 space-y-2">
                    <p className="text-[#c5c6c7] text-sm">
                        Already have an account? <Link href="/login" className="text-[#66fcf1] hover:underline">Login</Link>
                    </p>
                    <Link href="/" className="block text-[#c5c6c7] text-sm hover:text-white transition-colors">← Back to Home</Link>
                </div>
            </div>
        </div>
    );
}
