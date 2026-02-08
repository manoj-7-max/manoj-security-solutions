
"use client";

import { useEffect, useState } from "react";
import { User, Shield, Phone, Plus, Trash2, X } from "lucide-react";

export default function StaffPage() {
    const [staff, setStaff] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("staff123");

    useEffect(() => {
        fetch('/api/staff').then(res => res.json()).then(data => {
            setStaff(data);
            setLoading(false);
        });
    }, []);

    async function handleAdd(e: React.FormEvent) {
        e.preventDefault();
        try {
            const res = await fetch('/api/staff', {
                method: 'POST',
                body: JSON.stringify({ name, email, phone, password, role: 'staff' }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();
            if (res.ok) {
                setStaff([...staff, data.user]);
                setIsModalOpen(false);
                setName(""); setEmail(""); setPhone("");
            } else {
                alert("Error: " + data.error);
            }
        } catch (err) { console.error(err); }
    }

    async function handleDelete(id: string) {
        if (!confirm("Delete this staff member?")) return;
        try {
            await fetch(`/api/staff/${id}`, { method: 'DELETE' });
            setStaff(staff.filter(s => s._id !== id));
        } catch (err) { console.error(err); }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-primary">Manage Staff</h1>
                <button onClick={() => setIsModalOpen(true)} className="btn-primary flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Staff
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {staff.map(s => (
                    <div key={s._id} className="glass-panel p-6 relative group">
                        <button onClick={() => handleDelete(s._id)} className="absolute top-4 right-4 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-primary">
                                <User className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">{s.name}</h3>
                                <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded border border-primary/20">Staff Role</span>
                            </div>
                        </div>
                        <div className="space-y-2 text-sm text-gray-400">
                            <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> {s.email}</div>
                            <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> {s.phone || 'N/A'}</div>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="glass-panel w-full max-w-md p-6 relative">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X /></button>
                        <h2 className="text-xl font-bold mb-4 text-white">Add Staff Member</h2>
                        <form onSubmit={handleAdd} className="space-y-4">
                            <input className="input-field" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required />
                            <input className="input-field" type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required />
                            <input className="input-field" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} />
                            <input className="input-field" type="password" placeholder="Password (default: staff123)" value={password} onChange={e => setPassword(e.target.value)} />
                            <button className="btn-primary w-full py-2">Create Account</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

function Mail(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
}
