
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { User, Mail, Phone, Shield, Camera } from "lucide-react";
import ClientProfileForm from "./client-profile-form";
import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import UserModel from "@/models/User";

export const metadata = {
    title: "My Profile | Manoj Security Solutions",
};

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    await dbConnect();
    const user = await UserModel.findOne({ email: session.user?.email });

    if (!user) {
        return <div className="text-white text-center p-10">User not found</div>;
    }

    const userOrders = await Order.find({ userId: user._id }).sort({ date: -1 });

    const userData = {
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        role: user.role,
        image: user.picture || "",
        authType: user.authType || "email"
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl animate-in fade-in duration-500">
            <h1 className="text-3xl font-bold text-white mb-8">My Profile</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="md:col-span-1">
                    <div className="glass-panel p-6 flex flex-col items-center text-center sticky top-24">
                        <div className="relative w-32 h-32 mb-4 group">
                            <div className="w-full h-full rounded-full overflow-hidden border-4 border-primary/20 bg-surface-light flex items-center justify-center">
                                {userData.image ? (
                                    <img
                                        src={userData.image}
                                        alt={userData.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <User className="w-16 h-16 text-gray-400" />
                                )}
                            </div>
                            <button className="absolute bottom-0 right-0 p-2 bg-primary rounded-full text-white hover:bg-primary-dark transition-colors shadow-lg opacity-0 group-hover:opacity-100">
                                <Camera className="w-4 h-4" />
                            </button>
                        </div>

                        <h2 className="text-xl font-bold text-white mb-1">{userData.name}</h2>
                        <p className="text-gray-400 text-sm mb-4">{userData.email}</p>

                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20">
                            <Shield className="w-3 h-3" />
                            {userData.role}
                        </div>
                    </div>
                </div>

                {/* Edit Form & Orders */}
                <div className="md:col-span-2 space-y-8">
                    <div className="glass-panel p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-white">Personal Information</h3>
                        </div>

                        <ClientProfileForm user={userData} />
                    </div>

                    {/* My Orders Section */}
                    {userOrders.length > 0 && (
                        <div className="glass-panel p-8">
                            <h3 className="text-xl font-bold text-white mb-4">My Invoices & Orders</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-gray-300">
                                    <thead className="text-gray-500 border-b border-gray-700">
                                        <tr>
                                            <th className="pb-2">Invoice #</th>
                                            <th className="pb-2">Date</th>
                                            <th className="pb-2">Total</th>
                                            <th className="pb-2">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-800">
                                        {userOrders.map((order: any) => (
                                            <tr key={order._id} className="hover:bg-white/5 transition-colors">
                                                <td className="py-3 font-mono text-primary">{order.invoiceNo}</td>
                                                <td className="py-3">{new Date(order.date).toLocaleDateString()}</td>
                                                <td className="py-3 font-bold text-white">₹{order.totalAmount.toLocaleString()}</td>
                                                <td className="py-3">
                                                    <span className={`px-2 py-1 rounded text-xs ${order.status === 'Completed' ? 'bg-green-500/10 text-green-500' :
                                                        order.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500' :
                                                            'bg-red-500/10 text-red-500'
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
