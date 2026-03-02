"use client";

import { useState, useEffect } from "react";
import { Plus, Camera, Search, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";

export default function ProductsDB() {
    const { data: session } = useSession();
    const canEdit = (session?.user as any)?.role === "admin" || (session?.user as any)?.role === "staff";
    const canDelete = (session?.user as any)?.role === "admin";

    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ name: "", category: "Camera", basePrice: 0, stock: 0, image: "" });
    const [submitting, setSubmitting] = useState(false);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/products");
            const data = await res.json();
            if (data.products) setProducts(data.products);
        } catch (e) {
            console.error("Failed to load products", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleCreateOrUpdateProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canEdit) return;

        setSubmitting(true);
        try {
            const url = editingId ? `/api/products/${editingId}` : "/api/products";
            const method = editingId ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                closeModal();
                fetchProducts();
            }
        } catch (e) {
            console.error(e);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteProduct = async () => {
        if (!canDelete || !editingId) return;
        if (!confirm("Are you sure you want to delete this product forever?")) return;

        setSubmitting(true);
        try {
            const res = await fetch(`/api/products/${editingId}`, {
                method: "DELETE",
            });
            if (res.ok) {
                closeModal();
                fetchProducts();
            }
        } catch (e) {
            console.error(e);
        } finally {
            setSubmitting(false);
        }
    };

    const openEditModal = (product: any) => {
        if (!canEdit) return;
        setEditingId(product._id);
        setFormData({ name: product.name, category: product.category || "Camera", basePrice: product.basePrice, stock: product.stock || 0, image: product.image || "" });
        setModalOpen(true);
    };

    const closeModal = () => {
        setFormData({ name: "", category: "Camera", basePrice: 0, stock: 0, image: "" });
        setEditingId(null);
        setModalOpen(false);
    };

    return (
        <div className="space-y-8 max-w-6xl">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1"><div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff' }} /><span className="text-xs uppercase tracking-widest font-bold" style={{ color: '#00d4ff' }}>Product Database</span></div>
                    <h2 className="text-3xl font-bold text-white">Hardware Inventory</h2>
                    <p className="text-zinc-500 text-sm mt-1">Manage products, pricing, and stock levels.</p>
                </div>
                {canEdit && (
                    <button onClick={() => { setEditingId(null); setModalOpen(true); }} className="font-bold px-5 py-3 rounded-xl flex items-center gap-2 transition-all" style={{ background: 'linear-gradient(135deg,#d4af37,#f5e27d,#b8860b)', color: '#000', boxShadow: '0 0 20px rgba(212,175,55,0.3)' }}>
                        <Plus className="w-5 h-5" /> Add Product
                    </button>
                )}
            </div>

            <div className="rounded-2xl p-4" style={{ background: 'rgba(8,15,26,0.6)', border: '1px solid rgba(0,212,255,0.1)' }}>
                <div className="flex justify-between items-center mb-6">
                    <div className="relative w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input type="text" placeholder="Search product DB..." className="w-full pl-10 pr-4 py-2 rounded-xl focus:outline-none text-white text-sm" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {loading ? (
                        <div className="col-span-full h-32 flex items-center justify-center text-zinc-500 font-mono text-xs uppercase tracking-widest">Loading Catalog...</div>
                    ) : products.length === 0 ? (
                        <div className="col-span-full h-32 flex items-center justify-center text-zinc-500 font-mono text-xs uppercase tracking-widest">No products found.</div>
                    ) : (
                        products.map((product) => (
                            <div onClick={() => openEditModal(product)} key={product._id} className="p-5 rounded-2xl group flex flex-col h-full cursor-pointer relative transition-all hover:-translate-y-1" style={{ background: 'rgba(13,17,23,0.8)', border: '1px solid rgba(0,212,255,0.08)' }}>
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 rounded text-xs font-bold" style={{ background: 'rgba(0,212,255,0.15)', color: '#00d4ff' }}>Edit</div>
                                <div className="w-full aspect-video rounded-xl mb-4 flex items-center justify-center overflow-hidden" style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    {product.image ? (
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <Camera className="w-8 h-8 text-zinc-800" />
                                    )}
                                </div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full" style={{ background: 'rgba(0,212,255,0.1)', color: '#00d4ff', border: '1px solid rgba(0,212,255,0.2)' }}>{product.category}</span>
                                    <span className="text-xs text-zinc-500 font-mono tracking-wider">Qty: {product.stock}</span>
                                </div>
                                <h3 className="text-white font-medium text-sm leading-tight mb-4 flex-1">{product.name}</h3>
                                <div className="flex items-end justify-between pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                    <span className="text-xs text-zinc-500">Base Rate</span>
                                    <span className="text-lg font-mono font-bold gold-gradient-text">₹{product.basePrice.toLocaleString()}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Modal */}
            {modalOpen && canEdit && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeModal}></div>
                    <div className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 relative z-10 shadow-2xl">
                        <h3 className="text-xl font-display font-medium text-white mb-6">{editingId ? 'Edit Hardware Profile' : 'Add Hardware to DB'}</h3>
                        <form onSubmit={handleCreateOrUpdateProduct} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest ml-1">Product Description</label>
                                <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} type="text" className="w-full bg-[#111] border border-white/10 rounded-xl p-3 text-white focus:border-[#d4af37]/50 focus:outline-none" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest ml-1">Category</label>
                                    <select required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full bg-[#111] border border-white/10 rounded-xl p-3 text-white focus:border-[#d4af37]/50 focus:outline-none">
                                        <option value="Camera">Camera / IP</option>
                                        <option value="DVR / NVR">DVR / NVR</option>
                                        <option value="Storage">HDD / SSD</option>
                                        <option value="Networking">PoE / Cables</option>
                                        <option value="Accessories">Accessories</option>
                                        <option value="Labor">Labor/Installs</option>
                                    </select>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest ml-1">Base Price (₹)</label>
                                    <input required value={formData.basePrice} onChange={(e) => setFormData({ ...formData, basePrice: Number(e.target.value) })} type="number" min="0" className="w-full bg-[#111] border border-white/10 rounded-xl p-3 text-white focus:border-[#d4af37]/50 focus:outline-none font-mono" />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest ml-1">Initial Stock Count</label>
                                <input required value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })} type="number" min="0" className="w-full bg-[#111] border border-white/10 rounded-xl p-3 text-white focus:border-[#d4af37]/50 focus:outline-none font-mono" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest ml-1">Product Image (Optional)</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setFormData({ ...formData, image: reader.result as string });
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        className="w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:cursor-pointer file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:tracking-widest file:uppercase file:bg-[#d4af37]/10 file:text-[#d4af37] hover:file:bg-[#d4af37]/20"
                                    />
                                    {formData.image && (
                                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-white/10 relative group">
                                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer" onClick={() => setFormData({ ...formData, image: "" })}>
                                                <span className="text-[10px] text-red-400 font-bold uppercase">Del</span>
                                            </div>
                                            <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>
                                <input value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} type="text" placeholder="Or paste image URL here..." className="w-full bg-[#111] border border-white/10 rounded-xl p-3 mt-2 text-white focus:border-[#d4af37]/50 focus:outline-none text-xs" />
                            </div>

                            <div className="flex justify-between items-center mt-8">
                                <div>
                                    {editingId && canDelete && (
                                        <button type="button" onClick={handleDeleteProduct} disabled={submitting} className="px-4 py-2 rounded-xl text-red-500 font-medium hover:bg-red-500/10 transition-colors">Delete</button>
                                    )}
                                </div>
                                <div className="flex gap-3">
                                    <button type="button" onClick={closeModal} className="px-4 py-2 rounded-xl text-zinc-400 font-medium hover:text-white transition-colors">Cancel</button>
                                    <button type="submit" disabled={submitting} className="bg-[#d4af37] text-black font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-yellow-500 transition-colors disabled:opacity-50">
                                        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : editingId ? "Save Changes" : "Save to DB"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
