// @ts-nocheck
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const entries = await getCollection('tutorials', ({ data }) => data.lang === 'en' && !data.draft);
  return rss({
    title: 'BAC9 · Business Analysis Bootcamp',
    description: 'Practical business analysis tutorials about concepts, technical collaboration, and AI.',
    site: context.site || context.url,
    items: entries.map((entry) => ({ title: entry.data.title, description: entry.data.description, pubDate: entry.data.published, link: `/en/${entry.data.category}/${entry.data.id}/` }))
  });
}
