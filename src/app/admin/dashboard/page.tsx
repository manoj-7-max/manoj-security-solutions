
import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import Service from "@/models/Service";
import Inquiry from "@/models/Inquiry";
import Order from "@/models/Order";
import { DollarSign, ShoppingBag, Wrench, Mail, ArrowRight, FileText } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Dashboard | Manoj Security Solutions",
};

export default async function DashboardPage() {
    await dbConnect();

    const productsCount = await Product.countDocuments();
    const servicesCount = await Service.countDocuments();
    const inquiriesCount = await Inquiry.countDocuments();
    const ordersCount = await Order.countDocuments();

    const stats = [
        { title: "Total Products", value: productsCount, icon: ShoppingBag, color: "text-blue-500", bg: "bg-blue-100" },
        { title: "Total Services", value: servicesCount, icon: Wrench, color: "text-green-500", bg: "bg-green-100" },
        { title: "Inquiries", value: inquiriesCount, icon: Mail, color: "text-orange-500", bg: "bg-orange-100" },
        { title: "Total Orders", value: ordersCount, icon: DollarSign, color: "text-purple-500", bg: "bg-purple-100" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="card p-6 flex items-center justify-between hover:shadow-md transition-all duration-300">
                            <div>
                                <p className="text-muted-foreground text-sm font-medium mb-1 uppercase tracking-wider">{stat.title}</p>
                                <h2 className="text-4xl font-bold text-foreground">{stat.value}</h2>
                            </div>
                            <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
                                <Icon className="w-8 h-8" />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card p-8">
                    <h3 className="text-xl font-bold text-foreground mb-4">Quick Actions</h3>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/admin/pos" className="btn-primary flex items-center gap-2 px-6 py-3 text-lg">
                            <ShoppingBag className="w-5 h-5" /> Launch POS System
                        </Link>
                        <Link href="/admin/invoice/create" className="btn-secondary flex items-center gap-2 px-6 py-3 border hover:bg-secondary/80">
                            <FileText className="w-5 h-5" /> Create Invoice
                        </Link>
                        <Link href="/admin/products" className="btn-secondary flex items-center gap-2 px-6 py-3 border hover:bg-secondary/80">
                            View Products
                        </Link>
                    </div>
                </div>
                <div className="card p-8 flex flex-col justify-center items-center text-center text-muted-foreground min-h-[200px]">
                    <div className="bg-muted p-4 rounded-full mb-4">
                        <ArrowRight className="w-6 h-6" />
                    </div>
                    <p className="font-medium">Recent Activity Chart</p>
                    <span className="text-sm">(Coming Soon)</span>
                </div>
            </div>
        </div>
    );
}
