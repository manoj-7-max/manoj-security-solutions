
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError("Invalid email or password");
                setLoading(false);
            } else {
                router.push("/admin/dashboard");
                router.refresh();
            }
        } catch (error) {
            setError("An error occurred");
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[linear-gradient(135deg,#0b0c10_0%,#1f2833_100%)]">
            <div className="w-full max-w-[400px] bg-[#1f2833] p-10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]">

                <h2 className="text-[#66fcf1] text-center text-2xl font-bold mb-8 flex items-center justify-center gap-2">
                    <Shield className="w-6 h-6" /> Login
                </h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500 text-red-500 rounded text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label className="block mb-2 text-[#c5c6c7] font-medium text-sm">Email or Username</label>
                        <input
                            type="text"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 bg-[#0b0c10] border border-[#45a29e] rounded-md text-white text-sm focus:outline-none focus:border-[#66fcf1]"
                        />
                    </div>

                    <div className="mb-5">
                        <label className="block mb-2 text-[#c5c6c7] font-medium text-sm">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="text-center mt-6">
                    <a href="/" className="text-[#c5c6c7] text-sm hover:text-white transition-colors">← Back to Home</a>
                </div>
            </div>
        </div>
    );
}
