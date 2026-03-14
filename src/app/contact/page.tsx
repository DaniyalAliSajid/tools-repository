"use client";

import Link from 'next/link';

export default function ContactPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
            {/* ── Hero ── */}
            <div style={{ textAlign: 'center', padding: 'var(--space-16) var(--space-6) var(--space-12)' }}>
                <h1 style={{
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    fontWeight: '800',
                    letterSpacing: '-0.02em',
                    lineHeight: '1.15',
                    marginBottom: 'var(--space-4)',
                    background: 'var(--grad-text)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontFamily: 'var(--font-display)',
                }}>
                    Let's Build Something<br />Amazing Together
                </h1>
                <p style={{
                    fontSize: 'var(--fs-lg)',
                    color: 'var(--color-text-secondary)',
                    maxWidth: '560px',
                    margin: '0 auto',
                    lineHeight: '1.7',
                }}>
                    Have a vision for a new tool or need help with an existing one?
                    Our team is ready to collaborate.
                </p>
            </div>

            {/* ── Two-column layout ── */}
            <div style={{
                maxWidth: '1080px',
                margin: '0 auto',
                padding: '0 var(--space-8) var(--space-16)',
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.5fr)',
                gap: 'var(--space-8)',
                alignItems: 'start',
            }}>

                {/* LEFT: info cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                    {/* Direct Support */}
                    <div style={{
                        background: 'var(--glass-bg)',
                        backdropFilter: 'var(--glass-blur)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: 'var(--radius-xl)',
                        padding: 'var(--space-8)',
                        boxShadow: 'var(--shadow-md)',
                    }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            background: 'var(--grad-text)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '22px',
                            marginBottom: 'var(--space-5)',
                            boxShadow: 'var(--shadow-glow)',
                        }}>📩</div>
                        <h3 style={{ fontSize: 'var(--fs-xl)', fontWeight: 'var(--fw-bold)', marginBottom: 'var(--space-2)', color: 'var(--color-text)' }}>
                            Direct Support
                        </h3>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--fs-base)', marginBottom: 'var(--space-5)', lineHeight: '1.6' }}>
                            We aim to respond to all technical inquiries within 24 hours.
                        </p>
                        <a
                            href="mailto:support@toolrepository.com"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                color: 'var(--color-primary)',
                                fontWeight: 'var(--fw-semibold)',
                                textDecoration: 'none',
                                fontSize: 'var(--fs-sm)',
                            }}
                        >
                            support@toolrepository.com →
                        </a>
                    </div>

                    {/* Partnerships */}
                    <div style={{
                        background: 'var(--glass-bg)',
                        backdropFilter: 'var(--glass-blur)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: 'var(--radius-xl)',
                        padding: 'var(--space-8)',
                        boxShadow: 'var(--shadow-md)',
                    }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            background: 'white',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '22px',
                            marginBottom: 'var(--space-5)',
                            border: '1px solid var(--color-border)',
                            boxShadow: 'var(--shadow-sm)',
                        }}>🤝</div>
                        <h3 style={{ fontSize: 'var(--fs-xl)', fontWeight: 'var(--fw-bold)', marginBottom: 'var(--space-2)', color: 'var(--color-text)' }}>
                            Partnerships
                        </h3>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--fs-base)', marginBottom: 'var(--space-4)', lineHeight: '1.6' }}>
                            Interested in collaborating or advertising with us?
                        </p>
                        <Link
                            href="/advertise"
                            style={{ color: 'var(--color-primary)', fontWeight: 'var(--fw-medium)', textDecoration: 'underline', fontSize: 'var(--fs-sm)' }}
                        >
                            View Advertising Options
                        </Link>
                    </div>
                </div>

                {/* RIGHT: Contact form */}
                <div style={{ minWidth: 0 }}>
                <div style={{
                    background: 'var(--glass-bg)',
                    backdropFilter: 'var(--glass-blur)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: 'var(--radius-xl)',
                    padding: 'var(--space-10)',
                }}>
                    <h2 style={{ fontSize: 'var(--fs-2xl)', fontWeight: 'var(--fw-bold)', marginBottom: 'var(--space-8)', color: 'var(--color-text)' }}>
                        Send a Message
                    </h2>
                    <form style={{ display: 'grid', gap: 'var(--space-5)' }}>
                        {/* Name + Email row */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
                            <ContactField label="Full Name" type="text" placeholder="John Doe" />
                            <ContactField label="Email Address" type="email" placeholder="john@example.com" />
                        </div>
                        <ContactField label="Subject" type="text" placeholder="I'd like to suggest a new tool..." />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                            <label style={labelStyle}>Your Message</label>
                            <textarea
                                rows={6}
                                placeholder="How can we help you?"
                                style={inputStyle as React.CSSProperties}
                                onFocus={e => {
                                    e.currentTarget.style.borderColor = 'var(--color-primary)';
                                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(79,70,229,0.12)';
                                }}
                                onBlur={e => {
                                    e.currentTarget.style.borderColor = 'var(--color-border)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            />
                        </div>
                        <button
                            type="button"
                            className="btn btn--blue"
                            style={{ width: '100%', padding: '15px', fontSize: 'var(--fs-base)', fontWeight: 'var(--fw-bold)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}
                        >
                            Send Message
                        </button>
                    </form>
                </div>
                </div>
            </div>

            {/* responsive: single column on mobile */}
            <style>{`
                @media (max-width: 720px) {
                    .contact-split { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </div>
    );
}

const labelStyle: React.CSSProperties = {
    fontSize: 'var(--fs-xs)',
    fontWeight: 700,
    color: 'var(--color-text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
};

const inputStyle: React.CSSProperties = {
    padding: '13px 16px',
    background: 'var(--color-surface-alt)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--color-text)',
    outline: 'none',
    fontSize: 'var(--fs-base)',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    width: '100%',
    boxSizing: 'border-box',
    resize: 'vertical',
};

function ContactField({ label, type, placeholder }: { label: string; type: string; placeholder: string }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <label style={labelStyle}>{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                style={inputStyle}
                onFocus={e => {
                    e.currentTarget.style.borderColor = 'var(--color-primary)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(79,70,229,0.12)';
                }}
                onBlur={e => {
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                    e.currentTarget.style.boxShadow = 'none';
                }}
            />
        </div>
    );
}
