// @ts-nocheck
import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseMarkdownFile, splitFrontmatter, validateArticle } from './lib/editor-content.mjs';

const BOOK_REQUIRED_FIELDS = [
  'id', 'translationId', 'lang', 'title', 'subtitle', 'description', 'coverAlt',
  'authors', 'publisher', 'publicationYear', 'isbn', 'pageCount',
  'originalLanguage', 'topics', 'published', 'updated', 'readTime', 'order',
  'coverImage', 'relatedTutorials', 'draft'
];
const BOOK_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const BOOK_COVER_PATTERN = /^\/images\/books\/[^/\\?#]+\.(?:png|jpe?g|webp|gif|svg)$/i;
const BOOK_BODY_IMAGE_PATTERN = /^\.\.\/\.\.\/public\/images\/(en|ar|books)\/[^/\\?#]+\.(?:png|jpe?g|webp|gif|svg)$/i;

export async function contentFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const result = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...await contentFiles(full));
    else if (/\.(?:md|mdx)$/i.test(entry.name)) result.push(full);
  }
  return result;
}

export async function validateContentRoot(root, projectRoot = process.cwd()) {
  const errors = [];
  const warnings = [];
  const files = await contentFiles(root);
  const articles = [];
  const ids = new Set();
  for (const file of files) {
    let article;
    try {
      article = await parseMarkdownFile(file);
    } catch (error) {
      errors.push(`${file}: ${error.message}`);
      continue;
    }
    article._file = file;
    articles.push(article);
    const scopedId = `${article.id}:${article.lang}`;
    if (ids.has(scopedId)) errors.push(`${file}: duplicate id ${article.id} for ${article.lang}`);
    ids.add(scopedId);
  }
  const knownIds = new Set(articles.map((article) => article.id));
  for (const article of articles) {
    const result = await validateArticle(article, { projectRoot, knownIds, allowDraft: false });
    errors.push(...result.errors.map((message) => `${article._file}: ${message}`));
    warnings.push(...result.warnings.map((message) => `${article._file}: ${message}`));
    const expected = path.basename(article._file).replace(/\.(?:md|mdx)$/i, '');
    if (article.id && article.id !== expected) errors.push(`${article._file}: filename must match id (${article.id})`);
  }
  const translations = new Map();
  for (const article of articles) {
    const pair = translations.get(article.translationId) || {};
    if (article.lang) pair[article.lang] = article;
    translations.set(article.translationId, pair);
  }
  for (const [translationId, pair] of translations) {
    if (!pair.en || !pair.ar || Object.keys(pair).length !== 2) {
      errors.push(`${translationId}: must have en and ar translations`);
      continue;
    }
    for (const field of ['id', 'category', 'difficulty', 'order']) {
      if (pair.en[field] !== pair.ar[field]) errors.push(`${translationId}: English and Arabic ${field} values must match`);
    }
    for (const field of ['prerequisites', 'related']) {
      if (JSON.stringify(pair.en[field] || []) !== JSON.stringify(pair.ar[field] || [])) errors.push(`${translationId}: English and Arabic ${field} values must match`);
    }
    if ((pair.en.learningOutcomes || []).length !== (pair.ar.learningOutcomes || []).length) errors.push(`${translationId}: English and Arabic learning outcome counts must match`);
  }

  for (const lang of ['en', 'ar']) {
    for (const category of ['business', 'technical', 'product-design', 'ai']) {
      const ordered = articles.filter((article) => article.lang === lang && article.category === category).sort((a, b) => a.order - b.order);
      ordered.forEach((article, index) => {
        if (article.order !== index + 1) errors.push(`${lang}/${category}: curriculum orders must be unique and contiguous from 1 (found ${article.order} on ${article.id})`);
      });
    }
  }

  const categoryRank = new Map([['business', 0], ['technical', 1], ['product-design', 2], ['ai', 3]]);
  const englishById = new Map(articles.filter((article) => article.lang === 'en').map((article) => [article.translationId, article]));
  const position = (article) => (categoryRank.get(article.category) * 1000) + article.order;
  for (const article of englishById.values()) {
    for (const prerequisiteId of article.prerequisites || []) {
      const prerequisite = englishById.get(prerequisiteId);
      if (prerequisite && position(prerequisite) >= position(article)) errors.push(`${article.id}: prerequisite ${prerequisiteId} must appear earlier in the recommended journey`);
    }
  }
  const visiting = new Set();
  const visited = new Set();
  function visit(id, trail = []) {
    if (visiting.has(id)) {
      errors.push(`${id}: prerequisite cycle detected (${[...trail, id].join(' -> ')})`);
      return;
    }
    if (visited.has(id)) return;
    visiting.add(id);
    const article = englishById.get(id);
    for (const prerequisite of article?.prerequisites || []) if (englishById.has(prerequisite)) visit(prerequisite, [...trail, id]);
    visiting.delete(id);
    visited.add(id);
  }
  for (const id of englishById.keys()) visit(id);
  return { errors, warnings, files, articles };
}

function validDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value || '')) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
}

async function exists(file) {
  try { await access(file); return true; } catch { return false; }
}

