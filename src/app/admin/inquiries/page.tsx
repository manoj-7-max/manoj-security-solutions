
"use client";

import { useEffect, useState } from "react";
import { Mail, Clock, CheckCircle, Trash2 } from "lucide-react";

interface Inquiry {
    _id: string;
    name: string;
    email: string;
    message: string;
    date: string;
    status: string;
    service?: string;
}

export default function InquiriesPage() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/inquiries').then(res => res.json()).then(data => {
            setInquiries(data);
            setLoading(false);
        });
    }, []);

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-primary">Inquiries</h1>

            <div className="space-y-4">
                {inquiries.length === 0 ? (
                    <div className="text-gray-500">No inquiries yet.</div>
                ) : (
                    inquiries.map(iq => (
                        <div key={iq._id} className="glass-panel p-6 flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-bold text-white text-lg">{iq.name}</h3>
                                    <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-gray-300">{iq.email}</span>
                                </div>
                                <p className="text-gray-300 mb-2">{iq.message}</p>
                                {iq.service && <span className="text-xs text-primary border border-primary/20 px-2 py-1 rounded bg-primary/5">Regarding: {iq.service}</span>}
                            </div>
                            <div className="flex flex-col items-end justify-between min-w-[150px]">
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {new Date(iq.date).toLocaleDateString()}
                                </span>
                                <div className="flex gap-2 mt-2">
                                    <button className="btn-primary text-xs px-3 py-1 flex items-center gap-1">
                                        <CheckCircle className="w-3 h-3" /> Mark Read
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
