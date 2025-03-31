import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Header from "@/components/Header";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "@/components/Footer";

const nunito = Nunito({weight: '400', subsets: ["latin"]})

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
    <ClerkProvider>
      <html lang="en">
        <body className={`${nunito.className} pattern`}>
          <Header />
          <main className="container">
            {children}
          </main>
          <Footer />
          <ToastContainer />
        </body>
      </html>
    </ClerkProvider>
  );
}
