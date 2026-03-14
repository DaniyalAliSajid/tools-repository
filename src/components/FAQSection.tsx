'use client';

import { FAQ } from '../vanilla/types';
import { useState } from 'react';

export default function FAQSection({ faqs, title = "Frequently Asked Questions", subtitle = "Everything you need to know" }: { faqs: FAQ[], title?: string, subtitle?: string }) {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    if (!faqs || faqs.length === 0) return null;

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <section style={{ padding: '4rem 1rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'var(--font-sans)' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0f172a', marginBottom: '1rem', letterSpacing: '-0.02em' }}>{title}</h2>
                <p style={{ fontSize: '1.1rem', color: '#64748b', fontWeight: '500' }}>{subtitle}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {faqs.map((faq, index) => {
                    const isActive = activeIndex === index;
                    return (
                        <div
                            key={index}
                            style={{
                                background: 'white',
                                border: isActive ? '1px solid #7c3aed' : '1px solid #e2e8f0',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                transition: 'all 0.3s ease',
                                boxShadow: isActive ? '0 4px 20px rgba(124, 58, 237, 0.08)' : '0 2px 8px rgba(0, 0, 0, 0.02)'
                            }}
                        >
                            <button
                                onClick={() => setActiveIndex(isActive ? null : index)}
                                style={{
                                    width: '100%',
                                    padding: '1.5rem',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    background: 'none',
                                    border: 'none',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    gap: '1rem',
                                    outline: 'none'
                                }}
                            >
                                <span style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0f172a', lineHeight: '1.4' }}>{faq.question}</span>
                                <span style={{
                                    color: isActive ? '#7c3aed' : '#8b5cf6',
                                    transition: 'transform 0.3s ease',
                                    transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </span>
                            </button>
                            <div style={{
                                padding: isActive ? '0 1.5rem 1.5rem' : '0 1.5rem',
                                maxHeight: isActive ? '500px' : '0',
                                opacity: isActive ? 1 : 0,
                                overflow: 'hidden',
                                transition: 'all 0.3s ease',
                                color: '#475569',
                                lineHeight: '1.7',
                                fontSize: '0.95rem'
                            }}>
                                <p style={{ margin: 0 }}>{faq.answer}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
        </section>
    );
}
