import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Our Story - Ibal & Aya",
  description: "Jurnal cerita dan foto kenangan perjalanan kebersamaan Ibal dan Aya.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${playfair.variable} ${montserrat.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-[#FFF5F6] text-[#2C2C2C] selection:bg-[#B83E55] selection:text-white"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
