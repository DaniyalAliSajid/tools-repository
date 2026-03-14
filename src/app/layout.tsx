import type { Metadata } from 'next';
import '../vanilla/css/variables.css';
import '../vanilla/css/base.css';
import '../vanilla/css/layout.css';
import '../vanilla/css/components.css';
import '../vanilla/css/themes.css';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Tools Repository — Free Online Tools for Everyday Use',
    description: 'A collection of 50 free, fast, and easy-to-use utility tools including text converters, calculators, generators, and developer tools.',
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
            </head>
            <body>
                <div id="app">
                    <header className="header" style={{
                        height: 'var(--header-height)',
                        padding: '0 var(--space-6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'var(--glass-bg)',
                        backdropFilter: 'var(--glass-blur)',
                        borderBottom: '1px solid var(--glass-border)',
                        position: 'sticky',
                        top: 0,
                        zIndex: 100
                    }}>
                        <div style={{ width: '100%', maxWidth: 'var(--max-width)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', textDecoration: 'none' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    background: 'var(--grad-text)',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: '20px',
                                    boxShadow: 'var(--shadow-glow)'
                                }}>💡</div>
                                <h1 style={{
                                    fontSize: 'var(--fs-xl)',
                                    fontWeight: 'var(--fw-bold)',
                                    color: 'var(--color-text)',
                                    fontFamily: 'var(--font-display)',
                                    margin: 0
                                }}>Tools Repository</h1>
                            </Link>

                            <nav style={{ display: 'flex', gap: 'var(--space-6)', alignItems: 'center' }}>
                                <Link href="/" style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-text-secondary)', fontWeight: 'var(--fw-medium)', transition: 'color var(--transition-fast)' }}>Home</Link>
                                <Link href="/about" style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-text-secondary)', fontWeight: 'var(--fw-medium)', transition: 'color var(--transition-fast)' }}>About</Link>
                                <Link href="/contact" style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-text-secondary)', fontWeight: 'var(--fw-medium)', transition: 'color var(--transition-fast)' }}>Contact</Link>
                                <Link href="/advertise" style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-text-secondary)', fontWeight: 'var(--fw-medium)', transition: 'color var(--transition-fast)' }}>Advertise with us</Link>
                                <Link href="/#tools" className="btn btn--blue btn--sm" style={{
                                    textDecoration: 'none',
                                    fontWeight: 'var(--fw-bold)',
                                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
                                }}>
                                    Get Started
                                </Link>
                            </nav>
                        </div>
                    </header>

                    <main className="main">
                        {children}
                    </main>

                    <footer className="footer" style={{ borderTop: '1px solid var(--color-border)', background: 'white', padding: 'var(--space-12) var(--space-6) var(--space-8)' }}>
                        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
                            <div className="footer__inner" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-12)', marginBottom: 'var(--space-12)' }}>
                                <div className="footer__column">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                                        <span style={{ fontSize: '20px' }}>💡</span>
                                        <h3 style={{ fontSize: 'var(--fs-lg)', fontWeight: 'var(--fw-bold)', margin: 0, color: 'var(--color-text)' }}>Tools Repository</h3>
                                    </div>
                                    <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--fs-sm)', lineHeight: '1.6' }}>
                                        High-performance browser tools for developers and creators. No tracking, 100% free, forever.
                                    </p>
                                </div>
                                <div className="footer__column">
                                    <h3 className="footer__column-title" style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--fs-sm)', color: 'var(--color-text)', fontWeight: 'var(--fw-bold)' }}>Explore</h3>
                                    <Link href="/" style={{ display: 'block', color: 'var(--color-text-secondary)', fontSize: 'var(--fs-sm)', marginBottom: 'var(--space-2)', textDecoration: 'none' }}>Home</Link>
                                    <Link href="/about" style={{ display: 'block', color: 'var(--color-text-secondary)', fontSize: 'var(--fs-sm)', marginBottom: 'var(--space-2)', textDecoration: 'none' }}>About Us</Link>
                                    <Link href="/contact" style={{ display: 'block', color: 'var(--color-text-secondary)', fontSize: 'var(--fs-sm)', marginBottom: 'var(--space-2)', textDecoration: 'none' }}>Contact</Link>
                                    <Link href="/advertise" style={{ display: 'block', color: 'var(--color-text-secondary)', fontSize: 'var(--fs-sm)', marginBottom: 'var(--space-2)', textDecoration: 'none' }}>Advertise with Us</Link>
                                </div>
                                <div className="footer__column">
                                    <h3 className="footer__column-title" style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--fs-sm)', color: 'var(--color-text)', fontWeight: 'var(--fw-bold)' }}>Legal</h3>
                                    <Link href="/privacy" style={{ display: 'block', color: 'var(--color-text-secondary)', fontSize: 'var(--fs-sm)', marginBottom: 'var(--space-2)', textDecoration: 'none' }}>Privacy Policy</Link>
                                    <Link href="/terms" style={{ display: 'block', color: 'var(--color-text-secondary)', fontSize: 'var(--fs-sm)', marginBottom: 'var(--space-2)', textDecoration: 'none' }}>Terms of Service</Link>
                                </div>
                            </div>

                            <div className="footer__bottom" style={{ paddingTop: 'var(--space-6)', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-text-muted)' }}>&copy; {new Date().getFullYear()} Tools Repository. Crafted for the modern web.</p>
                                <div style={{ display: 'flex', gap: 'var(--space-4)', fontSize: '18px', filter: 'grayscale(1) opacity(0.5)' }}>
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
