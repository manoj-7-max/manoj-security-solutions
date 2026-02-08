
"use client";

import { useState } from "react";
import { Trash2, Plus, X } from "lucide-react";
import Image from "next/image";

interface Product {
    _id: string;
    name: string;
    price: string;
    category: string;
    image?: string;
    icon?: string;
}

export default function ProductList({ initialProducts }: { initialProducts: Product[] }) {
    const [products, setProducts] = useState(initialProducts);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Form State
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("CCTV");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState<File | null>(null);

    async function handleDelete(id: string) {
        if (!confirm("Are you sure?")) return;
        try {
            const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
            if (res.ok) {
                setProducts(products.filter((p) => p._id !== id));
            } else {
                alert("Failed to delete");
            }
        } catch (e) {
            console.error(e);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("description", desc);
        if (file) formData.append("image", file);

        try {
            const res = await fetch("/api/products", {
                method: "POST",
                body: formData,
            });
            const newProduct = await res.json();
            if (res.ok) {
                setProducts([newProduct, ...products]);
                setIsModalOpen(false);
                // Reset Form
                setName(""); setPrice(""); setDesc(""); setFile(null);
            } else {
                alert("Error: " + newProduct.error);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-primary">Manage Products</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" /> Add Product
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((p) => (
                    <div key={p._id} className="glass-panel p-4 flex flex-col items-center text-center relative group">
                        <button
                            onClick={() => handleDelete(p._id)}
                            className="absolute top-2 right-2 p-2 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="w-24 h-24 mb-4 relative">
                            {p.image ? (
                                <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                            ) : (
                                <div className="w-full h-full bg-white/5 rounded-full flex items-center justify-center">
                                    <span className="text-2xl">📦</span>
                                </div>
                            )}
                        </div>
                        <h3 className="font-semibold text-white mb-1">{p.name}</h3>
                        <span className="text-sm text-gray-400 mb-2">{p.category}</span>
                        <span className="text-lg font-bold text-primary">₹{p.price}</span>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="glass-panel w-full max-w-md p-6 relative">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <h2 className="text-xl font-bold mb-6 text-white">Add New Product</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text" placeholder="Product Name" required
                                className="input-field"
                                value={name} onChange={e => setName(e.target.value)}
                            />
                            <input
                                type="text" placeholder="Price (e.g. 4500)" required
                                className="input-field"
                                value={price} onChange={e => setPrice(e.target.value)}
                            />
                            <select
                                className="input-field bg-surface text-white"
                                value={category} onChange={e => setCategory(e.target.value)}
                            >
                                <option value="CCTV">CCTV Camera</option>
                                <option value="Access Control">Access Control</option>
                                <option value="Biometric">Biometric</option>
                                <option value="Other">Other</option>
                            </select>
                            <textarea
                                placeholder="Description"
                                className="input-field min-h-[80px]"
                                value={desc} onChange={e => setDesc(e.target.value)}
                            />
                            <input
                                type="file" accept="image/*"
                                className="text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-background hover:file:bg-primary-dark"
                                onChange={e => setFile(e.target.files?.[0] || null)}
                            />

                            <button
                                type="submit" disabled={loading}
                                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Saving..." : "Save Product"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
