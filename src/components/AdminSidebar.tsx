
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
        links.push({ href: "/admin/staff", label: "Manage Staff", icon: Users });
    }

    return (
        <aside className="w-64 bg-surface-light text-white hidden md:flex flex-col border-r border-white/5">
            <div className="p-6 border-b border-white/5 flex items-center gap-2">
                <Shield className="text-primary w-6 h-6" />
                <span className="font-bold text-lg tracking-wide">Manoj Security</span>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={clsx(
                                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                                isActive
                                    ? "bg-primary text-background font-medium shadow-md shadow-primary/20"
                                    : "hover:bg-white/5 text-gray-300 hover:text-white"
                            )}
                        >
                            <Icon className="w-5 h-5" />
                            {link.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/5">
                <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
