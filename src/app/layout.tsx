import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chillington Bites | Hot Shawarma in Akure",
  description: "Order the best shawarma in Akure online. Fast delivery and simple WhatsApp ordering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}