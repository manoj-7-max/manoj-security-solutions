
"use client";

import { useState } from "react";
import { Search, Trash2, ShoppingCart, User, Phone, CheckCircle } from "lucide-react";

interface Product {
    _id: string;
    name: string;
    price: string;
    category: string;
    image?: string;
    icon?: string;
}

export default function PointOfSale({ products }: { products: Product[] }) {
    const [cart, setCart] = useState<(Product & { quantity: number })[]>([]);
    const [search, setSearch] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [phone, setPhone] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Cash");
    const [loading, setLoading] = useState(false);

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    function addToCart(product: Product) {
        const existing = cart.find(i => i._id === product._id);
        if (existing) {
            setCart(cart.map(i => i._id === product._id ? { ...i, quantity: i.quantity + 1 } : i));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    }

    function removeFromCart(id: string) {
        setCart(cart.filter(i => i._id !== id));
    }

    function updateQty(id: string, delta: number) {
        setCart(cart.map(i => {
            if (i._id === id) {
                const newQty = Math.max(1, i.quantity + delta);
                return { ...i, quantity: newQty };
            }
            return i;
        }));
    }

    const subtotal = cart.reduce((sum, i) => sum + (parseFloat(i.price.replace(/[^0-9.]/g, '') || '0') * i.quantity), 0);
    const tax = subtotal * 0.18;
    const total = subtotal + tax;

    async function handleCheckout() {
        if (!customerName) return alert("Please enter customer name");
        if (cart.length === 0) return alert("Cart is empty");

        setLoading(true);
        try {
            const orderData = {
                customerName,
                phone,
                items: cart.map(i => ({
                    productId: i._id,
                    name: i.name,
                    price: parseFloat(i.price.replace(/[^0-9.]/g, '') || '0'),
                    quantity: i.quantity,
                    total: parseFloat(i.price.replace(/[^0-9.]/g, '') || '0') * i.quantity
                })),
                totalAmount: total,
                paymentMethod
            };

            const res = await fetch("/api/orders", {
                method: "POST",
                body: JSON.stringify(orderData),
                headers: { "Content-Type": "application/json" }
            });
            const data = await res.json();

            if (data.success) {
                // WhatsApp Logic
                const text = `*Manoj Security Solutions*\nInvoice: ${data.order.invoiceNo || 'N/A'}\nDate: ${new Date().toLocaleDateString()}\n------------------------------\n${cart.map(i => `${i.name} x${i.quantity} = ₹${(parseFloat(i.price.replace(/[^0-9.]/g, '') || '0') * i.quantity).toLocaleString()}`).join('\n')}\n------------------------------\n*Total: ₹${total.toLocaleString()}*\nPayment: ${paymentMethod}\nThank you!`;

                if (phone && confirm("Order Saved! Send Bill to WhatsApp?")) {
                    window.open(`https://wa.me/91${phone}?text=${encodeURIComponent(text)}`, "_blank");
                } else {
                    alert("Order Saved Successfully!");
                }

                setCart([]);
                setCustomerName("");
                setPhone("");
            } else {
                alert("Error: " + data.error);
            }
        } catch (e) {
            console.error(e);
            alert("Failed to checkout");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-120px)] overflow-hidden">
            {/* Products Panel */}
            <div className="flex-1 flex flex-col glass-panel p-4 overflow-hidden relative">
                <div className="mb-4 relative z-10">
                    <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <input
                        type="text" placeholder="Search Products..."
                        className="input-field pl-10 py-3 bg-surface border-white/10"
                        value={search} onChange={e => setSearch(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto pr-2 pb-20 custom-scrollbar content-start">
                    {filteredProducts.map(p => (
                        <div
                            key={p._id}
                            onClick={() => addToCart(p)}
                            className="bg-white/5 border border-white/5 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(102,252,241,0.1)] rounded-lg p-3 cursor-pointer hover:bg-white/10 transition-all group flex flex-col items-center text-center h-[180px]"
                        >
                            <div className="h-24 w-full flex items-center justify-center mb-2 bg-black/20 rounded-lg p-2">
                                {p.image ? (
                                    <img src={p.image} className="h-full w-full object-contain" alt={p.name} />
                                ) : (
                                    <span className="text-3xl opacity-30">📦</span>
                                )}
                            </div>
                            <h4 className="font-semibold text-sm line-clamp-2 h-10 w-full flex items-center justify-center text-white/90">{p.name}</h4>
                            <span className="text-primary font-bold mt-1 text-sm">₹{p.price}</span>
                        </div>
                    ))}
                </div>
                {filteredProducts.length === 0 && (
                    <div className="flex-1 flex items-center justify-center text-gray-500">
                        No products found
                    </div>
                )}
            </div>

            {/* Cart Panel */}
            <div className="w-full md:w-96 glass-panel p-4 flex flex-col h-full border-l border-white/10 shadow-2xl">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <ShoppingCart className="text-primary" /> Current Order
                </h2>

                <div className="mb-4 space-y-3">
                    <div className="flex items-center bg-white/5 rounded-md px-3 border border-white/10 focus-within:border-primary transition-colors">
                        <User className="text-gray-400 w-4 h-4 mr-2" />
                        <input
                            type="text" placeholder="Customer Name"
                            className="bg-transparent border-none outline-none py-2 text-white w-full placeholder-gray-500 text-sm"
                            value={customerName} onChange={e => setCustomerName(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center bg-white/5 rounded-md px-3 border border-white/10 focus-within:border-primary transition-colors">
                        <Phone className="text-gray-400 w-4 h-4 mr-2" />
                        <input
                            type="text" placeholder="Phone Number"
                            className="bg-transparent border-none outline-none py-2 text-white w-full placeholder-gray-500 text-sm"
                            value={phone} onChange={e => setPhone(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2 mb-4 pr-1 custom-scrollbar bg-black/20 rounded-lg p-2">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500 min-h-[150px]">
                            <ShoppingCart className="w-12 h-12 mb-2 opacity-20" />
                            <p className="text-sm">Cart is Empty</p>
                        </div>
                    ) : (
                        cart.map(item => (
                            <div key={item._id} className="bg-surface p-3 rounded flex justify-between items-center group border border-white/5 hover:border-white/20 transition-colors">
                                <div className="flex-1 min-w-0 mr-2">
                                    <h5 className="font-medium text-sm truncate text-white">{item.name}</h5>
                                    <div className="text-xs text-gray-400">₹{item.price} x {item.quantity}</div>
                                </div>
                                <div className="flex items-center gap-1 shrink-0">
                                    <button onClick={() => updateQty(item._id, -1)} className="w-6 h-6 flex items-center justify-center bg-white/10 rounded hover:bg-white/20 text-white">-</button>
                                    <span className="text-sm w-5 text-center font-mono text-white">{item.quantity}</span>
                                    <button onClick={() => updateQty(item._id, 1)} className="w-6 h-6 flex items-center justify-center bg-white/10 rounded hover:bg-white/20 text-white">+</button>
                                    <button onClick={() => removeFromCart(item._id)} className="text-red-400 hover:text-red-500 ml-1 p-1">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="space-y-2 text-sm border-t border-white/10 pt-4 mb-4 bg-surface/50 p-3 rounded-lg">
                    <div className="flex justify-between text-gray-400">
                        <span>Subtotal</span>
                        <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                        <span>Tax (18%)</span>
                        <span>₹{tax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-primary pt-2 border-t border-white/10 mt-2">
                        <span>Total</span>
                        <span>₹{total.toLocaleString()}</span>
                    </div>
                </div>

                <select
                    className="w-full bg-surface border border-white/10 rounded p-2 mb-3 text-white outline-none focus:border-primary text-sm"
                    value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}
                >
                    <option value="Cash">Cash</option>
                    <option value="UPI">UPI</option>
                    <option value="Card">Card</option>
                </select>

                <button
                    onClick={handleCheckout}
                    disabled={loading || cart.length === 0}
                    className="btn-primary w-full py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm uppercase tracking-wide shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all transform active:scale-95"
                >
                    {loading ? "Processing..." : (
                        <>
                            <CheckCircle className="w-4 h-4" /> Complete Order
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
