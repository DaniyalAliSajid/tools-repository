import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '../../utils/graphql';

export const revalidate = 3600;

export const metadata: Metadata = {
    title: 'Blog — Guides, Tutorials & Insights',
    description: 'Latest articles, in-depth guides, and tutorials from Tools Repository. Learn how to boost your productivity with free online tools.',
    alternates: {
        canonical: 'https://toolsrepository.com/blog',
    },
    openGraph: {
        title: 'Blog — Tools Repository',
        description: 'In-depth guides, tutorials, and insights to supercharge your workflow.',
        url: 'https://toolsrepository.com/blog',
        type: 'website',
    },
};

function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '').trim();
}

function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export default async function BlogIndex() {
    const postsEdges = await getAllPosts(20);

    return (
        <div className="container" style={{ paddingTop: 'var(--space-12)', paddingBottom: 'var(--space-16)' }}>
            {/* Blog Header */}
            <header style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}>
                <h1 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--fs-4xl)',
                    fontWeight: 'var(--fw-bold)',
                    backgroundImage: 'var(--grad-primary)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: 'var(--space-4)',
                    lineHeight: 1.1,
                }}>
                    The Tools Repository Blog
                </h1>
                <p style={{
                    fontSize: 'var(--fs-lg)',
                    color: 'var(--color-text-muted)',
                    maxWidth: '600px',
                    margin: '0 auto',
                }}>
                    In-depth guides, tutorials, and insights to supercharge your workflow.
                </p>
            </header>

            {/* Posts Grid */}
            {postsEdges.length > 0 ? (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                    gap: 'var(--space-8)',
                    maxWidth: 'var(--max-width)',
                    margin: '0 auto',
                }}>
                    {postsEdges.map(({ node }: any) => (
                        <Link
                            key={node.id}
                            href={`/blog/${node.slug}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <article style={{
                                background: 'var(--color-surface)',
                                borderRadius: 'var(--radius-xl)',
                                border: '1px solid var(--color-border)',
                                overflow: 'hidden',
                                transition: 'var(--transition-normal)',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                                className="blog-card"
                            >
                                {/* Featured Image */}
                                {node.featuredImage?.node?.mediaItemUrl ? (
                                    <div style={{
                                        width: '100%',
                                        height: '200px',
                                        overflow: 'hidden',
                                    }}>
                                        <img
                                            src={node.featuredImage.node.mediaItemUrl}
                                            alt={node.featuredImage.node.altText || node.title}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                            }}
                                            loading="lazy"
                                        />
                                    </div>
                                ) : (
                                    <div style={{
                                        width: '100%',
                                        height: '200px',
                                        background: 'var(--grad-primary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: 'var(--fs-3xl)',
                                    }}>
                                        📝
                                    </div>
                                )}

                                {/* Content */}
                                <div style={{
                                    padding: 'var(--space-6)',
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}>
                                    <time style={{
                                        fontSize: 'var(--fs-xs)',
                                        color: 'var(--color-text-muted)',
                                        fontWeight: 'var(--fw-medium)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                    }}>
                                        {formatDate(node.date)}
                                    </time>

                                    <h2 style={{
                                        fontFamily: 'var(--font-display)',
                                        fontSize: 'var(--fs-xl)',
                                        fontWeight: 'var(--fw-semibold)',
                                        color: 'var(--color-text)',
                                        marginTop: 'var(--space-2)',
                                        marginBottom: 'var(--space-3)',
                                        lineHeight: 1.3,
                                    }}>
                                        {node.title}
                                    </h2>

                                    <p style={{
                                        fontSize: 'var(--fs-sm)',
                                        color: 'var(--color-text-secondary)',
                                        lineHeight: 'var(--line-height)',
                                        flex: 1,
                                    }}>
                                        {stripHtml(node.excerpt).slice(0, 150)}...
                                    </p>

                                    <span style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 'var(--space-2)',
                                        marginTop: 'var(--space-4)',
                                        color: 'var(--color-primary)',
                                        fontSize: 'var(--fs-sm)',
                                        fontWeight: 'var(--fw-semibold)',
                                    }}>
                                        Read Article →
                                    </span>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            ) : (
                <div style={{
                    textAlign: 'center',
                    padding: 'var(--space-16)',
                    background: 'var(--color-surface)',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid var(--color-border)',
                    maxWidth: '600px',
                    margin: '0 auto',
                }}>
                    <p style={{
                        fontSize: 'var(--fs-lg)',
                        color: 'var(--color-text-muted)',
                        fontWeight: 'var(--fw-medium)',
                    }}>
                        ✍️ New articles are on the way. Check back soon!
                    </p>
                </div>
            )}
        </div>
    );
}
