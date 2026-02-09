
"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setStatus('idle');

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            service: formData.get("service"),
            message: formData.get("message")
        };

        try {
            const res = await fetch("/api/inquiries", {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" }
            });
            if (res.ok) {
                setStatus('success');
                (e.target as HTMLFormElement).reset();
            } else {
                setStatus('error');
            }
        } catch (e) {
            console.error(e);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {status === 'success' && (
                <div className="bg-green-50 text-green-700 p-4 rounded-md flex items-center gap-3 border border-green-200 animate-in fade-in slide-in-from-top-2">
                    <CheckCircle className="w-5 h-5" />
                    <p className="font-medium">Message sent successfully! We will contact you soon.</p>
                </div>
            )}

            {status === 'error' && (
                <div className="bg-red-50 text-red-700 p-4 rounded-md flex items-center gap-3 border border-red-200 animate-in fade-in slide-in-from-top-2">
                    <AlertCircle className="w-5 h-5" />
                    <p className="font-medium">Something went wrong. Please try again.</p>
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">Full Name</label>
                    <input id="name" name="name" placeholder="John Doe" required className="input-field" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-foreground">Phone Number</label>
                    <input id="phone" name="phone" placeholder="+91 98765 43210" className="input-field" />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</label>
                <input id="email" name="email" type="email" placeholder="john@example.com" required className="input-field" />
            </div>

            <div className="space-y-2">
                <label htmlFor="service" className="text-sm font-medium text-foreground">Service Required</label>
                <div className="relative">
                    <select id="service" name="service" className="input-field appearance-none">
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="CCTV Installation">CCTV Installation</option>
                        <option value="Biometric Access">Biometric Access</option>
                        <option value="Website Development">Website Development</option>
                        <option value="Annual Maintenance">Annual Maintenance (AMC)</option>
                        <option value="Support">Technical Support</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground">
                        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                <textarea id="message" name="message" placeholder="Tell us more about your requirements..." required className="input-field min-h-[120px] resize-y" />
            </div>

            <button
                type="submit"
                disabled={loading || status === 'success'}
                className="btn-primary w-full py-3 flex items-center justify-center gap-2 text-base shadow-sm hover:shadow-md transition-all"
            >
                {loading ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                    </>
                ) : (
                    <>
                        <Send className="w-4 h-4" />
                        Send Message
                    </>
                )}
            </button>
        </form>
    );
}
