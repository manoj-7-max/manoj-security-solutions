
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";

export const metadata = {
    title: "Admin Panel | Manoj Security Solutions",
    description: "Secure Admin Panel",
};

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/api/auth/signin"); // Or custom login page
    }

    // Check Role (Admin or Staff allowed)
    const role = (session.user as any).role; // Force any just in case types are loose
    if (role !== "admin" && role !== "staff") {
        redirect("/api/auth/signin?error=AccessDenied");
    }

    return (
        <div className="flex h-screen bg-background text-text overflow-hidden relative">
            {/* Mobile Sidebar Toggle Logic Needed? */}
            {/* For now Desktop Only or Responsive Check inside Sidebar */}
            <div className="sidebar-wrapper h-full hidden md:block">
                <AdminSidebar role={role} />
            </div>

            {/* Dynamic Main Content */}
            <main className="flex-1 overflow-auto bg-gradient-to-br from-surface to-background relative p-6">
                {children}
            </main>
        </div>
    );
}
