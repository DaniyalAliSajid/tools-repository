import Link from 'next/link';

export const metadata = {
    title: 'About Us | Tools Repository',
    description: 'Learn more about Tools Repository, our mission to provide high-quality, privacy-first browser tools for everyone.',
};

export default function AboutPage() {
    return (
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: 'var(--space-12) var(--space-6)' }}>
            <section style={{ marginBottom: 'var(--space-12)' }}>
                <h1 style={{
                    fontSize: 'var(--fs-3xl)',
                    fontWeight: '800',
                    marginBottom: 'var(--space-6)',
                    background: 'var(--grad-text)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    About Tools Repository
                </h1>
                <p style={{ fontSize: 'var(--fs-lg)', lineHeight: '1.8', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
                    Tools Repository was born out of a simple idea: the web should be full of useful, high-quality, and free utility tools that don't compromise your privacy.
                    We believe that developers, students, and professionals shouldn't have to navigate through bloated websites or sign up for accounts just to format a JSON file or calculate a percentage.
                </p>
            </section>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-12)' }}>
                <div style={{ padding: 'var(--space-6)', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ fontSize: '24px', marginBottom: 'var(--space-3)' }}>🛡️</div>
                    <h3 style={{ marginBottom: 'var(--space-2)', fontWeight: 'var(--fw-bold)', color: 'var(--color-text)' }}>Privacy First</h3>
                    <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                        All our tools are 100% browser-based. Your data never leaves your computer. We don't track you, and we don't store your input.
                    </p>
                </div>
                <div style={{ padding: 'var(--space-6)', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ fontSize: '24px', marginBottom: 'var(--space-3)' }}>⚡</div>
                    <h3 style={{ marginBottom: 'var(--space-2)', fontWeight: 'var(--fw-bold)', color: 'var(--color-text)' }}>High Performance</h3>
                    <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                        Built with modern web technologies, our tools are lightning-fast and responsive, providing instant results as you type.
                    </p>
                </div>
                <div style={{ padding: 'var(--space-6)', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ fontSize: '24px', marginBottom: 'var(--space-3)' }}>🆓</div>
                    <h3 style={{ marginBottom: 'var(--space-2)', fontWeight: 'var(--fw-bold)', color: 'var(--color-text)' }}>Always Free</h3>
                    <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                        No subscriptions, no "pro" versions, no hidden fees. Tools Repository is a community resource that will remain free forever.
                    </p>
                </div>
            </div>

            <section style={{ marginBottom: 'var(--space-12)' }}>
                <h2 style={{ fontSize: 'var(--fs-xl)', fontWeight: 'var(--fw-bold)', marginBottom: 'var(--space-4)', color: 'var(--color-text)' }}>Our Mission</h2>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>
                    Our mission is to simplify the digital workflow of millions of people around the world by providing a robust,
                    reliable, and beautiful set of tools that you can trust. We are constantly adding new tools and improving
                    existing ones based on user feedback.
                </p>
            </section>

        </div>
    );
}
