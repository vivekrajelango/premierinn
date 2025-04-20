import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Premier Inn Group Booking",
  description: "Group booking form for Premier Inn hotels",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen bg-white text-gray-900 transition-colors">
          <header className="border-b border-gray-200 py-4">
            <div className="container mx-auto px-4 flex justify-between items-center">
              {/* Theme toggle removed */}
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
