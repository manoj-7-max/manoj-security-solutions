
"use client";

import { useEffect, useState } from "react";
import { Search, FileText } from "lucide-react";

export default function InvoicePage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/orders').then(res => res.json()).then(data => {
            setOrders(data);
            setLoading(false);
        });
    }, []);

    // API needed!
    // Wait, I didn't create GET /api/orders!
    // I only created POST /api/orders in Step 2054.

    // I need to update /api/orders/route.ts to include GET.

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white">Invoices</h1>

            <div className="glass-panel p-4 flex gap-2">
                <Search className="text-gray-400" />
                <input placeholder="Search Invoice..." className="bg-transparent text-white outline-none w-full" />
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-white/5 text-gray-400 text-sm uppercase">
                        <tr>
                            <th className="p-4">Invoice #</th>
                            <th className="p-4">Customer</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Total</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-300">
                        {orders.map(o => (
                            <tr key={o._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td className="p-4 font-mono text-primary">{o.invoiceNo}</td>
                                <td className="p-4">
                                    <div className="font-bold text-white">{o.customerName}</div>
                                    <div className="text-xs text-gray-500">{o.phone}</div>
                                </td>
                                <td className="p-4 text-sm">{new Date(o.date).toLocaleDateString()}</td>
                                <td className="p-4 font-bold text-white">₹{o.totalAmount.toLocaleString()}</td>
                                <td className="p-4"><span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">Paid</span></td>
                                <td className="p-4"><button className="text-primary hover:text-white"><FileText className="w-4 h-4" /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
