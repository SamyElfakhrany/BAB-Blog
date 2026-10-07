// @ts-nocheck
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { brand } from '../lib/brand';

export async function GET(context) {
  const entries = await getCollection('tutorials', ({ data }) => data.lang === 'en' && !data.draft);
  return rss({
    title: `${brand.displayName} · ${brand.expansion.en}`,
    description: brand.description.en,
    site: context.site || context.url,
    items: entries.map((entry) => ({ title: entry.data.title, description: entry.data.description, pubDate: entry.data.published, link: `en/${entry.data.category}/${entry.data.id}/` }))
  });
}
