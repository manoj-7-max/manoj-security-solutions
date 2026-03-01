import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { LayoutDashboard, LogOut, Package, Clock, ShieldCheck } from "lucide-react";

export default async function UserLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions) as any;

    if (!session) {
        redirect("/login");
    }

    if (session.user?.role === "admin" || session.user?.role === "staff") {
        redirect("/admin");
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white flex">
            {/* Sidebar */}
            <aside className="w-72 bg-[#111] border-r border-white/5 hidden md:flex flex-col">
                <div className="p-8 border-b border-white/5">
                    <Link href="/" className="inline-flex gap-3 items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-black border border-white/10 flex items-center justify-center shrink-0">
                            <img src="/logo.png" alt="Manoj Security Solutions" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-display font-medium text-lg tracking-wider">CLIENT<span className="text-[#d4af37]">.</span></span>
                    </Link>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-500 mt-2 font-bold">Secure Portal</p>
                </div>

                <nav className="flex-1 overflow-y-auto py-6">
                    <ul className="space-y-1 px-4">
                        <li>
                            <Link href="/user/dashboard" className="flex items-center gap-4 px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all font-medium text-sm group">
                                <LayoutDashboard className="w-5 h-5 text-zinc-500 group-hover:text-[#d4af37] transition-colors" />
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link href="/user/catalog" className="flex items-center gap-4 px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all font-medium text-sm group">
                                <Package className="w-5 h-5 text-zinc-500 group-hover:text-[#d4af37] transition-colors" />
                                Products & Services
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="p-6 border-t border-white/5">
                    <Link href="/api/auth/signout" className="flex items-center gap-4 px-4 py-3 text-red-500 hover:bg-red-950/30 rounded-xl transition-all font-medium text-sm group">
                        <LogOut className="w-5 h-5" />
                        Sign Out
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
                <header className="h-20 border-b border-white/5 bg-[#111]/80 backdrop-blur-md px-8 flex items-center justify-between z-10 sticky top-0">
                    <div>
                        <h1 className="font-display text-xl font-medium">My Account</h1>
                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Client Portal</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-medium">{session.user?.name}</p>
                            <p className="text-xs text-[#d4af37]">{session.user?.email}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full border border-[#d4af37]/30 flex items-center justify-center bg-[#d4af37]/10 text-[#d4af37] font-bold uppercase shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                            {session.user?.name?.[0] || 'U'}
                        </div>
                    </div>
                </header>
                <div className="flex-1 overflow-y-auto p-8 relative">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d4af37]/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
                    {children}
                </div>
            </main>
        </div>
    );
}
