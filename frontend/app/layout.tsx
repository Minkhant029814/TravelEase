// app/layout.tsx
"use client";
import "./globals.css";
import { ReactNode } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        {/* <AppProvider> */}
        <Navbar />
        <main className="container mx-auto p-4">{children}</main>
        <Footer />
        {/* </AppProvider> */}
      </body>
    </html>
  );
}
