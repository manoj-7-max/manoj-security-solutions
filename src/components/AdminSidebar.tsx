
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Wrench, Mail, ShoppingCart, FileText, Users, LogOut, Shield } from "lucide-react";
import { signOut } from "next-auth/react";
import clsx from "clsx";

const AdminSidebar = ({ role }: { role: string }) => {
    const pathname = usePathname();

    const links = [
        { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/admin/products", label: "Products", icon: Package },
        { href: "/admin/services", label: "Services", icon: Wrench },
        { href: "/admin/inquiries", label: "Inquiries", icon: Mail },
        { href: "/admin/pos", label: "POS System", icon: ShoppingCart },
        { href: "/admin/invoice", label: "Invoice", icon: FileText },
    ];

    if (role === "admin") {
        links.push({ href: "/admin/bookings", label: "Bookings", icon: Calendar });
        links.push({ href: "/admin/staff", label: "Manage Staff", icon: Users });
    }

    if (role === "staff") {
        links.push({ href: "/admin/tasks", label: "My Tasks", icon: Wrench });
    }

    return (
        <aside className="w-64 bg-card text-card-foreground hidden md:flex flex-col border-r border-border h-full relative overflow-y-auto z-50">
            <div className="p-6 border-b border-border flex items-center gap-3">
                <div className="bg-primary/20 text-primary p-2 rounded-lg backdrop-blur-sm border border-primary/20 shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]">
                    <Shield className="w-6 h-6 animate-pulse-slow" />
                </div>
                <div>
                    <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent block">Manoj Security</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">{role} Panel</span>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href || pathname.startsWith(link.href);
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={clsx(
                                "group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 text-sm font-medium relative overflow-hidden",
                                isActive
                                    ? "bg-primary/10 text-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.15)] border border-primary/20"
                                    : "hover:bg-accent/50 hover:text-accent-foreground text-muted-foreground hover:translate-x-1"
                            )}
                        >
                            {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full shadow-[0_0_10px_var(--primary)]" />}
                            <Icon className={clsx("w-5 h-5 transition-transform duration-300", isActive ? "scale-110" : "group-hover:scale-110")} />
                            <span className="relative z-10">{link.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-border bg-card/50 backdrop-blur-sm">
                <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="flex items-center gap-3 w-full px-3 py-2 text-destructive hover:bg-destructive/10 hover:text-destructive rounded-lg transition-all duration-300 text-sm font-medium group"
                >
                    <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
