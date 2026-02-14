
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";

interface Product {
    _id: string;
    name: string;
    price: string;
}

interface OrderItem {
    productId?: string;
    name: string;
    price: number;
    quantity: number;
    total: number;
}

export default function CreateInvoicePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);

    // Form State
    const [customerName, setCustomerName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState(""); // Not saving to Order yet but good to have
    const [paymentMethod, setPaymentMethod] = useState("Cash");

    const [items, setItems] = useState<OrderItem[]>([{ name: "", price: 0, quantity: 1, total: 0 }]);

    // Result State
    const [successData, setSuccessData] = useState<any>(null);

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error("Failed to load products", err));
    }, []);

    const handleItemChange = (index: number, field: keyof OrderItem, value: any) => {
        const newItems = [...items];

        if (field === "productId") {
            const product = products.find(p => p._id === value);
            if (product) {
                newItems[index].productId = product._id;
                newItems[index].name = product.name;
                // Try to parse price if it's a string like "1000" or "Rs. 1000"
                const parsedPrice = parseFloat(product.price?.toString().replace(/[^0-9.]/g, '') || "0");
                newItems[index].price = parsedPrice;
            }
        } else if (field === "price" || field === "quantity") {
            (newItems[index] as any)[field] = parseFloat(value) || 0;
        } else {
            (newItems[index] as any)[field] = value;
        }

        // Recalculate total
        newItems[index].total = newItems[index].price * newItems[index].quantity;
        setItems(newItems);
    };

    const addItem = () => {
        setItems([...items, { name: "", price: 0, quantity: 1, total: 0 }]);
    };

    const removeItem = (index: number) => {
        if (items.length > 1) {
            setItems(items.filter((_, i) => i !== index));
        }
    };

    const calculateTotal = () => {
        return items.reduce((sum, item) => sum + item.total, 0);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customerName,
                    phone,
                    email,
                    items,
                    totalAmount: calculateTotal(),
                    paymentMethod
                })
            });

            const data = await res.json();
            if (res.ok) {
                setSuccessData(data);
            } else {
                alert("Error creating invoice: " + data.error);
            }
        } catch (error) {
            console.error(error);
            alert("Failed to submit");
        } finally {
            setLoading(false);
        }
    };

    if (successData) {
        return (
            <div className="max-w-2xl mx-auto p-6 space-y-6">
                <div className="glass-panel p-8 text-center space-y-4 border-l-4 border-green-500">
                    <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Save className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Invoice Created Successfully!</h2>
                    <p className="text-gray-400">Invoice #{successData.order.invoiceNo}</p>

                    {successData.newPassword && (
                        <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg mt-6">
                            <h3 className="text-yellow-500 font-bold mb-2">New User Created</h3>
                            <p className="text-sm text-gray-300 mb-2">Please share these credentials with the customer:</p>
                            <div className="grid grid-cols-2 gap-4 text-left max-w-xs mx-auto bg-black/20 p-4 rounded">
                                <span className="text-gray-400">Email/Phone:</span>
                                <span className="text-white font-mono">{email || phone}</span>
                                <span className="text-gray-400">Password:</span>
                                <span className="text-primary font-mono font-bold text-lg">{successData.newPassword}</span>
                            </div>
                        </div>
                    )}

                    <div className="flex gap-4 justify-center mt-8">
                        <button onClick={() => {
                            setSuccessData(null);
                            setCustomerName(""); setPhone(""); setEmail(""); setItems([{ name: "", price: 0, quantity: 1, total: 0 }]);
                        }} className="btn-secondary">
                            Create Another
                        </button>
                        <Link href="/admin/invoice" className="btn-primary">
                            View Invoices
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/invoice" className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-2xl font-bold text-white">Create New Invoice</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Customer Details */}
                <div className="glass-panel p-6 space-y-4">
                    <h2 className="text-lg font-semibold text-primary border-b border-white/5 pb-2">Customer Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Customer Name *</label>
                            <input required className="input-field w-full" value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="Enter name" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Phone Number *</label>
                            <input required className="input-field w-full" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Enter phone" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Email Address</label>
                            <input type="email" className="input-field w-full" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email (optional)" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Address</label>
                            <input className="input-field w-full" value={address} onChange={e => setAddress(e.target.value)} placeholder="Enter address (optional)" />
                        </div>
                    </div>
                </div>

                {/* Items */}
                <div className="glass-panel p-6 space-y-4">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                        <h2 className="text-lg font-semibold text-primary">Invoice Items</h2>
                        <button type="button" onClick={addItem} className="text-sm text-primary hover:text-white flex items-center gap-1">
                            <Plus className="w-4 h-4" /> Add Item
                        </button>
                    </div>

                    <div className="space-y-3">
                        {items.map((item, idx) => (
                            <div key={idx} className="grid grid-cols-12 gap-2 items-end bg-white/5 p-3 rounded-lg">
                                <div className="col-span-12 md:col-span-4">
                                    <label className="text-xs text-gray-500 block mb-1">Product / Description</label>
                                    <div className="space-y-2">
                                        <select
                                            className="input-field w-full text-sm py-1"
                                            onChange={e => handleItemChange(idx, 'productId', e.target.value)}
                                            value={item.productId || ""}
                                        >
                                            <option value="">Select Product...</option>
                                            {products.map(p => (
                                                <option key={p._id} value={p._id}>{p.name} - ₹{p.price}</option>
                                            ))}
                                        </select>
                                        <input
                                            className="input-field w-full text-sm py-1"
                                            placeholder="Item Name"
                                            value={item.name}
                                            onChange={e => handleItemChange(idx, 'name', e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-span-4 md:col-span-2">
                                    <label className="text-xs text-gray-500 block mb-1">Price</label>
                                    <input
                                        type="number"
                                        className="input-field w-full text-sm py-1"
                                        value={item.price}
                                        onChange={e => handleItemChange(idx, 'price', e.target.value)}
                                        required
                                        min="0"
                                    />
                                </div>
                                <div className="col-span-4 md:col-span-2">
                                    <label className="text-xs text-gray-500 block mb-1">Qty</label>
                                    <input
                                        type="number"
                                        className="input-field w-full text-sm py-1"
                                        value={item.quantity}
                                        onChange={e => handleItemChange(idx, 'quantity', e.target.value)}
                                        required
                                        min="1"
                                    />
                                </div>
                                <div className="col-span-3 md:col-span-3">
                                    <label className="text-xs text-gray-500 block mb-1">Total</label>
                                    <div className="input-field bg-black/20 text-white font-mono text-right py-1">
                                        ₹{item.total.toFixed(2)}
                                    </div>
                                </div>
                                <div className="col-span-1 md:col-span-1 flex justify-center pb-1">
                                    {items.length > 1 && (
                                        <button type="button" onClick={() => removeItem(idx)} className="text-red-400 hover:text-red-300">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end pt-4 border-t border-white/5">
                        <div className="text-right">
                            <span className="text-gray-400 mr-4">Total Amount:</span>
                            <span className="text-2xl font-bold text-white">₹{calculateTotal().toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* Submit */}
                <div className="glass-panel p-6 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <span className="text-gray-400">Payment Method:</span>
                        <select
                            className="input-field"
                            value={paymentMethod}
                            onChange={e => setPaymentMethod(e.target.value)}
                        >
                            <option value="Cash">Cash</option>
                            <option value="Card">Card</option>
                            <option value="UPI">UPI</option>
                            <option value="Bank Transfer">Bank Transfer</option>
                        </select>
                    </div>

                    <button disabled={loading} className="btn-primary px-8 py-3 flex items-center gap-2">
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        Generate Invoice
                    </button>
                </div>
            </form>
        </div>
    );
}
