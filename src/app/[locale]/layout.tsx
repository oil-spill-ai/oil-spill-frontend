import type { Metadata } from "next";
import "../globals.css";
import React from "react";
import Navbar from "@/components/Navbar";
import { GlobeProvider } from "../globe-context";
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Oil Spill AI",
    description: "Detecting Pollution, Protecting Our Waters",
    icons: {
        icon: [
            { url: 'favicons/favicon-64x64.png', sizes: '64x64', type: 'image/png' },
            { url: 'favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
            { url: 'favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        ],
    },
};

export default async function RootLayout({
                                             children, params,
                                         }: {
    children: React.ReactNode;
    params: Promise<{locale: string}>;
}) {
    const {locale} = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }
    return (
        <html lang={locale} className="h-full">
            <body className="min-h-screen w-full overflow-x-hidden relative">
                <NextIntlClientProvider>
                    <GlobeProvider>
                        <Navbar />
                        {children}
                        <Footer />
                    </GlobeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}