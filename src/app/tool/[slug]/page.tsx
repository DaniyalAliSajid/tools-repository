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
        title: `${tool.name} | Tools Repository`,
        description: tool.description,
        keywords: tool.keywords.join(', '),
    };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const tool = tools.find(t => t.slug === slug);

    if (!tool) {
        notFound();
    }

    return (
        <>

            <div className="tool-page-header">
                <div className="tool-page-icon">{tool.icon}</div>
                <div className="tool-page-title">
                    <h1>{tool.name}</h1>
                    <p>{tool.description}</p>
                </div>
            </div>

            <div className="tool-container">
                <ToolWrapper slug={tool.slug} />
            </div>

            <FAQSection
                faqs={getToolFAQs(tool)}
                title={`${tool.name} FAQ`}
            />

            {/* Ad Placeholder Bottom */}
            <div className="ad-tool-bottom" style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0', padding: '1rem', background: 'var(--color-surface)', border: '1px dashed var(--color-border)', color: 'var(--color-text-muted)' }}>
                Advertisement Placeholder
            </div>
        </>
    );
}