export async function validateBooksRoot(root, projectRoot = process.cwd(), tutorialIds = new Set()) {
  const errors = [];
  const warnings = [];
  const files = await contentFiles(root);
  const books = [];

  for (const file of files) {
    let parsed;
    try {
      parsed = splitFrontmatter(await readFile(file, 'utf8'));
    } catch (error) {
      errors.push(`${file}: ${error.message}`);
      continue;
    }
    const book = { ...parsed.data, body: parsed.body, _file: file };
    books.push(book);
    for (const field of BOOK_REQUIRED_FIELDS) {
      if (book[field] === undefined || book[field] === null || book[field] === '') errors.push(`${file}: missing ${field}`);
    }
    if (!BOOK_ID_PATTERN.test(book.id || '')) errors.push(`${file}: id must be lowercase kebab-case`);
    if (!BOOK_ID_PATTERN.test(book.translationId || '')) errors.push(`${file}: translationId must be lowercase kebab-case`);
    if (!['en', 'ar'].includes(book.lang)) errors.push(`${file}: invalid language`);
    if (!Array.isArray(book.authors) || !book.authors.length) errors.push(`${file}: authors must contain at least one author`);
    if (!Array.isArray(book.topics) || !book.topics.length) errors.push(`${file}: topics must contain at least one topic`);
    if (!Array.isArray(book.relatedTutorials)) errors.push(`${file}: relatedTutorials must be an array`);
    if (!Number.isInteger(Number(book.publicationYear)) || Number(book.publicationYear) <= 0) errors.push(`${file}: publicationYear must be a positive integer`);
    for (const field of ['pageCount', 'readTime', 'order']) {
      if (!Number.isInteger(Number(book[field])) || Number(book[field]) <= 0) errors.push(`${file}: ${field} must be a positive integer`);
    }
    if (!validDate(book.published)) errors.push(`${file}: published must be YYYY-MM-DD`);
    if (!validDate(book.updated)) errors.push(`${file}: updated must be YYYY-MM-DD`);
    if (book.draft) errors.push(`${file}: published books cannot be drafts`);
    if (!BOOK_COVER_PATTERN.test(book.coverImage || '')) errors.push(`${file}: coverImage must be a shared /images/books/ asset path`);
    if (book.coverKind !== undefined && !['original', 'generated'].includes(book.coverKind)) errors.push(`${file}: coverKind must be original or generated`);
    const expected = path.basename(file).replace(/\.(?:md|mdx)$/i, '');
    if (book.id && book.id !== expected) errors.push(`${file}: filename must match id (${book.id})`);
    if (book.coverImage && !(await exists(path.join(projectRoot, 'public', book.coverImage.replace(/^\//, ''))))) errors.push(`${file}: cover image does not exist: ${book.coverImage}`);
    for (const id of book.relatedTutorials || []) if (!tutorialIds.has(id)) errors.push(`${file}: related tutorial does not exist: ${id}`);

    const imageReferences = [...String(book.body || '').matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)].map((match) => match[1].trim());
    for (const image of imageReferences) {
      if (!BOOK_BODY_IMAGE_PATTERN.test(image)) errors.push(`${file}: unsafe or unsupported image reference: ${image}`);
      else if (!image.startsWith(`../../public/images/${book.lang}/`) && !image.startsWith('../../public/images/books/')) errors.push(`${file}: image language does not match lang: ${image}`);
      else if (!(await exists(path.resolve(path.dirname(file), image)))) errors.push(`${file}: image does not exist: ${image}`);
    }
  }

  const scopedIds = new Set();
  for (const book of books) {
    const scoped = `${book.id}:${book.lang}`;
    if (scopedIds.has(scoped)) errors.push(`${book._file}: duplicate id ${book.id} for ${book.lang}`);
    scopedIds.add(scoped);
  }

  const translations = new Map();
  for (const book of books) {
    const pair = translations.get(book.translationId) || {};
    if (book.lang) pair[book.lang] = book;
    translations.set(book.translationId, pair);
  }
  for (const [translationId, pair] of translations) {
    if (!pair.en || !pair.ar || Object.keys(pair).length !== 2) {
      errors.push(`${translationId}: book must have en and ar translations`);
      continue;
    }
    for (const field of ['id', 'designer', 'publisher', 'publicationYear', 'isbn', 'pageCount', 'originalLanguage', 'order', 'coverImage']) {
      if (pair.en[field] !== pair.ar[field]) errors.push(`${translationId}: English and Arabic ${field} values must match`);
    }
    if ((pair.en.coverKind || 'original') !== (pair.ar.coverKind || 'original')) errors.push(`${translationId}: English and Arabic coverKind values must match`);
    for (const field of ['authors', 'relatedTutorials']) {
      if (JSON.stringify(pair.en[field] || []) !== JSON.stringify(pair.ar[field] || [])) errors.push(`${translationId}: English and Arabic ${field} values must match`);
    }
  }

  for (const lang of ['en', 'ar']) {
    const ordered = books.filter((book) => book.lang === lang).sort((a, b) => a.order - b.order);
    ordered.forEach((book, index) => {
      if (book.order !== index + 1) errors.push(`${lang}/books: orders must be unique and contiguous from 1 (found ${book.order} on ${book.id})`);
    });
  }

  return { errors, warnings, files, books };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const projectRoot = process.cwd();
  const tutorials = await validateContentRoot(path.join(projectRoot, 'BAC9-tutorials'), projectRoot);
  const tutorialIds = new Set(tutorials.articles.map((article) => article.translationId));
  const books = await validateBooksRoot(path.join(projectRoot, 'BAC9-books'), projectRoot, tutorialIds);
  const errors = [...tutorials.errors, ...books.errors];
  if (errors.length) {
    console.error(errors.join('\n'));
    process.exit(1);
  }
  console.log(`Validated ${tutorials.files.length} localized tutorial files and ${books.files.length} localized book files.`);
}
