import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
    const blog = await getCollection('blog');

    return rss({
        title: 'Blog de Laravel Jutsu',
        description: 'Le meilleur du Laravel et Vue français !',
        site: context.site,
        items: blog.map((post) => ({
            title: post.data.title,
            pubDate: post.data.pubDate,
            description: post.data.description,
            link: `/blog/${post.slug}/`,
        })),
        customData: `<language>fr-FR</language>`,
    });
}