
"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { User, LogOut, LayoutDashboard } from "lucide-react";
import { useState } from "react";

export default function NavbarAuth() {
    const { data: session, status } = useSession();
    const [isOpen, setIsOpen] = useState(false);

    if (status === "loading") {
        return <div className="h-10 w-24 bg-secondary animate-pulse rounded-md"></div>;
    }

    if (status === "authenticated") {
        return (
            <div className="relative z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 text-foreground hover:text-primary transition-colors focus:outline-none bg-secondary hover:bg-secondary/80 px-3 py-1.5 rounded-full border border-border"
                >
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary overflow-hidden">
                        {session?.user?.image ? (
                            <img src={session.user.image} alt="User" className="w-full h-full object-cover" />
                        ) : (
                            <User className="w-4 h-4" />
                        )}
                    </div>
                    <span className="hidden md:inline font-medium text-sm pr-1">{session?.user?.name || "Member"}</span>
                </button>

                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-40 cursor-default" onClick={() => setIsOpen(false)} />
                        <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-xl shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 overflow-hidden">
                            <div className="px-4 py-3 border-b border-border bg-secondary/30">
                                <p className="text-foreground text-sm font-bold truncate">{session?.user?.name}</p>
                                <p className="text-muted-foreground text-xs truncate">{session?.user?.email}</p>
                                <p className="text-primary text-[10px] uppercase font-bold mt-1 tracking-wider">{session?.user?.role || 'User'}</p>
                            </div>

                            {(session?.user?.role === 'admin' || session?.user?.role === 'staff') && (
                                <Link
                                    href="/admin/dashboard"
                                    className="flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <LayoutDashboard className="w-4 h-4" />
                                    <span>Admin Dashboard</span>
                                </Link>
                            )}

                            <Link
                                href="/profile"
                                className="flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors border-t border-border"
                                onClick={() => setIsOpen(false)}
                            >
                                <User className="w-4 h-4" />
                                <span>My Profile</span>
                            </Link>

                            <Link
                                href="/profile"
                                className="flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                <Calendar className="w-4 h-4" />
                                <span>My Bookings</span>
                            </Link>

                            <button
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className="w-full text-left flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors border-t border-border"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Sign Out</span>
                            </button>
                        </div>
                    </>
                )}
            </div>
        );
    }

    return (
        <Link
            href="/login"
            className="btn-primary text-sm px-6 py-2 shadow-sm"
        >
            Login
        </Link>
    );
}
