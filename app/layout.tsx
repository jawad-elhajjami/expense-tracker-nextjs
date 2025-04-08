import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Header from "@/components/Header";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "@/components/Footer";
import { CurrencyProvider } from '@/context/CurrencyContext'
import CurrencySelector from '@/components/CurrencySelector'

const geist = Geist({weight: '400', subsets: ["latin"]})

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Track your expenses and create a budget.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <html lang="en">
          <body className={`${geist.className}`}>
              <ClerkProvider>
                <CurrencyProvider>
                      <Header />
                      <main>
                        {children}
                      </main>
                      <Footer />
                      <ToastContainer />
                </CurrencyProvider>
              </ClerkProvider>
          </body>
        </html>
  );
}
