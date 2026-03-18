import type { Metadata } from 'next';
import '../vanilla/css/variables.css';
import '../vanilla/css/base.css';
import '../vanilla/css/layout.css';
import '../vanilla/css/components.css';
import '../vanilla/css/themes.css';
import './globals.css';
import Script from 'next/script';
import ClientLayout from '../components/ClientLayout';

export const metadata: Metadata = {
    title: {
        default: 'Tools Repository — 100+ Free Online Utility Tools',
        template: '%s | Tools Repository'
    },
    description: 'A collection of 100+ free, fast, and easy-to-use utility tools for designers, developers, and creators. No tracking, no login, 100% free.',
    keywords: ['online tools', 'developer tools', 'text converters', 'calculators', 'unit converters', 'productivity tools'],
    authors: [{ name: 'Tools Repository' }],
    creator: 'Tools Repository',
    publisher: 'Tools Repository',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        title: 'Tools Repository — Free Online Tools for Everyday Use',
        description: 'High-performance browser tools for the modern web.',
        url: 'https://toolsrepository.com',
        siteName: 'Tools Repository',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Tools Repository',
        description: 'Free Online Tools for Everyday Use',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'G-46PCXFL4KR',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;600;700&display=swap" rel="stylesheet" />
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-46PCXFL4KR"
                    strategy="lazyOnload"
                />
                <Script id="google-analytics" strategy="lazyOnload">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'G-46PCXFL4KR');
                    `}
                </Script>
            </head>
            <body>
                <ClientLayout>
                    {children}
                </ClientLayout>
            </body>
        </html>
    );
}
