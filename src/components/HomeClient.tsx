'use client';

import { tools, categories } from '../vanilla/registry';
import ToolCard from './ToolCard';
import { useState } from 'react';
import FAQSection from './FAQSection';
import { HOME_FAQS } from '../vanilla/faqs';

export default function HomeClient() {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState<string>('all');

    const filteredTools = tools.filter((tool) => {
        const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase()) ||
            tool.description.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <>
            <section className="hero" style={{ padding: 'var(--space-16) 0 var(--space-8)', textAlign: 'center' }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    padding: '8px 16px',
                    background: 'rgba(79, 70, 229, 0.08)',
                    border: '1px solid rgba(79, 70, 229, 0.15)',
                    borderRadius: 'var(--radius-full)',
                    color: 'var(--color-primary)',
                    fontSize: 'var(--fs-xs)',
                    fontWeight: 'var(--fw-bold)',
                    marginBottom: 'var(--space-6)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                }}>
                    <span>✨</span> {tools.length}+ Premium Tools Available
                </div>
                <h1 style={{
                    fontSize: 'var(--fs-4xl)',
                    fontWeight: '800',
                    letterSpacing: '-0.04em',
                    marginBottom: 'var(--space-6)',
                    lineHeight: '1.2',
                    color: 'var(--color-text)',
                    fontFamily: 'var(--font-display)'
                }}>
                    Smart Tools for the <br />
                    <span style={{
                        background: 'var(--grad-text)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>Modern Web</span>
                </h1>
                <p style={{
                    fontSize: 'var(--fs-lg)',
                    color: 'var(--color-text-secondary)',
                    maxWidth: '680px',
                    margin: '0 auto var(--space-12)',
                    lineHeight: '1.7',
                    fontWeight: 'var(--fw-medium)'
                }}>
                    A curated collection of high-performance, privacy-first utility tools designed to speed up your workflow. 100% free and open source.
                </p>

                <div style={{ maxWidth: '640px', margin: '0 auto', position: 'relative' }}>
                    <div className="search-bar" style={{
                        position: 'relative',
                        background: 'white',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-xl)',
                        padding: '6px',
                        boxShadow: 'var(--shadow-lg)',
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'all var(--transition-normal)'
                    }}>
                        <span style={{ padding: '0 var(--space-4)', color: 'var(--color-text-muted)', fontSize: '20px' }}>🔍</span>
                        <input
                            type="text"
                            style={{
                                flex: 1,
                                background: 'transparent',
                                border: 'none',
                                padding: '14px 0',
                                fontSize: '18px',
                                color: 'var(--color-text)',
                                outline: 'none',
                                fontWeight: 'var(--fw-medium)'
                            }}
                            placeholder="What tool do you need today?"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <div style={{ padding: '0 var(--space-4)' }}>
                            <span style={{
                                padding: '4px 8px',
                                background: 'var(--color-bg)',
                                border: '1px solid var(--color-border)',
                                borderRadius: '6px',
                                fontSize: '12px',
                                color: 'var(--color-text-muted)',
                                fontWeight: 'var(--fw-bold)'
                            }}>ESC</span>
                        </div>
                    </div>
                </div>
            </section>

            <nav className="category-nav" style={{ marginBottom: 'var(--space-12)' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                    <button
                        className={`category-nav__item ${activeCategory === 'all' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('all')}
                        style={{
                            padding: '10px 22px',
                            borderRadius: 'var(--radius-full)',
                            fontSize: 'var(--fs-sm)',
                            fontWeight: 'var(--fw-bold)',
                            background: activeCategory === 'all' ? 'var(--color-primary)' : 'white',
                            color: activeCategory === 'all' ? 'white' : 'var(--color-text-secondary)',
                            border: '1px solid',
                            borderColor: activeCategory === 'all' ? 'var(--color-primary)' : 'var(--color-border)',
                            transition: 'all var(--transition-fast)',
                            cursor: 'pointer',
                            boxShadow: activeCategory === 'all' ? 'var(--shadow-glow)' : 'var(--shadow-sm)'
                        }}
                    >
                        Home
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            className={`category-nav__item ${activeCategory === cat.id ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat.id)}
                            style={{
                                padding: '10px 22px',
                                borderRadius: 'var(--radius-full)',
                                fontSize: 'var(--fs-sm)',
                                fontWeight: 'var(--fw-bold)',
                                background: activeCategory === cat.id ? 'var(--color-primary)' : 'white',
                                color: activeCategory === cat.id ? 'white' : 'var(--color-text-secondary)',
                                border: '1px solid',
                                borderColor: activeCategory === cat.id ? 'var(--color-primary)' : 'var(--color-border)',
                                transition: 'all var(--transition-fast)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                boxShadow: activeCategory === cat.id ? 'var(--shadow-glow)' : 'var(--shadow-sm)'
                            }}
                        >
                            <span style={{ filter: activeCategory === cat.id ? 'none' : 'grayscale(0.5)' }}>{cat.icon}</span> {cat.name}
                        </button>
                    ))}
                </div>
            </nav>

            <div id="tools" className="tool-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 'var(--space-6)',
                paddingBottom: 'var(--space-16)'
            }}>
                {filteredTools.length > 0 ? (
                    filteredTools.map((tool, index) => (
                        <div key={tool.id} style={{ '--index': index } as React.CSSProperties}>
                            <ToolCard tool={tool} />
                        </div>
                    ))
                ) : (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '6rem 2rem', background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)', border: '1px dashed var(--color-border)' }}>
                        <div style={{ fontSize: '48px', marginBottom: 'var(--space-4)' }}>🕵️‍♀️</div>
                        <h3 style={{ fontSize: 'var(--fs-xl)', marginBottom: 'var(--space-2)' }}>No tools matched your search</h3>
                        <p style={{ color: 'var(--color-text-secondary)' }}>Try adjusting your keywords or category filters.</p>
                        <button
                            onClick={() => { setSearch(''); setActiveCategory('all'); }}
                            style={{ marginTop: 'var(--space-6)', color: 'var(--color-primary)', fontWeight: 'var(--fw-bold)', cursor: 'pointer', background: 'none', border: 'none' }}
                        >
                            Reset everything
                        </button>
                    </div>
                )}
            </div>

            <FAQSection faqs={HOME_FAQS} title="Tools Repository - Frequently Asked Questions" />
        </>
    );
}
