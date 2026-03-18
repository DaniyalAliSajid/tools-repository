'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Prevent scrolling when drawer is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isMenuOpen]);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <div id="app">
            <header className="header">
                <div className="header__container">
                    <Link href="/" onClick={closeMenu} className="header__logo" aria-label="Tools Repository Home">
                        <img src="/logo.svg" alt="Tools Repository" className="header__logo-img" width="160" height="40" style={{ height: '40px', width: 'auto' }} />
                    </Link>

                    <button
                        className="header__nav-mobile-toggle"
                        onClick={() => setIsMenuOpen(true)}
                        aria-label="Open Navigation"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>
                    </button>

                    <nav className="header__nav">
                        <Link href="/" className="header__link">Home</Link>
                        <Link href="/about" className="header__link">About</Link>
                        <Link href="/contact" className="header__link">Contact</Link>
                        <Link href="/advertise" className="header__link">Advertise</Link>
                        <Link
                            href="/#tools"
                            className="btn btn--primary btn--sm"
                        >
                            Get Started
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Side Drawer */}
            <div className={`drawer-overlay ${isMenuOpen ? 'open' : ''}`} onClick={closeMenu} />
            <aside className={`drawer ${isMenuOpen ? 'open' : ''}`}>
                <div className="drawer__header">
                    <img src="/logo.svg" alt="Tools Repository" width="128" height="32" style={{ height: '32px', width: 'auto' }} />
                    <button className="drawer__close" onClick={closeMenu} aria-label="Close menu">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>
                <nav className="drawer__nav">
                    <Link href="/" className="drawer__link" onClick={closeMenu}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                        Home
                    </Link>
                    <Link href="/about" className="drawer__link" onClick={closeMenu}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                        About Us
                    </Link>
                    <Link href="/contact" className="drawer__link" onClick={closeMenu}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        Contact
                    </Link>
                    <Link href="/advertise" className="drawer__link" onClick={closeMenu}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>
                        Advertise with Us
                    </Link>
                </nav>
                <div className="drawer__footer">
                    <Link
                        href="/#tools"
                        className="btn btn--primary btn--block"
                        onClick={closeMenu}
                    >
                        Get Started
                    </Link>
                </div>
            </aside>

            <main className="main">
                {children}
            </main>

            <footer className="footer">
                <div className="container">
                    <div className="footer__inner">
                        <div className="footer__column">
                            <Link href="/" aria-label="Tools Repository Home">
                                <img src="/logo.svg" alt="Tools Repository" className="footer__logo-img" width="128" height="32" style={{ height: '32px', width: 'auto' }} />
                            </Link>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--fs-sm)', lineHeight: '1.6', marginTop: 'var(--space-4)' }}>
                                High-performance browser tools for developers and creators. No tracking, 100% privacy-focused, and forever free.
                            </p>
                        </div>
                        <div className="footer__column">
                            <h2 className="footer__heading">Product</h2>
                            <Link href="/" className="footer__link">Tools Registry</Link>
                            <Link href="/#faq" className="footer__link">Frequently Asked</Link>
                            <Link href="/advertise" className="footer__link">Advertise</Link>
                        </div>
                        <div className="footer__column">
                            <h2 className="footer__heading">Company</h2>
                            <Link href="/about" className="footer__link">About Us</Link>
                            <Link href="/contact" className="footer__link">Contact Support</Link>
                        </div>
                        <div className="footer__column">
                            <h2 className="footer__heading">Legal</h2>
                            <Link href="/privacy" className="footer__link">Privacy Policy</Link>
                            <Link href="/terms" className="footer__link">Terms of Service</Link>
                        </div>
                    </div>

                    <div className="footer__bottom">
                        <p className="footer__copyright">
                            &copy; {new Date().getFullYear()} Tools Repository. All rights reserved. Built for creators.
                        </p>
                        <div className="footer__socials">
                            <a href="https://twitter.com" className="footer__social-link" aria-label="Visit our Twitter profile" target="_blank" rel="noopener noreferrer">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                            </a>
                            <a href="https://github.com/DaniyalAliSajid/tools-repository" className="footer__social-link" aria-label="Visit our GitHub repository" target="_blank" rel="noopener noreferrer">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
