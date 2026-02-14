
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { User, Mail, Phone, Shield, Camera } from "lucide-react";
import ClientProfileForm from "./client-profile-form";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";

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

    // Parallel Fetching
    const [userOrders, userBookings] = await Promise.all([
        Order.find({ userId: user._id }).sort({ date: -1 }).lean(),
        Booking.find({ userId: user._id }).sort({ createdAt: -1 }).lean()
    ]);

    const userData = {
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        role: user.role,
        image: user.picture || "",
        authType: user.authType || "email"
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl animate-in fade-in duration-500">
            <h1 className="text-3xl font-bold text-white mb-8">My Dashboard</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Profile Card */}
                <div className="lg:col-span-1 space-y-6">
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
                        </div>

                        <h2 className="text-xl font-bold text-white mb-1">{userData.name}</h2>
                        <p className="text-gray-400 text-sm mb-4">{userData.email}</p>

                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20 mb-6">
                            <Shield className="w-3 h-3" />
                            {userData.role}
                        </div>

                        <div className="w-full border-t border-gray-700 pt-4 text-left space-y-3">
                            <p className="text-sm text-gray-400 flex items-center gap-2">
                                <Phone className="w-4 h-4" /> {userData.phone || "No phone added"}
                            </p>
                            <p className="text-sm text-gray-400 flex items-center gap-2">
                                <Mail className="w-4 h-4" /> {userData.email}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Bookings & Orders */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Active Bookings Section */}
                    {userBookings.length > 0 ? (
                        <div className="glass-panel p-6">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Camera className="w-5 h-5 text-primary" /> Service Bookings
                            </h3>
                            <div className="space-y-4">
                                {userBookings.map((booking: any) => (
                                    <div key={booking._id} className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-primary/30 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="font-bold text-lg text-white">{booking.serviceName}</h4>
                                                <p className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                                                    <span className="bg-white/10 px-2 py-0.5 rounded text-xs">{new Date(booking.date).toLocaleDateString()}</span>
                                                    <span>{booking.timeSlot}</span>
                                                </p>
                                            </div>
                                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider border ${booking.status === 'Completed' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                                    booking.status === 'Confirmed' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                                                        booking.status === 'Cancelled' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                                            'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                                }`}>
                                                {booking.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-400 italic border-l-2 border-gray-600 pl-3">
                                            "{booking.notes || 'No specific notes'}"
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="glass-panel p-8 text-center border-dashed border-2 border-gray-700">
                            <p className="text-gray-400 mb-2">No active service bookings.</p>
                            <a href="/services" className="text-primary hover:underline text-sm">Book a Service Now</a>
                        </div>
                    )}

                    {/* Order History */}
                    {userOrders.length > 0 && (
                        <div className="glass-panel p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Order History</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-gray-300">
                                    <thead className="text-gray-500 border-b border-gray-700">
                                        <tr>
                                            <th className="pb-3 text-xs font-bold uppercase tracking-wider">Invoice</th>
                                            <th className="pb-3 text-xs font-bold uppercase tracking-wider">Date</th>
                                            <th className="pb-3 text-xs font-bold uppercase tracking-wider">Amount</th>
                                            <th className="pb-3 text-xs font-bold uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-800">
                                        {userOrders.map((order: any) => (
                                            <tr key={order._id} className="group hover:bg-white/5 transition-colors">
                                                <td className="py-4 font-mono text-primary group-hover:text-blue-400">{order.invoiceNo}</td>
                                                <td className="py-4 text-gray-400">{new Date(order.date).toLocaleDateString()}</td>
                                                <td className="py-4 font-bold text-white">₹{order.totalAmount.toLocaleString()}</td>
                                                <td className="py-4">
                                                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${order.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                                                            order.status === 'Processing' ? 'bg-blue-500/20 text-blue-400' :
                                                                'bg-red-500/20 text-red-400'
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
