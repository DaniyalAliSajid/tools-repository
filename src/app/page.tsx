import HomeClient from '../components/HomeClient';

export default function Home() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Tools Repository',
        url: 'https://tools-repository.com',
        description: 'A curated collection of high-performance, privacy-first utility tools designed to speed up your workflow.',
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://tools-repository.com/?q={search_term_string}'
            },
            'query-input': 'required name=search_term_string'
        }
    };

    const orgJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Tools Repository',
        url: 'https://tools-repository.com',
        logo: 'https://tools-repository.com/logo.svg',
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
            />
            <HomeClient />
        </>
    );
}
