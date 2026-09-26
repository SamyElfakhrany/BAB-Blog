// @ts-nocheck
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseMarkdownFile, validateArticle } from './lib/editor-content.mjs';

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
    const languages = translations.get(article.translationId) || new Set();
    if (article.lang) languages.add(article.lang);
    translations.set(article.translationId, languages);
  }
  for (const [translationId, languages] of translations) {
    if (!languages.has('en') || !languages.has('ar') || languages.size !== 2) errors.push(`${translationId}: must have en and ar translations`);
  }
  return { errors, warnings, files, articles };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const root = path.join(process.cwd(), 'BAC9-tutorials');
  const result = await validateContentRoot(root, process.cwd());
  if (result.errors.length) {
    console.error(result.errors.join('\n'));
    process.exit(1);
  }
  console.log(`Validated ${result.files.length} localized tutorial files.`);
}
