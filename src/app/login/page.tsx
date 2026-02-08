
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

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
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            {/* Background Decor */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-purple-500/20 rounded-full blur-[100px]" />
            </div>

            <div className="glass-panel w-full max-w-md p-8 relative z-10 border border-white/10 shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

                <div className="flex flex-col items-center mb-8">
                    <div className="p-4 bg-primary/10 rounded-full mb-4 ring-1 ring-primary/20">
                        <Shield className="w-12 h-12 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
                    <p className="text-gray-400">Manoj Security Solutions</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-sm text-center animate-in fade-in slide-in-from-top-2">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                        <input
                            type="email"
                            className="input-field"
                            placeholder="admin@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
                        <input
                            type="password"
                            className="input-field"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                    >
                        <span className="relative z-10">{loading ? "Signing In..." : "Sign In"}</span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </button>
                </form>
            </div>
        </div>
    );
}
