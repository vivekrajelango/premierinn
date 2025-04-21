import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "../globals.css";
import StoreProvider from "@/store/StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Generate metadata for the page
export async function generateMetadata({ 
  params 
}: { 
  params: { locale: string } 
}): Promise<Metadata> {
  // Get the locale from params
  const locale = params.locale;
  
  return {
    title: "Premier Inn Group Booking",
    description: "Group booking form for Premier Inn hotels",
    // You can add locale-specific metadata here if needed
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  // Get the locale from params
  const locale = params.locale;
  
  // Get messages for the current locale
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <StoreProvider>
          <div className="min-h-screen bg-white text-gray-900 transition-colors">
            {children}
          </div>
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}