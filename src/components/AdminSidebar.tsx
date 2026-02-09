
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
        <aside className="w-64 bg-card text-card-foreground hidden md:flex flex-col border-r border-border h-full">
            <div className="p-6 border-b border-border flex items-center gap-2">
                <div className="bg-primary text-primary-foreground p-1 rounded-md">
                    <Shield className="w-5 h-5" />
                </div>
                <span className="font-bold text-lg tracking-tight">Manoj Security</span>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={clsx(
                                "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 text-sm font-medium",
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-sm"
                                    : "hover:bg-accent hover:text-accent-foreground text-muted-foreground"
                            )}
                        >
                            <Icon className="w-4 h-4" />
                            {link.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-border">
                <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="flex items-center gap-3 w-full px-3 py-2 text-red-500 hover:bg-red-50 hover:text-red-700 rounded-md transition-colors text-sm font-medium"
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
