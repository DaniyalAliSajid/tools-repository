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
            <section className="hero container animate-fade-in">
                <div className="hero__badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                    <span>Premium tools repository</span>
                </div>
                <h1 className="hero__title">
                    Smart Tools for the <br />
                    <span className="text-gradient">Modern Web</span>
                </h1>
                <p className="hero__description">
                    A curated collection of high-performance, privacy-first utility tools designed to speed up your workflow. 100% free, no tracking, and open source.
                </p>
                
                <div className="hero__actions">
                    <a href="#tools" className="btn btn--primary">Browse Tools</a>
                    <a href="/about" className="btn btn--secondary">Learn More</a>
                </div>
                <div className="hero__divider"></div>
            </section>

            <section id="tools" className="section container">
                <div className="search-container">
                    <div className="search-bar">
                        <span className="search-bar__icon">🔍</span>
                        <input
                            type="text"
                            className="search-bar__input"
                            placeholder="What tool do you need today?"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            aria-label="Search tools"
                        />
                        <span className="search-bar__shortcut" aria-hidden="true">ESC</span>
                    </div>
                </div>

                <nav className="category-nav">
                    <div className="category-nav__list">
                        <button
                            className={`category-nav__item ${activeCategory === 'all' ? 'active' : ''}`}
                            onClick={() => setActiveCategory('all')}
                        >
                            All Tools
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                className={`category-nav__item ${activeCategory === cat.id ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat.id)}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </nav>

                <div className="tool-grid">
                    {filteredTools.length > 0 ? (
                        filteredTools.map((tool) => (
                            <ToolCard key={tool.id} tool={tool} />
                        ))
                    ) : (
                        <div className="no-results" style={{ gridColumn: '1 / -1' }}>
                            <div className="no-results__icon">🕵️‍♀️</div>
                            <h2 className="no-results__text">No tools matched your search</h2>
                            <button
                                onClick={() => { setSearch(''); setActiveCategory('all'); }}
                                style={{ marginTop: 'var(--space-6)', color: 'var(--color-primary)', fontWeight: 'var(--fw-bold)', cursor: 'pointer', background: 'none', border: 'none' }}
                            >
                                Reset everything
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <section className="features container">
                <div className="section-title">
                    <h2>Everything you need. <span className="text-gradient">Nothing you don&apos;t.</span></h2>
                    <p>We built Tools Repository to be the fastest, most reliable tool companion for developers and creators.</p>
                </div>
                
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-card__icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                        </div>
                        <h3>Privacy First</h3>
                        <p>Your data never leaves your browser. All processing happens locally on your machine.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-card__icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polyline></svg>
                        </div>
                        <h3>Blazing Fast</h3>
                        <p>No account required. Open the page and start using your favorite tool instantly.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-card__icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>
                        </div>
                        <h3>Modern Tech</h3>
                        <p>Built with Next.js and pure CSS for a lightweight, performant, and premium experience.</p>
                    </div>
                </div>
            </section>

            <FAQSection faqs={HOME_FAQS} title="Tools Repository - Frequently Asked Questions" />
        </>
    );
}
