import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Sensoa Formation — Espace Kobido",
  description: "Accès réservé aux apprenants de la formation Kobido Sensoa.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="min-h-screen flex flex-col font-sans bg-[#FAF8F5] text-[#2D241E]">
        {children}
      </body>
    </html>
  );
}
