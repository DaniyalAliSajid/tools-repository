import Link from 'next/link';

export const metadata = {
    title: 'Contact Us | Tools Repository',
    description: 'Get in touch with Tools Repository for support, feedback, or tool suggestions.',
};

export default function ContactPage() {
    return (
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: 'var(--space-12) var(--space-6)' }}>
            <section style={{ marginBottom: 'var(--space-12)', textAlign: 'center' }}>
                <h1 style={{
                    fontSize: 'var(--fs-3xl)',
                    fontWeight: '800',
                    marginBottom: 'var(--space-4)',
                    background: 'var(--grad-text)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Get in Touch
                </h1>
                <p style={{ fontSize: 'var(--fs-lg)', color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                    Have a question, feedback, or a suggestion for a new tool? We'd love to hear from you.
                </p>
            </section>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-8)', marginBottom: 'var(--space-12)' }}>
                <div style={{ padding: 'var(--space-8)', background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', textAlign: 'center' }}>
                    <div style={{ fontSize: '32px', marginBottom: 'var(--space-4)' }}>📧</div>
                    <h3 style={{ marginBottom: 'var(--space-2)', fontWeight: 'var(--fw-bold)' }}>Email Support</h3>
                    <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
                        For general inquiries and support, feel free to drop us an email.
                    </p>
                    <a href="mailto:support@toolrepository.com" style={{ color: 'var(--color-primary)', fontWeight: 'var(--fw-bold)', textDecoration: 'none' }}>support@toolrepository.com</a>
                </div>
            </div>

            <div style={{ padding: 'var(--space-10)', background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--glass-border)' }}>
                <h2 style={{ fontSize: 'var(--fs-xl)', fontWeight: 'var(--fw-bold)', marginBottom: 'var(--space-6)', textAlign: 'center' }}>Send us a Message</h2>
                <form style={{ display: 'grid', gap: 'var(--space-5)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                            <label style={{ fontSize: 'var(--fs-xs)', fontWeight: 'var(--fw-bold)', color: 'var(--color-text-secondary)' }}>Full Name</label>
                            <input type="text" placeholder="John Doe" style={{ padding: '12px 16px', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', color: 'var(--color-text)', outline: 'none' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                            <label style={{ fontSize: 'var(--fs-xs)', fontWeight: 'var(--fw-bold)', color: 'var(--color-text-secondary)' }}>Email Address</label>
                            <input type="email" placeholder="john@example.com" style={{ padding: '12px 16px', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', color: 'var(--color-text)', outline: 'none' }} />
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                        <label style={{ fontSize: 'var(--fs-xs)', fontWeight: 'var(--fw-bold)', color: 'var(--color-text-secondary)' }}>Subject</label>
                        <input type="text" placeholder="How can we help?" style={{ padding: '12px 16px', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', color: 'var(--color-text)', outline: 'none' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                        <label style={{ fontSize: 'var(--fs-xs)', fontWeight: 'var(--fw-bold)', color: 'var(--color-text-secondary)' }}>Message</label>
                        <textarea rows={5} placeholder="Tell us more about your request..." style={{ padding: '12px 16px', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', color: 'var(--color-text)', outline: 'none', resize: 'vertical' }}></textarea>
                    </div>
                    <button type="button" style={{ marginTop: 'var(--space-2)', padding: '14px', background: 'var(--color-primary)', color: 'white', borderRadius: 'var(--radius-lg)', fontWeight: 'var(--fw-bold)', border: 'none', cursor: 'pointer', transition: 'transform 0.2s', boxShadow: 'var(--shadow-glow)' }}>
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
}
