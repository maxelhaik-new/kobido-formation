import type { Metadata } from "next";
import { Quattrocento, Quicksand } from "next/font/google";
import "./globals.css";

const quattrocento = Quattrocento({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-quattrocento",
  display: "swap",
});

const quicksand = Quicksand({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "L’Art du Geste — Sensoa Formation",
  description: "Espace e-learning officiel de la formation Kobido Sensoa.",
  icons: {
    icon: "https://static.wixstatic.com/media/3e7d89_ec66c54ff0c94ba3af405a1505b775c1~mv2.png/v1/fill/w_192,h_192,lg_1,usm_0.66_1.00_0.01/3e7d89_ec66c54ff0c94ba3af405a1505b775c1~mv2.png",
  },
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
    <html lang="fr" className={`${quattrocento.variable} ${quicksand.variable}`}>
      <body className="min-h-screen flex flex-col font-sans bg-[#ffffff] text-[#101010] antialiased">
        {children}
      </body>
    </html>
  );
}
