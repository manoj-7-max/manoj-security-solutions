
"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
    return (
        <a
            href="https://wa.me/919043210007"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform z-50 flex items-center gap-2"
        >
            <MessageCircle className="w-6 h-6" />
            <span className="font-bold hidden md:inline">Chat with us</span>
        </a>
    );
}
