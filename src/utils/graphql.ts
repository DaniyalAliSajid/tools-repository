const WP_GRAPHQL_URL = process.env.WP_GRAPHQL_URL || 'https://cms.toolsrepository.com/graphql';

/**
 * Common fetch utility for WPGraphQL interactions.
 * It encodes the Application Password securely.
 */
async function fetchAPI(query: string, { variables }: { variables?: any } = {}) {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (process.env.WP_API_USER && process.env.WP_APP_PASSWORD) {
        const token = Buffer.from(
            `${process.env.WP_API_USER}:${process.env.WP_APP_PASSWORD}`
        ).toString('base64');
        headers['Authorization'] = `Basic ${token}`;
    }

    try {
        const res = await fetch(WP_GRAPHQL_URL, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                query,
                variables,
            }),
            next: { revalidate: 3600 }, // Default ISR cache time
        });

        const json = await res.json();
        if (json.errors) {
            console.error(json.errors);
            throw new Error('Failed to fetch WordPress API');
        }
        return json.data;
    } catch (err) {
        console.error('Fetch error:', err);
        return null;
    }
}

/**
 * Fetches the latest published posts for the blog index.
 */
export async function getAllPosts(first = 20) {
    const data = await fetchAPI(
        `
        query AllPosts($first: Int!) {
            posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
                edges {
                    node {
                        id
                        title
                        slug
                        date
                        excerpt
                        featuredImage {
                            node {
                                mediaItemUrl
                                altText
                            }
                        }
                    }
                }
            }
        }
        `,
        { variables: { first } }
    );

    return data?.posts?.edges || [];
}

/**
 * Fetches a single post by slug, including full HTML content.
 */
export async function getPostBySlug(slug: string) {
    const data = await fetchAPI(
        `
        query PostBySlug($slug: ID!) {
            post(id: $slug, idType: SLUG) {
                title
                content
                date
                slug
                modified
                featuredImage {
                    node {
                        mediaItemUrl
                        altText
                    }
                }
                author {
                    node {
                        name
                        avatar {
                            url
                        }
                    }
                }
            }
        }
        `,
        { variables: { slug } }
    );

    return data?.post || null;
}
