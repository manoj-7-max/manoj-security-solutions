
"use client";

import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Shield, Eye, EyeOff } from "lucide-react";
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
            if (session.user.role === 'admin' || session.user.role === 'staff') {
                router.push("/admin/dashboard");
            } else {
                router.push("/");
            }
        }
    }, [status, session, router]);

    async function handleGoogleLogin(response: any) {
        setLoading(true);
        try {
            // Use NextAuth signIn with 'credentials' provider but passing 'googleToken'
            // This leverages the logic we just added to src/lib/auth.ts
            const res = await signIn("credentials", {
                googleToken: response.credential,
                redirect: false,
            });

            if (res?.error) {
                setError("Google Login Failed: " + res.error);
                setLoading(false);
            } else {
                // Success! Session is created. useEffect above will redirect.
                router.refresh();
            }
        } catch (e) {
            setError("Network Error during Google Login");
            setLoading(false);
        }
    }

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

    // Reload Google Button on mount
    useEffect(() => {
        if (window.google && document.getElementById("googleBtn")) {
            try {
                window.google.accounts.id.renderButton(
                    document.getElementById("googleBtn"),
                    { theme: "filled_black", size: "large", width: "100%" }
                );
            } catch (e) { console.error(e); }
        }
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[linear-gradient(135deg,#0b0c10_0%,#1f2833_100%)]">
            <Script src="https://accounts.google.com/gsi/client" strategy="lazyOnload" onLoad={() => {
                if (window.google) {
                    window.google.accounts.id.initialize({
                        client_id: "751943963320-torfec4702u6pt9q7u7gk9rmqpa40ja6.apps.googleusercontent.com",
                        callback: handleGoogleLogin
                    });
                    const btn = document.getElementById("googleBtn");
                    if (btn) {
                        window.google.accounts.id.renderButton(btn, { theme: "filled_black", size: "large", width: "100%" });
                    }
                }
            }} />

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
                        <div className="text-right mt-2">
                            <Link href="/forgot-password" className="text-sm text-[#c5c6c7] hover:text-[#66fcf1] transition-colors">Forgot Password?</Link>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-[#66fcf1] text-[#0b0c10] font-bold rounded hover:bg-[#45a29e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="flex items-center my-6">
                    <div className="flex-1 h-px bg-[#45a29e] opacity-30"></div>
                    <span className="px-3 text-[#c5c6c7] text-sm">OR</span>
                    <div className="flex-1 h-px bg-[#45a29e] opacity-30"></div>
                </div>

                <div id="googleBtn" className="w-full flex justify-center h-[50px]"></div>

                <div className="text-center mt-6 space-y-2">
                    <p className="text-[#c5c6c7] text-sm">
                        Don't have an account? <Link href="/signup" className="text-[#66fcf1] hover:underline">Sign Up</Link>
                    </p>
                    <Link href="/" className="block text-[#c5c6c7] text-sm hover:text-white transition-colors">← Back to Home</Link>
                </div>
            </div>
        </div>
    );
}
