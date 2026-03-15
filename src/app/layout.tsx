'use client';

import type { Metadata } from 'next';
import '../vanilla/css/variables.css';
import '../vanilla/css/base.css';
import '../vanilla/css/layout.css';
import '../vanilla/css/components.css';
import '../vanilla/css/themes.css';
import './globals.css';
import Link from 'next/link';
import { useState } from 'react';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;600;700&display=swap" rel="stylesheet" />
            </head>
            <body>
                <div id="app">
                    <header className="header">
                        <div className="header__container">
                            <Link href="/" onClick={() => setIsMenuOpen(false)}>
                                <img src="/logo.svg" alt="Tools Repository" className="header__logo-img" />
                            </Link>

                            <button
                                className="header__nav-mobile-toggle"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                aria-label="Toggle Navigation"
                            >
                                {isMenuOpen ? '✕' : '☰'}
                            </button>

                            <nav className={`header__nav ${isMenuOpen ? 'open' : ''}`}>
                                <Link href="/" className="header__link" onClick={() => setIsMenuOpen(false)}>Home</Link>
                                <Link href="/about" className="header__link" onClick={() => setIsMenuOpen(false)}>About</Link>
                                <Link href="/contact" className="header__link" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                                <Link href="/advertise" className="header__link" onClick={() => setIsMenuOpen(false)}>Advertise with us</Link>
                                <Link
                                    href="/#tools"
                                    className="btn btn--blue btn--sm"
                                    onClick={() => setIsMenuOpen(false)}
                                    style={{
                                        textDecoration: 'none',
                                        fontWeight: 'var(--fw-bold)',
                                        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
                                    }}
                                >
                                    Get Started
                                </Link>
                            </nav>
                        </div>
                    </header>

                    <main className="main">
                        {children}
                    </main>

                    <footer className="footer">
                        <div className="footer__container">
                            <div className="footer__inner">
                                <div className="footer__column">
                                    <Link href="/">
                                        <img src="/logo.svg" alt="Tools Repository" className="footer__logo-img" />
                                    </Link>
                                    <p className="footer__column-text">
                                        High-performance browser tools for developers and creators. No tracking, 100% free, forever.
                                    </p>
                                </div>
                                <div className="footer__column">
                                    <h3 className="footer__column-title">Explore</h3>
                                    <Link href="/" className="footer__link">Home</Link>
                                    <Link href="/about" className="footer__link">About Us</Link>
                                    <Link href="/contact" className="footer__link">Contact</Link>
                                    <Link href="/advertise" className="footer__link">Advertise with Us</Link>
                                </div>
                                <div className="footer__column">
                                    <h3 className="footer__column-title">Legal</h3>
                                    <Link href="/privacy" className="footer__link">Privacy Policy</Link>
                                    <Link href="/terms" className="footer__link">Terms of Service</Link>
                                </div>
                            </div>

                            <div className="footer__bottom">
                                <p className="footer__copyright">&copy; {new Date().getFullYear()} Tools Repository. Crafted for the modern web.</p>
                                <div className="footer__stack-icons">
                                    <span>⚛️</span>
                                    <span>⚡</span>
                                    <span>🛡️</span>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </body>
        </html>
    );
}
