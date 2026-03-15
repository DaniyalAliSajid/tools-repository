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
        <section className="faq-section container">
            <div className="section-title">
                <h2>{title}</h2>
                <p>{subtitle}</p>
            </div>
            <div className="faq-grid">
                {faqs.map((faq, index) => {
                    const isActive = activeIndex === index;
                    return (
                        <div key={index} className={`faq-item ${isActive ? 'active' : ''}`}>
                            <button
                                className="faq-question"
                                onClick={() => setActiveIndex(isActive ? null : index)}
                            >
                                <span>{faq.question}</span>
                                <span className="faq-icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </span>
                            </button>
                            <div className="faq-answer">
                                <p>{faq.answer}</p>
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
