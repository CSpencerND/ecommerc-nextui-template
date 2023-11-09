import { Header } from "@/components/header";
import { Providers } from "./providers";

import { siteConfig } from "@/config";
import { cn } from "@/lib";

import { GeistSans } from "geist/font/sans";
import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            lang="en"
            className="dark"
            style={{ colorScheme: "dark" }}
        >
            <body className={cn(
                "min-h-screen bg-background text-foreground",
                GeistSans.className
            )}>
                <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
                    <div className="relative flex flex-col h-screen">
                        <Header />
                        <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
                            {children}
                        </main>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
