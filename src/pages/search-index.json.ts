import { getCollection } from 'astro:content';
import { categoryLabels, getEntryUrl, getSlug, withBase } from '../lib/content';

export async function GET() {
  const entries = await getCollection('tutorials', ({ data }) => !data.draft);
  const records = entries.map((entry) => ({
    id: entry.data.id,
    lang: entry.data.lang,
    title: entry.data.title,
    description: entry.data.description,
    category: entry.data.category,
    categoryLabel: categoryLabels[entry.data.category][entry.data.lang],
    url: withBase(getEntryUrl(entry)),
    search: [entry.data.title, entry.data.description, entry.data.tags.join(' '), entry.body || '', getSlug(entry)].join(' ')
  }));
  return new Response(JSON.stringify(records), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}
