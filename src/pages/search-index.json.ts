import { getCollection } from 'astro:content';
import { categoryLabels, getBookSlug, getBookUrl, getEntryUrl, getSlug, withBase } from '../lib/content';
import { pathIndex } from '../lib/curriculum';

export async function GET() {
  const [entries, books] = await Promise.all([
    getCollection('tutorials', ({ data }) => !data.draft),
    getCollection('books', ({ data }) => !data.draft)
  ]);
  const tutorialRecords = entries.map((entry) => ({
    id: entry.data.id,
    lang: entry.data.lang,
    title: entry.data.title,
    description: entry.data.description,
    contentType: 'tutorial',
    category: entry.data.category,
    pathOrder: pathIndex(entry.data.category),
    order: entry.data.order,
    categoryLabel: categoryLabels[entry.data.category][entry.data.lang],
    url: withBase(getEntryUrl(entry)),
    search: [entry.data.title, entry.data.description, entry.data.tags.join(' '), entry.body || '', getSlug(entry)].join(' ')
  }));
  const bookRecords = books.map((entry) => ({
    id: entry.data.id,
    lang: entry.data.lang,
    title: entry.data.title,
    description: entry.data.description,
    contentType: 'book',
    category: 'books',
    pathOrder: 4,
    order: entry.data.order,
    categoryLabel: entry.data.lang === 'en' ? 'Book summary' : 'ملخص كتاب',
    url: withBase(getBookUrl(entry)),
    search: [entry.data.title, entry.data.subtitle, entry.data.description, entry.data.authors.join(' '), entry.data.topics.join(' '), entry.body || '', getBookSlug(entry)].join(' ')
  }));
  const records = [...tutorialRecords, ...bookRecords];
  return new Response(JSON.stringify(records), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}
