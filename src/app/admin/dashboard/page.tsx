
import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import Service from "@/models/Service";
import Inquiry from "@/models/Inquiry";
import Order from "@/models/Order";
import { DollarSign, ShoppingBag, Wrench, Mail } from "lucide-react";

export const metadata = {
    title: "Dashboard | Manoj Security Solutions",
};

export default async function DashboardPage() {
    await dbConnect();

    const productsCount = await Product.countDocuments();
    const servicesCount = await Service.countDocuments();
    const inquiriesCount = await Inquiry.countDocuments();
    const ordersCount = await Order.countDocuments(); // Assume exists

    const stats = [
        { title: "Total Products", value: productsCount, icon: ShoppingBag, color: "text-blue-400", bg: "bg-blue-500/10" },
        { title: "Total Services", value: servicesCount, icon: Wrench, color: "text-green-400", bg: "bg-green-500/10" },
        { title: "Inquiries", value: inquiriesCount, icon: Mail, color: "text-yellow-400", bg: "bg-yellow-500/10" },
        { title: "Total Orders", value: ordersCount, icon: DollarSign, color: "text-purple-400", bg: "bg-purple-500/10" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="glass-panel p-6 flex items-center justify-between hover:translate-y-[-5px] transition-transform duration-300 cursor-default">
                            <div>
                                <p className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wider">{stat.title}</p>
                                <h2 className="text-4xl font-bold text-white">{stat.value}</h2>
                            </div>
                            <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
                                <Icon className="w-8 h-8" />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-panel p-8">
                    <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
                    <div className="flex flex-wrap gap-4">
                        <a href="/admin/pos" className="btn-primary flex items-center gap-2 px-6 py-3 text-lg">
                            <ShoppingBag className="w-5 h-5" /> Launch POS System
                        </a>
                        <a href="/admin/products" className="bg-surface text-white hover:bg-surface-light px-6 py-3 rounded font-medium transition-colors border border-white/10 flex items-center gap-2">
                            View Products
                        </a>
                    </div>
                </div>
                <div className="glass-panel p-8 flex items-center justify-center text-gray-500">
                    <p>Recent Activity Chart (Coming Soon)</p>
                </div>
            </div>
        </div>
    );
}
