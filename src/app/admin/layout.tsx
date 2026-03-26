import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
    LayoutDashboard, Users, FileText, Camera, CheckSquare, Settings,
    LogOut, Receipt, UserCog, Briefcase, UserRound, Shield, ChevronRight
} from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions) as any;
    if (!session) redirect("/login");

    const userRole = (session.user as any)?.role || "staff";

    let menuItems: Array<{ icon: any, label: string, href: string }> = [];

    if (userRole === "admin") {
        menuItems = [
            { icon: LayoutDashboard, label: "Overview", href: "/admin" },
            { icon: UserCog, label: "User Management", href: "/admin/users" },
            { icon: UserRound, label: "Customers", href: "/admin/customers" },
            { icon: Users, label: "CRM Pipeline", href: "/admin/crm" },
            { icon: FileText, label: "Quotations", href: "/admin/quotations" },
            { icon: Receipt, label: "Invoices", href: "/admin/invoices" },
            { icon: Camera, label: "Product DB", href: "/admin/products" },
            { icon: Briefcase, label: "Jobs / Installs", href: "/admin/jobs" },
            { icon: CheckSquare, label: "AMC Tracker", href: "/admin/amc" },
            { icon: Settings, label: "Web Settings", href: "/admin/settings" },
        ];
    } else if (userRole === "staff") {
        menuItems = [
            { icon: LayoutDashboard, label: "Overview", href: "/admin" },
            { icon: UserRound, label: "Customers", href: "/admin/customers" },
            { icon: Users, label: "CRM Pipeline", href: "/admin/crm" },
            { icon: FileText, label: "Quotations", href: "/admin/quotations" },
            { icon: Receipt, label: "Invoices", href: "/admin/invoices" },
            { icon: Camera, label: "Product DB", href: "/admin/products" },
        ];
    } else if (userRole === "technician") {
        menuItems = [
            { icon: Briefcase, label: "My Jobs", href: "/admin/jobs" },
        ];
    }

    return (
        <div className="min-h-screen text-white flex" style={{ background: "#020408" }}>
            {/* Sidebar */}
            <aside className="w-72 hidden md:flex flex-col" style={{ background: "#080f1a", borderRight: "1px solid rgba(0,212,255,0.08)" }}>
                {/* Logo */}
                <div className="p-6 flex items-center gap-3" style={{ borderBottom: "1px solid rgba(0,212,255,0.08)" }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)" }}>
                        <Shield className="w-5 h-5" style={{ color: "#00d4ff" }} />
                    </div>
                    <div>
                        <Link href="/" className="font-bold text-white text-sm uppercase tracking-widest leading-none hover:text-[#00d4ff] transition-colors">
                            Manoj Security
                        </Link>
                        <p className="text-[9px] uppercase tracking-[0.25em] font-bold mt-0.5" style={{ color: "#00d4ff" }}>
                            COMMAND CENTER
                        </p>
                    </div>
                </div>

                {/* Role badge */}
                <div className="px-5 py-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)", color: "#d4af37" }}>
                        ● {userRole} Portal
                    </span>
                </div>

                {/* Nav */}
                <nav className="flex-1 overflow-y-auto py-4 px-4">
                    <ul className="space-y-1">
                        {menuItems.map((item, i) => (
                            <li key={i}>
                                <Link
                                    href={item.href}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium group hover:bg-[#00d4ff]/5 hover:text-white border-l-2 border-transparent hover:border-[#00d4ff]"
                                    style={{ color: "rgba(255,255,255,0.5)" }}
                                >
                                    <item.icon className="w-4 h-4 shrink-0 transition-opacity opacity-70 group-hover:opacity-100" style={{ color: "#00d4ff" }} />
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Bottom: user info + signout */}
                <div className="p-4" style={{ borderTop: "1px solid rgba(0,212,255,0.08)" }}>
                    <div className="px-4 py-3 rounded-xl mb-2" style={{ background: "rgba(255,255,255,0.03)" }}>
                        <p className="text-sm font-medium text-white truncate">{session.user?.name}</p>
                        <p className="text-xs text-zinc-500 truncate">{session.user?.email}</p>
                    </div>
                    <Link
                        href="/api/auth/signout"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all hover:bg-red-950/30"
                        style={{ color: "rgba(239,68,68,0.7)" }}
                    >
                        <LogOut className="w-4 h-4" /> Sign Out
                    </Link>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
                {/* Top bar */}
                <header className="h-16 flex items-center justify-between px-8 sticky top-0 z-10" style={{ background: "rgba(8,15,26,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,212,255,0.08)" }}>
                    <div className="flex items-center gap-2 text-sm text-zinc-500">
                        <span className="text-zinc-600">Portal</span>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-white font-medium capitalize">{userRole}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-semibold text-white">{session.user?.name}</p>
                            <p className="text-xs text-zinc-500">{session.user?.email}</p>
                        </div>
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm uppercase" style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.2), rgba(212,175,55,0.2))", border: "1px solid rgba(0,212,255,0.3)", color: "#00d4ff" }}>
                            {session.user?.name?.[0] || "U"}
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 relative">
                    <div className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(ellipse at top right, rgba(0,212,255,0.03), transparent 70%)" }} />
                    {children}
                </div>
            </main>
        </div>
    );
}
