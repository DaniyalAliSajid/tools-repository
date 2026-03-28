import { MetadataRoute } from 'next';
import { tools } from '../vanilla/registry';
import { getAllPosts } from '../utils/graphql';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://toolsrepository.com';

    // Core static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/advertise`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
    ];

    // Tool pages
    const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
        url: `${baseUrl}/tool/${tool.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    // Blog posts from WordPress (live data)
    let blogPosts: MetadataRoute.Sitemap = [];
    try {
        const postsEdges = await getAllPosts(100);
        blogPosts = postsEdges.map(({ node }: any) => ({
            url: `${baseUrl}/blog/${node.slug}`,
            lastModified: new Date(node.date),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }));
    } catch (err) {
        console.error('Sitemap: Failed to fetch blog posts', err);
    }

    return [...staticPages, ...toolPages, ...blogPosts];
}
