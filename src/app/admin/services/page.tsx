
"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

interface Service {
    _id: string;
    name: string;
    description: string;
    basePrice: string;
    duration?: string;
}

export default function ServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/services")
            .then(res => res.json())
            .then(data => {
                setServices(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <div className="text-center p-10">Loading Services...</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Services</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Dummy Form (later can restrict to Admin) */}
                <div className="border border-dashed border-gray-300 rounded-lg p-6 flex items-center justify-center cursor-pointer hover:bg-gray-50 aspect-video">
                    <div className="text-center text-gray-500">
                        <Plus className="w-8 h-8 mx-auto mb-2" />
                        <span className="text-sm font-medium">Add New Service</span>
                    </div>
                </div>

                {services.map(s => (
                    <div key={s._id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                        <h3 className="font-bold text-lg mb-2">{s.name}</h3>
                        <p className="text-gray-500 text-sm mb-4 line-clamp-3">{s.description}</p>
                        <div className="flex justify-between items-center text-sm">
                            <span className="font-semibold text-primary">₹{s.basePrice}</span>
                            <span className="text-gray-400">{s.duration || 'Variable'}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
