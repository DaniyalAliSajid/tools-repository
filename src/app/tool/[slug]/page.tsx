import { tools } from '../../../vanilla/registry';
import ToolWrapper from '../../../components/ToolWrapper';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import FAQSection from '../../../components/FAQSection';
import { getToolFAQs } from '../../../vanilla/faqs';

export async function generateStaticParams() {
    return tools.map((tool) => ({
        slug: tool.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const tool = tools.find(t => t.slug === slug);
    if (!tool) return {};

    return {
        title: tool.name, // Template in layout handles the suffix
        description: tool.description,
        keywords: tool.keywords.join(', '),
        openGraph: {
            title: `${tool.name} — Free Online Tool`,
            description: tool.description,
            type: 'website',
            url: `https://toolsrepository.com/tool/${tool.slug}`,
        },
        alternates: {
            canonical: `https://toolsrepository.com/tool/${tool.slug}`,
        }
    };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const tool = tools.find(t => t.slug === slug);

    if (!tool) {
        notFound();
    }

    // Generate structured data for AEO/GEO
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: tool.name,
        description: tool.description,
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        author: {
            '@type': 'Organization',
            name: 'Tools Repository',
        }
    };

    return (
        <div className="container">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="tool-page-header">
                <div className="tool-page-icon">{tool.icon}</div>
                <div className="tool-page-title">
                    <h1>{tool.name}</h1>
                    <p>{tool.description}</p>
                </div>
            </div>

            <div className="tool-content-area">
                <ToolWrapper slug={tool.slug} />
            </div>

            <FAQSection
                faqs={getToolFAQs(tool)}
                title={`${tool.name} FAQ`}
                subtitle={`Common questions about our ${tool.name} tool.`}
            />

            {/* Ad Placeholder Bottom */}
            <div className="ad-slot">
                Advertisement Placeholder
            </div>
        </div>
    );
}
