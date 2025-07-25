import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/ui/header"; 
import { Toaster } from "../components/ui/sonner";
import type { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Finance tracker",
  description: "One stop Finance Platform",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return ( 
    <html lang="en">
      <head>
        <link rel="icon" href="/logo-sm.png" sizes="any" />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Toaster richColors />

        <footer className="bg-blue-50 py-12">
          <div className="container mx-auto px-4 text-center text-gray-600">
            <p>Made by Nitin Gupta ©️2025</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
