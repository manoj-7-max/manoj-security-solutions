import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { LayoutDashboard, ShoppingBag, Calendar, FileText, CheckSquare, LogOut, Shield, MessageSquare } from "lucide-react";

const NAV = [
    { icon: LayoutDashboard, label: "My Dashboard", href: "/user/dashboard" },
    { icon: ShoppingBag, label: "Shop / Catalog", href: "/user/catalog" },
    { icon: Calendar, label: "Book Installation", href: "/user/booking" },
    { icon: FileText, label: "My Quotations", href: "/user/quotations" },
    { icon: CheckSquare, label: "AMC Plans", href: "/user/amc" },
];

export default async function UserLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions) as any;
    if (!session) redirect("/login");

    return (
        <div className="min-h-screen text-white" style={{ background: "#020408" }}>
            <header className="sticky top-0 z-40 h-16 flex items-center px-6 justify-between" style={{ background: "rgba(2,4,8,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,212,255,0.08)" }}>
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)" }}>
                        <Shield className="w-4 h-4" style={{ color: "#00d4ff" }} />
                    </div>
                    <div className="hidden sm:block">
                        <p className="text-sm font-bold text-white uppercase tracking-widest leading-none">Manoj Security</p>
                        <p className="text-[9px] tracking-widest uppercase" style={{ color: "#00d4ff" }}>Customer Portal</p>
                    </div>
                </Link>
                <nav className="hidden md:flex items-center gap-1">
                    {NAV.map(n => (
                        <Link key={n.href} href={n.href} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium uppercase tracking-wider text-zinc-500 hover:text-white hover:bg-white/5 transition-all">
                            <n.icon className="w-3.5 h-3.5" /> {n.label}
                        </Link>
                    ))}
                </nav>
                <div className="flex items-center gap-3">
                    <a href="https://wa.me/919944305980" target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider" style={{ background: "rgba(37,211,102,0.1)", color: "#25d366", border: "1px solid rgba(37,211,102,0.2)" }}>
                        <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Support
                    </a>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold uppercase" style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.2), rgba(212,175,55,0.2))", border: "1px solid rgba(0,212,255,0.2)", color: "#00d4ff" }}>
                        {(session.user?.name as string)?.[0] || "U"}
                    </div>
                    <Link href="/api/auth/signout" className="text-zinc-600 hover:text-red-400 transition-colors p-1">
                        <LogOut className="w-4 h-4" />
                    </Link>
                </div>
            </header>
            <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 pb-24 md:pb-8">
                {children}
            </main>
            <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 flex" style={{ background: "rgba(2,4,8,0.97)", borderTop: "1px solid rgba(0,212,255,0.1)", backdropFilter: "blur(20px)" }}>
                {NAV.map(n => (
                    <Link key={n.href} href={n.href} className="flex-1 flex flex-col items-center gap-1 py-3 text-zinc-600 hover:text-white transition-colors">
                        <n.icon className="w-5 h-5" />
                        <span className="text-[9px] uppercase tracking-wider font-bold">{n.label.split(" ")[0]}</span>
                    </Link>
                ))}
            </nav>
            <a href="https://wa.me/919944305980" target="_blank" rel="noopener noreferrer" className="fixed bottom-20 md:bottom-6 right-4 z-50 w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "#25d366", boxShadow: "0 0 20px rgba(37,211,102,0.4)" }}>
                <MessageSquare className="w-6 h-6 text-white" />
            </a>
        </div>
    );
}
