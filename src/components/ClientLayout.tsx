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
                    <Link href="/" onClick={closeMenu}>
                        <img src="/logo.svg" alt="Tools Repository" className="header__logo-img" />
                    </Link>

                    <button
                        className="header__nav-mobile-toggle"
                        onClick={() => setIsMenuOpen(true)}
                        aria-label="Open Navigation"
                    >
                        ☰
                    </button>

                    <nav className="header__nav">
                        <Link href="/" className="header__link">Home</Link>
                        <Link href="/about" className="header__link">About</Link>
                        <Link href="/contact" className="header__link">Contact</Link>
                        <Link href="/advertise" className="header__link">Advertise with us</Link>
                        <Link
                            href="/#tools"
                            className="btn btn--blue btn--sm"
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

            {/* Side Drawer */}
            <div className={`drawer-overlay ${isMenuOpen ? 'open' : ''}`} onClick={closeMenu} />
            <aside className={`drawer ${isMenuOpen ? 'open' : ''}`}>
                <div className="drawer__header">
                    <img src="/logo.svg" alt="Tools Repository" style={{ height: '32px' }} />
                    <button className="drawer__close" onClick={closeMenu} aria-label="Close menu">✕</button>
                </div>
                <nav className="drawer__nav">
                    <Link href="/" className="drawer__link" onClick={closeMenu}>Home</Link>
                    <Link href="/about" className="drawer__link" onClick={closeMenu}>About Us</Link>
                    <Link href="/contact" className="drawer__link" onClick={closeMenu}>Contact</Link>
                    <Link href="/advertise" className="drawer__link" onClick={closeMenu}>Advertise with Us</Link>
                </nav>
                <div className="drawer__footer">
                    <Link
                        href="/#tools"
                        className="btn btn--blue btn--block"
                        onClick={closeMenu}
                        style={{ textDecoration: 'none' }}
                    >
                        Get Started
                    </Link>
                </div>
            </aside>

            <main className="main">
                {children}
            </main>

            <footer className="footer">
                <div className="footer__container">
                    <div className="footer__inner">
                        <div className="footer__column">
                            <Link href="/" onClick={closeMenu}>
                                <img src="/logo.svg" alt="Tools Repository" className="footer__logo-img" />
                            </Link>
                            <p className="footer__column-text">
                                High-performance browser tools for developers and creators. No tracking, 100% free, forever.
                            </p>
                        </div>
                        <div className="footer__column">
                            <h3 className="footer__column-title">Explore</h3>
                            <Link href="/" className="footer__link" onClick={closeMenu}>Home</Link>
                            <Link href="/about" className="footer__link" onClick={closeMenu}>About Us</Link>
                            <Link href="/contact" className="footer__link" onClick={closeMenu}>Contact</Link>
                            <Link href="/advertise" className="footer__link" onClick={closeMenu}>Advertise with Us</Link>
                        </div>
                        <div className="footer__column">
                            <h3 className="footer__column-title">Legal</h3>
                            <Link href="/privacy" className="footer__link" onClick={closeMenu}>Privacy Policy</Link>
                            <Link href="/terms" className="footer__link" onClick={closeMenu}>Terms of Service</Link>
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
    );
}
