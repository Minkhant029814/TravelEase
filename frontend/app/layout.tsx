"use client";
import "./globals.css";
import React, { ReactNode } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AppHook, AppProvider } from "@/context/AppProvider";
import { Toaster } from "sonner";

function LayoutContent({ children }: { children: ReactNode }) {
    const { user } = AppHook();

    if (user?.role === "admin") {
        return (
            <>
                <Toaster position="top-center" richColors />
                <main className="">{children}</main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Toaster position="top-center" richColors />
            <Navbar />
            <main className="container mx-auto p-4">{children}</main>
            <Footer />
        </>
    );
}

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body className="min-h-screen bg-gray-100">
                <AppProvider>
                    <LayoutContent>{children}</LayoutContent>
                </AppProvider>
            </body>
        </html>
    );
}
