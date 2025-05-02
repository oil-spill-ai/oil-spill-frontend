import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import Navbar from "@/components/Navbar";
import { GlobeProvider } from "./globe-context";

export const metadata: Metadata = {
    title: "Oil Spill AI",
    description: "Detecting Pollution, Protecting Our Waters",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="h-full">
            <body className="min-h-screen w-full overflow-x-hidden relative">
                <GlobeProvider>
                    <Navbar />
                    {children}
                </GlobeProvider>
            </body>
        </html>
    );
}