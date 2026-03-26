import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const viewport: Viewport = {
  themeColor: "#020408",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Locks mobile responsive sizing
};

export const metadata: Metadata = {
  title: "Manoj Security Solutions | Professional CCTV & Security Systems",
  description: "Manoj Security Solutions is a leading provider of Enterprise-Grade CCTV Installation Services, Biometrics, and Access Control in Chithamur, Kanchipuram, and across Tamil Nadu.",
  metadataBase: new URL("https://manojsecuritysolutions.in"),
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Manoj Security Solutions",
    description: "Enterprise-Grade CCTV Installation Services, Biometrics, and Access Control.",
    url: "https://manojsecuritysolutions.in",
    siteName: "Manoj Security Solutions",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body suppressHydrationWarning className={`${inter.variable} bg-black text-white antialiased selection:bg-yellow-600/30 selection:text-yellow-100`}>
        <Providers>
          {children}
          <FloatingWhatsApp />
        </Providers>
      </body>
    </html>
  );
}
