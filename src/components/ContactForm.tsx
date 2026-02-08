
"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

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
                setSuccess(true);
                (e.target as HTMLFormElement).reset();
            } else {
                alert("Failed to send message.");
            }
        } catch (e) {
            console.error(e);
            alert("Error sending message.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {success && (
                <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-3 rounded text-center">
                    Message sent successfully! We will contact you soon.
                </div>
            )}
            <div className="grid md:grid-cols-2 gap-4">
                <input name="name" placeholder="Your Name" required className="input-field" />
                <input name="phone" placeholder="Phone Number" className="input-field" />
            </div>
            <input name="email" type="email" placeholder="Email Address" required className="input-field" />
            <select name="service" className="input-field bg-surface text-gray-300">
                <option value="General Inquiry">General Inquiry</option>
                <option value="CCTV Installation">CCTV Installation</option>
                <option value="Biometric Access">Biometric Access</option>
                <option value="Support">Technical Support</option>
            </select>
            <textarea name="message" placeholder="How can we help you?" required className="input-field min-h-[120px]" />

            <button disabled={loading || success} className="btn-primary w-full py-3 flex items-center justify-center gap-2">
                {loading ? "Sending..." : <><Send className="w-4 h-4" /> Send Message</>}
            </button>
        </form>
    );
}
