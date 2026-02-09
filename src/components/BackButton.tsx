
"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton({ className = "", label = "Back" }: { className?: string, label?: string }) {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className={`flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors ${className}`}
        >
            <ArrowLeft className="w-4 h-4" />
            {label}
        </button>
    );
}
