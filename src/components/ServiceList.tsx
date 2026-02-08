
"use client";

import { useState } from "react";
import { Trash2, Plus, X, Wrench } from "lucide-react";

interface Service {
    _id: string;
    name: string;
    description: string;
    features: string[];
    icon?: string;
    image?: string;
}

export default function ServiceList({ initialServices }: { initialServices: Service[] }) {
    const [services, setServices] = useState(initialServices);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Form
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [features, setFeatures] = useState("");

    async function handleDelete(id: string) {
        if (!confirm("Delete this service?")) return;
        try {
            const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
            if (res.ok) setServices(services.filter(s => s._id !== id));
        } catch (e) { console.error(e); }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", desc);
        // Features comma separated?
        // We need backend to parse stringified array or handle string.
        // My previous backend for services handled stringified JSON or plain string.
        // I need to write /api/services route to handle this.
        // Let's send JSON string for features.
        const feats = features.split(',').map(f => f.trim()).filter(f => f);
        formData.append("features", JSON.stringify(feats));

        try {
            const res = await fetch("/api/services", { method: "POST", body: formData });
            const newS = await res.json();
            if (res.ok) {
                setServices([...services, newS]);
                setIsModalOpen(false);
                setName(""); setDesc(""); setFeatures("");
            }
        } finally { setLoading(false); }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-primary">Manage Services</h1>
                <button onClick={() => setIsModalOpen(true)} className="btn-primary flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Service
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map(s => (
                    <div key={s._id} className="glass-panel p-6 relative group">
                        <button onClick={() => handleDelete(s._id)} className="absolute top-4 right-4 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4 text-primary">
                            <Wrench className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{s.name}</h3>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-3">{s.description}</p>
                        <div className="flex flex-wrap gap-2">
                            {s.features.map((f, i) => (
                                <span key={i} className="text-xs bg-white/5 px-2 py-1 rounded text-primary border border-primary/20">{f}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="glass-panel w-full max-w-md p-6 relative">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X /></button>
                        <h2 className="text-xl font-bold mb-4">Add Service</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input className="input-field" placeholder="Service Name" value={name} onChange={e => setName(e.target.value)} required />
                            <textarea className="input-field min-h-[100px]" placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} required />
                            <input className="input-field" placeholder="Features (comma separated)" value={features} onChange={e => setFeatures(e.target.value)} />
                            <button className="btn-primary w-full py-2" disabled={loading}>{loading ? "Saving..." : "Save Service"}</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
