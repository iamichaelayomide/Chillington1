import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chillington Bites | Shawarma Delivery in Akure",
  description: "Fast single-page shawarma ordering experience for Chillington Bites, Akure.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
