
"use client";

import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Shield, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from 'next/link';
import Script from "next/script";

declare global {
    interface Window {
        google: any;
    }
}

export default function LoginPage() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            router.push(session.user.role === 'admin' || session.user.role === 'staff' ? "/admin/dashboard" : "/");
        }
    }, [status, session, router]);

    // Handle Google Login Callback
    async function handleGoogleLogin(response: any) {
        setLoading(true);
        try {
            const res = await signIn("credentials", {
                googleToken: response.credential,
                redirect: false,
            });

            if (res?.error) {
                setError("Google Login Failed: " + res.error);
                setLoading(false);
            } else {
                router.refresh();
            }
        } catch (e) {
            setError("Network Error during Google Login");
            setLoading(false);
        }
    }

    // Initialize Google Button
    useEffect(() => {
        if (window.google && document.getElementById("googleBtn")) {
            try {
                window.google.accounts.id.renderButton(
                    document.getElementById("googleBtn"),
                    { theme: "outline", size: "large", width: "100%", text: "continue_with" }
                );
            } catch (e) { console.error(e); }
        }
    }, [loading]); // Re-render if loading state changes to ensure button stays

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
                router.refresh();
            }
        } catch (error) {
            setError("An error occurred");
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
            <Script src="https://accounts.google.com/gsi/client" strategy="lazyOnload" onLoad={() => {
                if (window.google) {
                    window.google.accounts.id.initialize({
                        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "751943963320-torfec4702u6pt9q7u7gk9rmqpa40ja6.apps.googleusercontent.com",
                        callback: handleGoogleLogin
                    });
                    const btn = document.getElementById("googleBtn");
                    if (btn) {
                        window.google.accounts.id.renderButton(btn, { theme: "outline", size: "large", width: "100%", text: "continue_with" });
                    }
                }
            }} />

            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600 text-white mb-4 shadow-lg shadow-blue-500/30">
                        <Shield className="w-6 h-6" />
                    </Link>
                    <h2 className="text-2xl font-bold text-slate-800">Welcome Back</h2>
                    <p className="text-slate-500 mt-2">Sign in to manage your security</p>
                </div>

                {error && (
                    <div className="mb-6 p-3 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm flex items-center justify-center text-center">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    {/* Google Login Button Container */}
                    <div id="googleBtn" className="w-full flex justify-center h-[44px]"></div>

                    <div className="relative flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-slate-400 font-medium">Or continue with</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-400"
                                placeholder="name@example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 flex justify-between">
                                Password
                                <Link href="/forgot-password" className="text-blue-600 hover:text-blue-700 text-xs font-semibold">Forgot password?</Link>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all pr-10 placeholder:text-slate-400"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>
                </div>

                <div className="mt-8 text-center text-sm">
                    <p className="text-slate-500">
                        Don't have an account? <Link href="/signup" className="text-blue-600 font-bold hover:text-blue-700">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
