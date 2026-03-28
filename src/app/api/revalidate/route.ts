import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
    try {
        const secret = request.nextUrl.searchParams.get('secret');

        // Authenticate the request
        if (secret !== process.env.REVALIDATION_SECRET) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }

        // Try to parse the body for a specific path or slug
        let path: string | null = null;
        try {
            const body = await request.json();
            // WP Webhooks sends the post slug in the body
            if (body?.post_name || body?.slug) {
                path = `/blog/${body.post_name || body.slug}`;
            } else if (body?.path) {
                path = body.path;
            }
        } catch {
            // If no body, check query param
            path = request.nextUrl.searchParams.get('path');
        }

        if (path) {
            // Revalidate the specific blog post
            revalidatePath(path);
        }

        // Always revalidate the blog index and sitemap when any content changes
        revalidatePath('/blog');
        revalidatePath('/sitemap.xml');

        return NextResponse.json({
            revalidated: true,
            path: path || '/blog',
            now: Date.now(),
        });
    } catch (err) {
        console.error('Revalidation error:', err);
        return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
    }
}
