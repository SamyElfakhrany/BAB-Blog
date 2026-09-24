// @ts-nocheck
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.join(process.cwd(), 'src/content/tutorials');
const required = ['id', 'translationId', 'lang', 'title', 'description', 'category', 'difficulty', 'published', 'updated', 'readTime', 'heroImage', 'related', 'draft'];
const allowed = {
  lang: new Set(['en', 'ar']),
  category: new Set(['business', 'technical', 'ai']),
  difficulty: new Set(['beginner', 'intermediate', 'advanced'])
};

async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const result = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...await files(full));
    else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) result.push(full);
  }
  return result;
}

const errors = [];
const seenIds = new Set();
const seenTranslations = new Map();
for (const file of await files(root)) {
  const text = await readFile(file, 'utf8');
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    errors.push(`${file}: missing frontmatter`);
    continue;
  }
  const fields = Object.fromEntries(match[1].split('\n').filter(Boolean).map((line) => {
    const index = line.indexOf(':');
    return [line.slice(0, index), line.slice(index + 1).trim()];
  }));
  for (const name of required) if (!(name in fields)) errors.push(`${file}: missing ${name}`);
  for (const name of ['lang', 'category', 'difficulty']) if (fields[name] && !allowed[name].has(fields[name])) errors.push(`${file}: invalid ${name}`);
  const scopedId = fields.id && fields.lang ? `${fields.id}:${fields.lang}` : fields.id;
  if (scopedId && seenIds.has(scopedId)) errors.push(`${file}: duplicate id ${fields.id} for ${fields.lang}`);
  if (scopedId) seenIds.add(scopedId);
  if (fields.translationId) {
    const current = seenTranslations.get(fields.translationId) || new Set();
    current.add(fields.lang);
    seenTranslations.set(fields.translationId, current);
  }
  if (/!\[\[/.test(text)) errors.push(`${file}: Obsidian image wikilink remains`);
}
for (const [id, langs] of seenTranslations) if (langs.size !== 2 || !langs.has('en') || !langs.has('ar')) errors.push(`${id}: must have en and ar translations`);
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Validated ${seenIds.size} localized tutorial files.`);
