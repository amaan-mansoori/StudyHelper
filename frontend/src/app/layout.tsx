import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import AuthInitializer from '@/components/auth-initializer';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Study Notes & Assignment Helper',
    description: 'A premium platform for students.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={cn("min-h-screen font-sans", inter.variable)}>
            <body className="min-h-screen bg-background font-sans antialiased">
                <AuthInitializer />
                {children}
            </body>
        </html>
    );
}
