// @ts-nocheck
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import YAML from 'yaml';

export const CATEGORIES = new Set(['business', 'technical', 'ai']);
export const DIFFICULTIES = new Set(['beginner', 'intermediate', 'advanced']);
export const LANGUAGES = new Set(['en', 'ar']);
export const REQUIRED_FIELDS = [
  'id', 'translationId', 'lang', 'title', 'description', 'category', 'tags',
  'difficulty', 'published', 'updated', 'readTime', 'heroImage', 'related', 'draft'
];

const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const IMAGE_PATTERN = /^\/images\/(en|ar)\/[^/\\?#]+\.(?:png|jpe?g|webp|gif|svg)$/i;
const CONTENT_IMAGE_PATTERN = /^(?:\/images\/|(?:\.\.\/){3}(?:public\/)?images\/)(en|ar)\/[^/\\?#]+\.(?:png|jpe?g|webp|gif|svg)$/i;

export function splitFrontmatter(source) {
  const text = String(source ?? '').replace(/\r\n/g, '\n');
  const match = text.match(/^---\n([\s\S]*?)\n---(?:\n|$)/);
  if (!match) return { data: {}, body: text.trim(), hasFrontmatter: false };
  let data;
  try {
    data = YAML.parse(match[1]) || {};
  } catch (error) {
    const wrapped = new Error(`Invalid YAML frontmatter: ${error.message}`);
    wrapped.code = 'INVALID_FRONTMATTER';
    throw wrapped;
  }
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('Frontmatter must be a YAML object.');
  }
  return { data, body: text.slice(match[0].length).trim(), hasFrontmatter: true };
}

export function serializeFrontmatter(data, body) {
  const ordered = {};
  for (const name of REQUIRED_FIELDS) if (name in data) ordered[name] = data[name];
  for (const [name, value] of Object.entries(data)) if (!(name in ordered)) ordered[name] = value;
  return `---\n${YAML.stringify(ordered).trim()}\n---\n${String(body ?? '').replace(/\r\n/g, '\n').trim()}\n`;
}

function cleanFilename(value) {
  return path.basename(String(value).split(/[?#]/)[0].trim());
}

function imagePath(value, lang) {
  const filename = cleanFilename(value);
  return `../../../public/images/${lang}/${filename}`;
}

export function normalizeMarkdown(source, lang, { sourceRoot } = {}) {
  let body = String(source ?? '').replace(/\r\n/g, '\n').trim();
  const warnings = [];
  body = body.replace(/!\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, filename, alt) => {
    const output = imagePath(filename, lang);
    warnings.push(`Converted Obsidian image link: ${filename}`);
    return `![${alt || cleanFilename(filename)}](${output})`;
  });
  body = body.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, href) => {
    const value = href.trim();
    if (/^(?:https?:|data:|javascript:)/i.test(value)) return `![${alt}](${value})`;
    const output = value.startsWith('/images/') ? value : imagePath(value, lang);
    if (output !== value) warnings.push(`Normalized image path: ${value}`);
    return `![${alt || cleanFilename(output)}](${output})`;
  });
  body = body.replace(/\[([^\]]+)\]\(([^)]+\.(?:png|jpe?g|webp|gif|svg)(?:#[^)]*)?)\)/gi, (_, label, href) => {
    const value = href.trim();
    if (/^(?:https?:|data:|javascript:)/i.test(value)) return `[${label}](${value})`;
    const output = value.startsWith('/images/') ? value : imagePath(value, lang);
    warnings.push(`Normalized asset link: ${value}`);
    return `[${label}](${output})`;
  });
  body = body.replace(/^# (Edit docs\/|Open a pull request)/gm, '### $1');
  body = body.replace(/\n{3,}/g, '\n\n');
  return { body, warnings };
}

export function componentImports(body) {
  const names = [...new Set([...String(body).matchAll(/<([A-Z][A-Za-z0-9]*)\b/g)].map((match) => match[1]))];
  const known = new Set(['ExerciseBlock', 'TemplateBlock', 'Diagram', 'Callout', 'AssetLink', 'CopyButton']);
  return names.filter((name) => known.has(name)).map((name) => `import ${name} from '../../../../components/${name}.astro';`).join('\n');
}

export function removeComponentImports(body) {
  return String(body ?? '').replace(/^import\s+[A-Za-z0-9{}, *]+\s+from\s+['"][^'"]+['"];?\s*$/gm, '').trim();
}

function asString(value) {
  return typeof value === 'string' ? value.trim() : value == null ? '' : String(value).trim();
}

function asStringArray(value) {
  if (Array.isArray(value)) return value.map(asString).filter(Boolean);
  if (typeof value === 'string') return value.split(',').map((item) => item.trim()).filter(Boolean);
  return [];
}

export function articleFromSource(source, fallback = {}) {
  const parsed = splitFrontmatter(source);
  return {
    id: asString(parsed.data.id ?? fallback.id),
    translationId: asString(parsed.data.translationId ?? fallback.translationId),
    lang: asString(parsed.data.lang ?? fallback.lang),
    title: asString(parsed.data.title ?? fallback.title),
    description: asString(parsed.data.description ?? fallback.description),
    category: asString(parsed.data.category ?? fallback.category),
    tags: asStringArray(parsed.data.tags ?? fallback.tags),
    difficulty: asString(parsed.data.difficulty ?? fallback.difficulty),
    published: asString(parsed.data.published ?? fallback.published),
    updated: asString(parsed.data.updated ?? fallback.updated),
    readTime: Number(parsed.data.readTime ?? fallback.readTime ?? 0),
    heroImage: asString(parsed.data.heroImage ?? fallback.heroImage),
    related: asStringArray(parsed.data.related ?? fallback.related),
    draft: Boolean(parsed.data.draft ?? fallback.draft ?? false),
    body: parsed.body
  };
}

export async function pathExists(file) {
  try { await access(file); return true; } catch { return false; }
}

function dateIsValid(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
}

function safeRelative(root, candidate) {
  const resolved = path.resolve(root, candidate);
  return resolved === path.resolve(root) || resolved.startsWith(`${path.resolve(root)}${path.sep}`);
}

export async function validateArticle(article, { projectRoot, knownIds = new Set(), allowDraft = false } = {}) {
  const errors = [];
  const warnings = [];
  if (!article || typeof article !== 'object') return { errors: ['Article is required.'], warnings };
  for (const field of REQUIRED_FIELDS) if (article[field] === undefined || article[field] === null || article[field] === '') errors.push(`${article.lang || 'article'}: missing ${field}`);
  if (!ID_PATTERN.test(article.id || '')) errors.push(`${article.lang || 'article'}: id must be lowercase kebab-case`);
  if (!ID_PATTERN.test(article.translationId || '')) errors.push(`${article.lang || 'article'}: translationId must be lowercase kebab-case`);
  if (!LANGUAGES.has(article.lang)) errors.push(`${article.id || 'article'}: invalid language`);
  if (!CATEGORIES.has(article.category)) errors.push(`${article.id || 'article'}: invalid category`);
  if (!DIFFICULTIES.has(article.difficulty)) errors.push(`${article.id || 'article'}: invalid difficulty`);
  if (!Array.isArray(article.tags)) errors.push(`${article.id || 'article'}: tags must be an array`);
  if (!Array.isArray(article.related)) errors.push(`${article.id || 'article'}: related must be an array`);
  if (!dateIsValid(article.published)) errors.push(`${article.id || 'article'}: published must be YYYY-MM-DD`);
  if (!dateIsValid(article.updated)) errors.push(`${article.id || 'article'}: updated must be YYYY-MM-DD`);
  if (!Number.isInteger(Number(article.readTime)) || Number(article.readTime) <= 0) errors.push(`${article.id || 'article'}: readTime must be a positive integer`);
  if (!IMAGE_PATTERN.test(article.heroImage || '')) errors.push(`${article.id || 'article'}: heroImage must be a /images/{lang}/ asset path`);
  if (article.heroImage && article.lang && !article.heroImage.startsWith(`/images/${article.lang}/`)) errors.push(`${article.id || 'article'}: heroImage language does not match lang`);
  if (!allowDraft && article.draft) errors.push(`${article.id || 'article'}: published articles cannot be drafts`);
  if (article.body && /!\[\[|(?:^|\s)\[\[[^\]]+\]\]/m.test(article.body)) errors.push(`${article.id || 'article'}: Obsidian wikilinks remain`);
  const imageReferences = [...String(article.body || '').matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)].map((match) => match[1].trim());
  for (const image of imageReferences) {
    if (!CONTENT_IMAGE_PATTERN.test(image)) errors.push(`${article.id || 'article'}: unsafe or unsupported image reference: ${image}`);
    else if (article.lang && ![`/images/${article.lang}/`, `../../../images/${article.lang}/`, `../../../public/images/${article.lang}/`].some((prefix) => image.startsWith(prefix))) errors.push(`${article.id || 'article'}: image language does not match lang: ${image}`);
    else if (projectRoot) {
      const publicImage = image.replace(/^\/images\//, 'images/').replace(/^(?:\.\.\/){3}(?:public\/)?images\//, 'images/');
      if (!(await pathExists(path.join(projectRoot, 'public', publicImage)))) errors.push(`${article.id || 'article'}: image does not exist: ${image}`);
    }
  }
  for (const related of article.related || []) if (!knownIds.has(related) && related !== article.id) errors.push(`${article.id || 'article'}: related tutorial does not exist: ${related}`);
  if (projectRoot && article.heroImage) {
    const relative = article.heroImage.replace(/^\//, '');
    if (!safeRelative(projectRoot, path.join('public', relative))) errors.push(`${article.id || 'article'}: unsafe hero image path`);
    else if (!(await pathExists(path.join(projectRoot, 'public', relative)))) errors.push(`${article.id || 'article'}: hero image does not exist: ${article.heroImage}`);
  }
  if (article.body && /<([A-Z][A-Za-z0-9]*)\b/.test(article.body)) warnings.push(`${article.id || 'article'}: MDX components will not execute in the editor preview.`);
  return { errors, warnings };
}

export async function validateDocument(document, options = {}) {
  const errors = [];
  const warnings = [];
  if (!document || !document.en || !document.ar) return { errors: ['English and Arabic versions are both required.'], warnings };
  if (document.en.translationId !== document.ar.translationId) errors.push('English and Arabic translationId values must match.');
  if (document.translationId && document.translationId !== document.en.translationId) errors.push('Document translationId does not match the English article.');
  if (document.en.lang !== 'en') errors.push('The English document must have lang: en.');
  if (document.ar.lang !== 'ar') errors.push('The Arabic document must have lang: ar.');
  const ids = new Set(options.knownIds || []);
  ids.add(document.en.id); ids.add(document.ar.id);
  for (const article of [document.en, document.ar]) {
    const result = await validateArticle(article, { ...options, knownIds: ids, allowDraft: false });
    errors.push(...result.errors); warnings.push(...result.warnings);
    const conflict = (options.existingArticles || []).find((existing) => existing.lang === article.lang && existing.id === article.id && existing.translationId !== document.translationId);
    if (conflict) errors.push(`${article.id}: id is already used by translation ${conflict.translationId}`);
  }
  if (document.en.id === document.ar.id) errors.push('English and Arabic IDs must be unique per language.');
  return { errors, warnings };
}

export async function parseMarkdownFile(file, fallback = {}) {
  return articleFromSource(await readFile(file, 'utf8'), fallback);
}
