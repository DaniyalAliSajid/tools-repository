import Link from 'next/link';

export const metadata = {
    title: 'Advertise With Us | Tools Repository',
    description: 'Partner with Tools Repository to reach thousands of developers, students, and digital professionals every day.',
};

export default function AdvertisePage() {
    return (
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: 'var(--space-12) var(--space-6)' }}>

            <section style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}>
                <h1 style={{
                    fontSize: 'var(--fs-4xl)',
                    fontWeight: '800',
                    marginBottom: 'var(--space-6)',
                    background: 'var(--grad-text)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: '1.2'
                }}>
                    Grow Your Brand with <br /> Tools Repository
                </h1>
                <p style={{ fontSize: 'var(--fs-lg)', color: 'var(--color-text-secondary)', maxWidth: '700px', margin: '0 auto', lineHeight: '1.8' }}>
                    Connect with a highly engaged audience of developers, creators, and tech enthusiasts.
                    Tools Repository provides the perfect platform to showcase your products and services.
                </p>
            </section>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-8)', marginBottom: 'var(--space-16)' }}>
                <div style={{ padding: 'var(--space-8)', background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)' }}>
                    <div style={{ fontSize: '32px', marginBottom: 'var(--space-4)' }}>🚀</div>
                    <h3 style={{ fontSize: 'var(--fs-xl)', fontWeight: 'var(--fw-bold)', marginBottom: 'var(--space-3)' }}>High Traffic</h3>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--fs-sm)', lineHeight: '1.6' }}>
                        Reach thousands of unique visitors daily who are actively looking for utility tools and developer resources.
                    </p>
                </div>
                <div style={{ padding: 'var(--space-8)', background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)' }}>
                    <div style={{ fontSize: '32px', marginBottom: 'var(--space-4)' }}>🎯</div>
                    <h3 style={{ fontSize: 'var(--fs-xl)', fontWeight: 'var(--fw-bold)', marginBottom: 'var(--space-3)' }}>Targeted Audience</h3>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--fs-sm)', lineHeight: '1.6' }}>
                        Our users include software engineers, data analysts, designers, and digital marketers—a prime tech-savvy demographic.
                    </p>
                </div>
                <div style={{ padding: 'var(--space-8)', background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)' }}>
                    <div style={{ fontSize: '32px', marginBottom: 'var(--space-4)' }}>💎</div>
                    <h3 style={{ fontSize: 'var(--fs-xl)', fontWeight: 'var(--fw-bold)', marginBottom: 'var(--space-3)' }}>Premium Placement</h3>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--fs-sm)', lineHeight: '1.6' }}>
                        Get featured in high-visibility spots, including tool pages, category sidebars, and our homepage hero section.
                    </p>
                </div>
            </div>

            <section style={{ background: 'var(--color-surface-alt)', padding: 'var(--space-12)', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--color-border)', marginBottom: 'var(--space-16)' }}>
                <h2 style={{ fontSize: 'var(--fs-2xl)', fontWeight: 'var(--fw-bold)', marginBottom: 'var(--space-8)', textAlign: 'center' }}>Ad Formats & Opportunities</h2>
                <div style={{ display: 'grid', gap: 'var(--space-6)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', padding: 'var(--space-4)', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                        <div style={{ width: '60px', height: '60px', background: 'rgba(79, 70, 229, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>🖼️</div>
                        <div>
                            <h4 style={{ fontWeight: 'var(--fw-bold)', marginBottom: 'var(--space-1)' }}>Display Banners</h4>
                            <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-text-secondary)' }}>Standard IAB sizes (Leaderboard, Rectangle) placed strategically across the site.</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', padding: 'var(--space-4)', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                        <div style={{ width: '60px', height: '60px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>⚡</div>
                        <div>
                            <h4 style={{ fontWeight: 'var(--fw-bold)', marginBottom: 'var(--space-1)' }}>Sponsored Tools</h4>
                            <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-text-secondary)' }}>Exclusive "Presented by" branding on specific high-traffic tool pages.</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', padding: 'var(--space-4)', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                        <div style={{ width: '60px', height: '60px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>✨</div>
                        <div>
                            <h4 style={{ fontWeight: 'var(--fw-bold)', marginBottom: 'var(--space-1)' }}>Newsletter Features</h4>
                            <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-text-secondary)' }}>Directly reach our subscribers through dedicated sponsorship slots.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section style={{ textAlign: 'center', padding: 'var(--space-12)', background: 'var(--grad-text)', borderRadius: 'var(--radius-2xl)', color: 'white', boxShadow: 'var(--shadow-glow)' }}>
                <h2 style={{ fontSize: 'var(--fs-2xl)', fontWeight: 'var(--fw-bold)', marginBottom: 'var(--space-4)' }}>Ready to Get Started?</h2>
                <p style={{ fontSize: 'var(--fs-lg)', marginBottom: 'var(--space-8)', opacity: 0.9 }}>
                    Contact our sales team for a custom quote.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                    <Link href="/contact" style={{ padding: '14px 28px', background: 'white', color: 'var(--color-primary)', borderRadius: 'var(--radius-full)', fontWeight: 'var(--fw-bold)', textDecoration: 'none', boxShadow: 'var(--shadow-lg)' }}>
                        Contact Sales
                    </Link>
                </div>
            </section>
        </div>
    );
}
