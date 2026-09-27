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
    for (const category of ['business', 'technical', 'ai']) {
      const ordered = articles.filter((article) => article.lang === lang && article.category === category).sort((a, b) => a.order - b.order);
      ordered.forEach((article, index) => {
        if (article.order !== index + 1) errors.push(`${lang}/${category}: curriculum orders must be unique and contiguous from 1 (found ${article.order} on ${article.id})`);
      });
    }
  }

  const categoryRank = new Map([['business', 0], ['technical', 1], ['ai', 2]]);
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

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const root = path.join(process.cwd(), 'BAC9-tutorials');
  const result = await validateContentRoot(root, process.cwd());
  if (result.errors.length) {
    console.error(result.errors.join('\n'));
    process.exit(1);
  }
  console.log(`Validated ${result.files.length} localized tutorial files.`);
}
