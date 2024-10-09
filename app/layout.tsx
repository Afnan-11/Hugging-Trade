import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";


const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  
});

export const metadata: Metadata = {
  title: "Hugging Trade",
  description: "Simple pricing, unbeatable returns.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}  `}
      >
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
