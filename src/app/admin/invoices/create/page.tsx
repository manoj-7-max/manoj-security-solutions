"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Printer, CheckCircle, Loader2, Receipt } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function InvoiceBuilder() {
    const [items, setItems] = useState<any[]>([
        { id: 1, name: "", qty: 1, rate: 0 },
    ]);
    const [products, setProducts] = useState<any[]>([]);
    const [discount, setDiscount] = useState(0);
    const [gstEnabled, setGstEnabled] = useState(true);
    const [clientName, setClientName] = useState("");
    const [clientPhone, setClientPhone] = useState("");
    const [clientAddress, setClientAddress] = useState("");
    const [invoiceNo, setInvoiceNo] = useState(`INV-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${Math.floor(Math.random() * 1000)}`);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/products");
                const data = await res.json();
                if (data.products) setProducts(data.products);
            } catch (e) {
                console.error("Failed to load products", e);
            }
        };
        fetchProducts();
    }, []);

    // Computations
    const subtotal = items.reduce((acc, curr) => acc + curr.qty * curr.rate, 0);
    const totalAfterDiscount = subtotal - discount;
    const gst = gstEnabled ? totalAfterDiscount * 0.18 : 0;
    const grandTotal = totalAfterDiscount + gst;

    const handleAddItem = () => {
        setItems([...items, { id: Date.now(), name: "", qty: 1, rate: 0 }]);
    };

    const updateItem = (id: number, field: string, value: any) => {
        setItems(items.map((i) => {
            if (i.id === id) {
                if (field === "name") {
                    const selectedProd = products.find(p => p.name === value);
                    return { ...i, name: value, rate: selectedProd ? selectedProd.basePrice : i.rate };
                }
                return { ...i, [field]: value };
            }
            return i;
        }));
    };

    const removeItem = (id: number) => {
        setItems(items.filter((i) => i.id !== id));
    };

    const handleExportPDF = async () => {
        setIsGenerating(true);

        try {
            // 1. SAVE TO DATABASE
            const invoiceData = {
                invoiceNo,
                clientName: clientName || "Walk-in Client",
                clientPhone,
                clientAddress,
                items: items.map(i => ({ name: i.name, qty: i.qty, rate: i.rate, total: i.qty * i.rate })),
                subtotal,
                discount,
                gst,
                grandTotal
            };
            await fetch("/api/invoices", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(invoiceData)
            });

            // 2. GENERATE PDF
            const doc = new jsPDF();

            // Colors
            const primaryColor: [number, number, number] = [212, 175, 55]; // Gold
            const secondaryColor: [number, number, number] = [20, 20, 20]; // Dark

            // Header
            doc.setFillColor(...secondaryColor);
            doc.rect(0, 0, 210, 50, "F");
            doc.setTextColor(...primaryColor);
            doc.setFontSize(24);
            doc.setFont("helvetica", "bold");
            doc.text("MANOJ SECURITY SOLUTIONS", 14, 25);

            doc.setTextColor(255, 255, 255);
            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.text("Secure Your Assets. Digitize Your Future.", 14, 32);
            doc.text("GSTIN: 33XXXXXXXXXXXXX", 14, 39); // Placeholder GSTIN

            doc.setFontSize(18);
            doc.setTextColor(...primaryColor);
            doc.text("TAX INVOICE", 150, 25);

            doc.setFontSize(10);
            doc.setTextColor(200, 200, 200);
            doc.text(`Invoice No: ${invoiceNo}`, 150, 32);
            doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 39);

            // Client Details
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            doc.text("Billed To:", 14, 65);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.text(clientName || "Client Name", 14, 72);
            doc.text(clientPhone || "Phone Number", 14, 78);
            if (clientAddress) doc.text(clientAddress, 14, 84);

            // Table
            const tableData = items.map((item, idx) => [
                idx + 1,
                item.name || "Item description",
                item.qty.toString(),
                `Rs. ${item.rate.toLocaleString()}`,
                `Rs. ${(item.qty * item.rate).toLocaleString()}`
            ]);

            autoTable(doc, {
                startY: 95,
                head: [["S.No", "Description / Product", "Qty", "Unit Price", "Total"]],
                body: tableData,
                theme: "striped",
                headStyles: { fillColor: secondaryColor, textColor: primaryColor },
                styles: { fontSize: 10 }
            });

            // Calculations
            const finalY = (doc as any).lastAutoTable.finalY || 95;
            doc.setFont("helvetica", "normal");
            doc.text(`Subtotal: Rs. ${subtotal.toLocaleString()}`, 135, finalY + 15);
            if (discount > 0) doc.text(`Discount: Rs. ${discount.toLocaleString()}`, 135, finalY + 22);
            if (gstEnabled) doc.text(`GST (18%): Rs. ${gst.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, 135, finalY + 29);

            doc.setFont("helvetica", "bold");
            doc.setFontSize(14);
            doc.text(`Total Due: Rs. ${grandTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, 135, finalY + 40);

            // Footer / Bank details
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.text("Bank Details:", 14, finalY + 15);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.text("Bank Name: HDFC Bank", 14, finalY + 21);
            doc.text("Account Name: Manoj Security Solutions", 14, finalY + 26);
            doc.text("A/C No: 50200000000000", 14, finalY + 31);
            doc.text("IFSC Code: HDFC0000001", 14, finalY + 36);

            doc.setFontSize(8);
            doc.setTextColor(150, 150, 150);
            doc.text("Authorized Signatory", 170, finalY + 65, { align: "center" });
            doc.setDrawColor(150, 150, 150);
            doc.line(145, finalY + 60, 195, finalY + 60);

            doc.text("Thank you for choosing Manoj Security Solutions. Secure your future with us.", 105, 280, { align: "center" });

            doc.save(`Invoice_${invoiceNo}_${clientName.replace(/\s+/g, '_') || "ManojSecurity"}.pdf`);
        } catch (error) {
            console.error("PDF Generation failed", error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-display font-medium text-white mb-2">Automatic Invoice Generator</h2>
                    <p className="text-zinc-500 font-light text-sm tracking-wider">Create official tax invoices ready for print or dispatch.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Col: Details & items */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#111] p-6 rounded-2xl border border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/5 rounded-bl-full pointer-events-none"></div>
                        <h3 className="text-sm uppercase font-bold tracking-widest text-[#d4af37] mb-6 flex items-center gap-2">
                            <Receipt className="w-4 h-4" /> Billed Entity
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Client Name (*)</label>
                                <input value={clientName} onChange={(e) => setClientName(e.target.value)} type="text" placeholder="John Doe" className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-3 text-white focus:border-[#d4af37]/50 focus:outline-none transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Contact Number</label>
                                <input value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} type="tel" placeholder="+91" className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-3 text-white focus:border-[#d4af37]/50 focus:outline-none transition-colors" />
                            </div>
                            <div className="space-y-2 col-span-2">
                                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Billing Address</label>
                                <textarea value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} rows={2} placeholder="123 Street Name, City" className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-3 text-white focus:border-[#d4af37]/50 focus:outline-none transition-colors resize-none"></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#111] p-6 rounded-2xl border border-white/5">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-sm uppercase font-bold tracking-widest text-zinc-400">Ledger Items</h3>
                            <button onClick={handleAddItem} className="text-xs font-bold uppercase tracking-wider bg-[#d4af37]/10 hover:bg-[#d4af37]/20 text-[#d4af37] px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors">
                                <Plus className="w-3 h-3" /> Add Product
                            </button>
                        </div>

                        <div className="space-y-4">
                            {items.map((item, index) => (
                                <div key={item.id} className="flex gap-4 items-center bg-[#1A1A1A]/50 p-3 rounded-xl border border-white/5">
                                    <div className="flex-1 space-y-1 relative">
                                        <span className="text-[9px] text-zinc-600 uppercase font-bold absolute -top-1 left-2 bg-[#1A1A1A] px-1 z-10">Product / Service</span>
                                        <select value={item.name} onChange={(e) => updateItem(item.id, "name", e.target.value)} className="w-full bg-transparent border border-white/10 rounded-lg p-2.5 text-white font-medium focus:border-[#d4af37]/50 focus:outline-none text-sm appearance-none relative">
                                            <option value="" disabled className="bg-black text-zinc-500">Select Item...</option>
                                            {products.map(p => (
                                                <option key={p._id} value={p.name} className="bg-black">{p.name}</option>
                                            ))}
                                            <option value="Custom Wiring" className="bg-black">Custom Wiring (Variable)</option>
                                            <option value="Installation Labor" className="bg-black">Installation Labor</option>
                                        </select>
                                    </div>
                                    <div className="w-20 space-y-1 relative">
                                        <span className="text-[9px] text-zinc-600 uppercase font-bold absolute -top-1 left-2 bg-[#1A1A1A] px-1">Qty</span>
                                        <input type="number" value={item.qty} onChange={(e) => updateItem(item.id, "qty", Number(e.target.value))} className="w-full bg-transparent border border-white/10 rounded-lg p-2.5 text-center text-white focus:border-[#d4af37]/50 focus:outline-none text-sm font-mono" />
                                    </div>
                                    <div className="w-28 space-y-1 relative">
                                        <span className="text-[9px] text-zinc-600 uppercase font-bold absolute -top-1 left-2 bg-[#1A1A1A] px-1">Rate(₹)</span>
                                        <input type="number" value={item.rate} onChange={(e) => updateItem(item.id, "rate", Number(e.target.value))} className="w-full bg-transparent border border-white/10 rounded-lg p-2.5 text-right text-white focus:border-[#d4af37]/50 focus:outline-none text-sm font-mono" />
                                    </div>
                                    <div className="w-28 flex items-center justify-end font-mono text-white text-lg font-bold bg-transparent h-10 px-3">
                                        ₹{(item.qty * item.rate).toLocaleString()}
                                    </div>
                                    <button onClick={() => removeItem(item.id)} className="p-2 text-zinc-600 hover:text-red-500 transition-colors bg-white/5 rounded-lg border border-transparent hover:border-red-500/30">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Col: Calculation & Action */}
                <div className="space-y-6">
                    <div className="bg-[#111] p-6 rounded-2xl border border-white/5 sticky top-24 shadow-2xl">

                        <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/5">
                            <div>
                                <span className="text-[10px] uppercase font-bold tracking-widest text-[#d4af37]">Invoice Ref</span>
                                <div className="text-white font-mono text-sm">{invoiceNo}</div>
                            </div>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-zinc-400 font-medium">
                                <span>Subtotal</span>
                                <span className="font-mono text-white">₹{subtotal.toLocaleString()}</span>
                            </div>

                            <div className="flex items-center gap-4 py-2">
                                <label className="text-sm text-zinc-400 flex-1">Apply Discount (₹)</label>
                                <input type="number" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} className="w-24 bg-[#1A1A1A] border border-white/10 rounded-lg p-2 text-right text-white focus:border-[#d4af37]/50 focus:outline-none font-mono text-sm" />
                            </div>

                            <div className="flex items-center justify-between border-t border-white/5 pt-4 group cursor-pointer" onClick={() => setGstEnabled(!gstEnabled)}>
                                <div>
                                    <span className="text-sm text-zinc-400">Federal Tax (GST 18%)</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-4 rounded-full transition-colors flex items-center ${gstEnabled ? 'bg-[#d4af37]' : 'bg-zinc-800'}`}>
                                        <div className={`w-3 h-3 bg-black rounded-full shadow-sm transform transition-transform mx-0.5 ${gstEnabled ? 'translate-x-4' : 'translate-x-0'}`} />
                                    </div>
                                    <span className="font-mono text-zinc-300">₹{gst.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#1a1a1a] rounded-xl p-4 mb-6 border border-[#d4af37]/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-[#d4af37]/10 rounded-bl-full pointer-events-none"></div>
                            <div className="flex justify-between items-baseline mb-1 relative z-10">
                                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Total Due</span>
                                <span className="text-3xl font-mono font-medium text-[#d4af37] tracking-tighter">₹{grandTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button onClick={handleExportPDF} disabled={isGenerating} className="w-full bg-[#d4af37] text-black font-bold uppercase tracking-widest text-xs py-4 rounded-xl flex justify-center items-center gap-2 hover:bg-yellow-500 transition-all shadow-lg shadow-[#d4af37]/20 hover:shadow-[#d4af37]/40 disabled:opacity-50">
                                {isGenerating ? <Loader2 className="w-4 h-4 animate-spin text-black" /> : <Printer className="w-4 h-4" />}
                                {isGenerating ? "Processing..." : "Generate PDF Invoice"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
