
import { Inter } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import ClientProvider from "@/components/ClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Manoj Security Solutions",
  description: "Advanced Security Systems for Home and Business",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProvider>
          {children}
          <WhatsAppButton />
        </ClientProvider>
      </body>
    </html>
  );
}
