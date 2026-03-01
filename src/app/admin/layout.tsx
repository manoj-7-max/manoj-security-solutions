import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
    LayoutDashboard, Users, FileText, Camera, CheckSquare, Settings, LogOut, Receipt, Network, UserCog, Briefcase
} from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions) as any;

    if (!session) {
        redirect("/login");
    }

    const userRole = (session.user as any)?.role || "staff";

    let menuItems: Array<{ icon: any, label: string, href: string }> = [];

    if (userRole === "admin") {
        menuItems = [
            { icon: LayoutDashboard, label: "Overview", href: "/admin" },
            { icon: UserCog, label: "User Management", href: "/admin/users" },
            { icon: Users, label: "CRM Leads", href: "/admin/crm" },
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
            { icon: Users, label: "CRM Leads", href: "/admin/crm" },
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
        <div className="min-h-screen bg-[#050505] text-white flex">
            {/* Sidebar */}
            <aside className="w-72 bg-[#111] border-r border-white/5 hidden md:flex flex-col">
                <div className="p-8 border-b border-white/5">
                    <Link href="/" className="inline-flex gap-3 items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-black border border-white/10 flex items-center justify-center shrink-0">
                            <img src="/logo.png" alt="Manoj Security Solutions" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-display font-medium text-lg tracking-wider">COMMAND<span className="text-zinc-600">.</span></span>
                    </Link>
                    <p className="text-[10px] uppercase tracking-widest text-[#d4af37] mt-2 font-bold">Manoj Security</p>
                </div>

                <nav className="flex-1 overflow-y-auto py-6">
                    <ul className="space-y-1 px-4">
                        {menuItems.map((item, i) => (
                            <li key={i}>
                                <Link href={item.href} className="flex items-center gap-4 px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all font-medium text-sm group">
                                    <item.icon className="w-5 h-5 text-zinc-500 group-hover:text-[#d4af37] transition-colors" />
                                    {item.label}
                                </Link>
                            </li>
                        ))}
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
                        <h1 className="font-display text-xl font-medium">Dashboard</h1>
                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">{userRole} Portal</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-medium">{session.user?.name}</p>
                            <p className="text-xs text-zinc-500">{session.user?.email}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-[#d4af37]/10 text-[#d4af37] font-bold uppercase">
                            {session.user?.name?.[0] || 'U'}
                        </div>
                    </div>
                </header>
                <div className="flex-1 overflow-y-auto p-8 relative">
                    {/* Ambient Background for sub-routes */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d4af37]/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
                    {children}
                </div>
            </main>
        </div>
    );
}
