"use client";

import { useState, useEffect } from "react";
import { Copy, Plus, MoreVertical, Loader2, ShieldAlert } from "lucide-react";
import { useSession } from "next-auth/react";

export default function UserManagement() {
    const { data: session } = useSession();
    const isAdmin = (session?.user as any)?.role === "admin";

    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "staff" });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/users");
            const data = await res.json();
            if (data.users) {
                setUsers(data.users);
            }
        } catch (e) {
            console.error("Failed to load users", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAdmin) fetchUsers();
    }, [isAdmin]);

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        try {
            const res = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to create user.");
            }

            setFormData({ name: "", email: "", password: "", role: "staff" });
            setModalOpen(false);
            fetchUsers();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (!isAdmin) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center">
                <ShieldAlert className="w-16 h-16 text-red-500 mb-4 opacity-50" />
                <h2 className="text-2xl font-display text-white">Access Denied</h2>
                <p className="text-zinc-500">Only Super Admins can access User Management.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-6xl">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-display font-medium text-white mb-2">User Management</h2>
                    <p className="text-zinc-500 font-light text-sm tracking-wider">Create and manage staff, tech, and admin access.</p>
                </div>
                <button onClick={() => setModalOpen(true)} className="bg-[#d4af37] text-black font-bold px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-yellow-500 transition-colors shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                    <Plus className="w-5 h-5" /> Add New User
                </button>
            </div>

            <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 text-zinc-500 text-xs uppercase tracking-widest font-bold bg-[#1a1a1a]">
                                <th className="p-4 rounded-tl-2xl">Name</th>
                                <th className="p-4">Email Address</th>
                                <th className="p-4">Role Access</th>
                                <th className="p-4 text-center rounded-tr-2xl">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-zinc-500 font-mono tracking-widest uppercase text-xs">
                                        Loading Personnel Data...
                                    </td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-zinc-500 font-mono tracking-widest uppercase text-xs">
                                        No users found.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user._id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                        <td className="p-4">
                                            <div className="text-white font-medium text-sm">{user.name}</div>
                                        </td>
                                        <td className="p-4 text-zinc-400 font-mono text-xs tracking-wider">{user.email}</td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full border ${user.role === "admin" ? "bg-[#d4af37]/10 text-[#d4af37] border-[#d4af37]/30" :
                                                    user.role === "technician" ? "bg-blue-500/10 text-blue-400 border-blue-500/30" :
                                                        "bg-zinc-800 text-zinc-400 border-zinc-700"
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="p-4 text-center">
                                            <button className="text-zinc-600 hover:text-white transition-colors p-2">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setModalOpen(false)}></div>
                    <div className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 relative z-10 shadow-2xl">
                        <h3 className="text-xl font-display font-medium text-white mb-6">Provision New Account</h3>
                        <form onSubmit={handleCreateUser} className="space-y-4">
                            {error && <div className="p-3 rounded-lg bg-red-950/50 border border-red-500/50 text-red-500 text-sm">{error}</div>}

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest ml-1">Full Name</label>
                                <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} type="text" className="w-full bg-[#111] border border-white/10 rounded-xl p-3 text-white focus:border-[#d4af37]/50 focus:outline-none" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest ml-1">Email <span className="opacity-50">(Login ID)</span></label>
                                <input required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="email" className="w-full bg-[#111] border border-white/10 rounded-xl p-3 text-white focus:border-[#d4af37]/50 focus:outline-none" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest ml-1">Temporary Password</label>
                                <input required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} type="text" className="w-full bg-[#111] border border-white/10 rounded-xl p-3 text-white focus:border-[#d4af37]/50 focus:outline-none font-mono" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest ml-1">Platform Role</label>
                                <select required value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full bg-[#111] border border-white/10 rounded-xl p-3 text-white focus:border-[#d4af37]/50 focus:outline-none">
                                    <option value="staff">Office Staff (CRM, Quotes, Invoices)</option>
                                    <option value="technician">Field Tech (View Jobs & Updates)</option>
                                    <option value="admin">Super Admin (Full Platform Control)</option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-3 mt-8">
                                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-xl text-zinc-400 font-medium hover:text-white transition-colors">Cancel</button>
                                <button type="submit" disabled={submitting} className="bg-[#d4af37] text-black font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-yellow-500 transition-colors disabled:opacity-50">
                                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Provision User"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
