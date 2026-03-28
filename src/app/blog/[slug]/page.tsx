import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '../../../utils/graphql';

export const revalidate = 3600; // ISR: revalidate hourly, plus on-demand via webhook

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return { title: 'Post Not Found' };
    }

    const plainExcerpt = post.content
        ? post.content.replace(/<[^>]*>/g, '').slice(0, 160)
        : `Read ${post.title} on Tools Repository Blog.`;

    return {
        title: post.title,
        description: plainExcerpt,
        alternates: {
            canonical: `https://toolsrepository.com/blog/${post.slug}`,
        },
        openGraph: {
            title: post.title,
            description: plainExcerpt,
            type: 'article',
            url: `https://toolsrepository.com/blog/${post.slug}`,
            publishedTime: post.date,
            modifiedTime: post.modified,
            ...(post.featuredImage?.node?.mediaItemUrl && {
                images: [{ url: post.featuredImage.node.mediaItemUrl }],
            }),
        },
    };
}

function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    // JSON-LD structured data for AEO/GEO ranking
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        datePublished: post.date,
        dateModified: post.modified || post.date,
        author: {
            '@type': 'Person',
            name: post.author?.node?.name || 'Tools Repository',
        },
        publisher: {
            '@type': 'Organization',
            name: 'Tools Repository',
            url: 'https://toolsrepository.com',
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://toolsrepository.com/blog/${post.slug}`,
        },
        ...(post.featuredImage?.node?.mediaItemUrl && {
            image: post.featuredImage.node.mediaItemUrl,
        }),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <article className="container" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: 'var(--space-10)', paddingBottom: 'var(--space-16)' }}>

                {/* Breadcrumbs for SEO */}
                <nav aria-label="Breadcrumb" style={{
                    fontSize: 'var(--fs-sm)',
                    color: 'var(--color-text-muted)',
                    marginBottom: 'var(--space-6)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                }}>
                    <Link href="/" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Home</Link>
                    <span>/</span>
                    <Link href="/blog" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Blog</Link>
                    <span>/</span>
                    <span style={{ color: 'var(--color-text-secondary)' }}>{post.title}</span>
                </nav>

                {/* Post Title */}
                <h1 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(var(--fs-2xl), 5vw, var(--fs-4xl))',
                    fontWeight: 'var(--fw-bold)',
                    color: 'var(--color-text)',
                    lineHeight: 1.15,
                    marginBottom: 'var(--space-6)',
                }}>
                    {post.title}
                </h1>

                {/* Author & Date Meta */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-4)',
                    marginBottom: 'var(--space-8)',
                    paddingBottom: 'var(--space-6)',
                    borderBottom: '1px solid var(--color-border)',
                }}>
                    {post.author?.node?.avatar?.url && (
                        <img
                            src={post.author.node.avatar.url}
                            alt={post.author.node.name}
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: 'var(--radius-full)',
                                objectFit: 'cover',
                            }}
                        />
                    )}
                    <div>
                        <p style={{
                            fontWeight: 'var(--fw-semibold)',
                            fontSize: 'var(--fs-sm)',
                            color: 'var(--color-text)',
                            margin: 0,
                        }}>
                            {post.author?.node?.name || 'Tools Repository'}
                        </p>
                        <time
                            dateTime={post.date}
                            style={{
                                fontSize: 'var(--fs-xs)',
                                color: 'var(--color-text-muted)',
                            }}
                        >
                            {formatDate(post.date)}
                            {post.modified && post.modified !== post.date && (
                                <> · Updated {formatDate(post.modified)}</>
                            )}
                        </time>
                    </div>
                </div>

                {/* Featured Image */}
                {post.featuredImage?.node?.mediaItemUrl && (
                    <div style={{
                        marginBottom: 'var(--space-10)',
                        borderRadius: 'var(--radius-xl)',
                        overflow: 'hidden',
                        border: '1px solid var(--color-border)',
                    }}>
                        <img
                            src={post.featuredImage.node.mediaItemUrl}
                            alt={post.featuredImage.node.altText || post.title}
                            style={{
                                width: '100%',
                                height: 'auto',
                                display: 'block',
                            }}
                        />
                    </div>
                )}

                {/* Article Content */}
                <div
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                    style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'var(--fs-md)',
                        lineHeight: 1.8,
                        color: 'var(--color-text)',
                    }}
                />

                {/* Back to Blog CTA */}
                <div style={{
                    marginTop: 'var(--space-16)',
                    paddingTop: 'var(--space-8)',
                    borderTop: '1px solid var(--color-border)',
                    textAlign: 'center',
                }}>
                    <Link
                        href="/blog"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 'var(--space-2)',
                            padding: 'var(--space-3) var(--space-6)',
                            background: 'var(--grad-primary)',
                            color: 'var(--color-text-inverse)',
                            borderRadius: 'var(--radius-lg)',
                            fontWeight: 'var(--fw-semibold)',
                            fontSize: 'var(--fs-sm)',
                            textDecoration: 'none',
                            transition: 'var(--transition-normal)',
                        }}
                    >
                        ← Back to All Articles
                    </Link>
                </div>
            </article>
        </>
    );
}
