// @ts-nocheck
import { createHash, randomBytes } from 'node:crypto';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, unlink, rename } from 'node:fs/promises';
import path from 'node:path';
import { contentFiles } from './validate-content.mjs';
import {
  articleFromSource,
  normalizeMarkdown,
  removeComponentImports,
  serializeFrontmatter,
  validateDocument
} from './lib/editor-content.mjs';

const execFileAsync = promisify(execFile);
const projectRoot = path.resolve(process.cwd());
const adminRoot = path.join(projectRoot, 'admin');
const contentRoot = path.join(projectRoot, 'BAC9-tutorials');
const draftsRoot = path.join(projectRoot, '.bac9-drafts');
const token = randomBytes(24).toString('hex');
const port = Number(process.env.BAC9_EDITOR_PORT || 4322);

function isSafeId(value) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value || '');
}

function json(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
  res.end(body);
}

function fail(res, status, message, extra = {}) {
  json(res, status, { ok: false, error: message, ...extra });
}

function hash(text) {
  return createHash('sha256').update(text).digest('hex');
}

async function readRequest(req) {
  let body = '';
  for await (const chunk of req) {
    body += chunk;
    if (body.length > 12_000_000) throw new Error('Request is too large.');
  }
  return body ? JSON.parse(body) : {};
}

async function safeWrite(file, content) {
  await mkdir(path.dirname(file), { recursive: true });
  const temporary = `${file}.${process.pid}.${randomBytes(4).toString('hex')}.tmp`;
  await writeFile(temporary, content, 'utf8');
  await rename(temporary, file);
}

async function findArticles() {
  const files = await contentFiles(contentRoot);
  const articles = [];
  for (const file of files) {
    try {
      const source = await readFile(file, 'utf8');
      const article = articleFromSource(source);
      article._sourceHash = hash(source);
      article._sourcePath = path.relative(projectRoot, file).replaceAll(path.sep, '/');
      articles.push(article);
    } catch {
      // The validator reports malformed documents; the selector should remain usable.
    }
  }
  return articles;
}

function publicArticle(article) {
  const { _sourceHash, _sourcePath, ...safe } = article;
  return { ...safe, sourceHash: _sourceHash, sourcePath: _sourcePath };
}

async function currentDocument(translationId) {
  const articles = (await findArticles()).filter((article) => article.translationId === translationId);
  if (!articles.length) return null;
  return {
    translationId,
    en: publicArticle(articles.find((article) => article.lang === 'en')),
    ar: publicArticle(articles.find((article) => article.lang === 'ar'))
  };
}

function draftFile(translationId) {
  if (!isSafeId(translationId)) throw new Error('Invalid translation ID.');
  return path.join(draftsRoot, translationId, 'document.json');
}

async function readDraft(translationId) {
  try {
    return JSON.parse(await readFile(draftFile(translationId), 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}

async function knownIds() {
  return new Set((await findArticles()).map((article) => article.id));
}

function articlePath(article) {
  if (!article || !isSafeId(article.id) || !['en', 'ar'].includes(article.lang) || !['business', 'technical', 'ai'].includes(article.category)) {
    throw new Error('Unsafe article path.');
  }
  const file = path.resolve(contentRoot, article.lang, article.category, `${article.id}.md`);
  if (!file.startsWith(`${contentRoot}${path.sep}`)) throw new Error('Unsafe article path.');
  return file;
}

function buildSource(article) {
  const normalized = normalizeMarkdown(removeComponentImports(article.body), article.lang).body;
  return serializeFrontmatter({
    id: article.id,
    translationId: article.translationId,
    lang: article.lang,
    title: article.title,
    description: article.description,
    category: article.category,
    tags: article.tags,
    difficulty: article.difficulty,
    published: article.published,
    updated: article.updated,
    readTime: Number(article.readTime),
    order: Number(article.order),
    prerequisites: article.prerequisites,
    learningOutcomes: article.learningOutcomes,
    practicalSkill: article.practicalSkill,
    heroImage: article.heroImage,
    related: article.related,
    draft: false
  }, normalized);
}

async function run(command, args) {
  const executable = command === 'npm' && process.platform === 'win32' ? 'npm.cmd' : command;
  try {
    const result = await execFileAsync(executable, args, { cwd: projectRoot, maxBuffer: 20 * 1024 * 1024, windowsHide: true });
    return { ok: true, output: `${result.stdout || ''}${result.stderr || ''}`.trim() };
  } catch (error) {
    const output = `${error.stdout || ''}${error.stderr || ''}${error.message || ''}`.trim();
    return { ok: false, output, code: error.code };
  }
}

async function restore(snapshot) {
  for (const [file, value] of snapshot) {
    if (value === null) {
      try { await unlink(file); } catch (error) { if (error.code !== 'ENOENT') throw error; }
    } else {
      await safeWrite(file, value);
    }
  }
}

async function remoteActionsUrl() {
  const remote = await run('git', ['remote', 'get-url', 'origin']);
  if (!remote.ok) return null;
  const match = remote.output.match(/github\.com[/:]([^/]+)\/([^/.]+?)(?:\.git)?$/i);
  return match ? `https://github.com/${match[1]}/${match[2]}/actions/workflows/deploy.yml` : null;
}

async function publish(document, expectedHashes = {}) {
  const existing = await findArticles();
  const ids = new Set(existing.map((article) => article.id));
  const validation = await validateDocument(document, { projectRoot, knownIds: ids, existingArticles: existing });
  if (validation.errors.length) return { ok: false, status: 400, validation };
  for (const article of [document.en, document.ar]) {
    const current = existing.find((item) => item.lang === article.lang && item.id === article.id);
    const expected = expectedHashes[article.lang] || article.sourceHash;
    if (current && expected && current._sourceHash !== expected) {
      return { ok: false, status: 409, error: `The ${article.lang} source changed on disk. Reload it before publishing.` };
    }
  }
  const outputs = [document.en, document.ar].map((article) => ({ article, file: articlePath(article) }));
  const oldPaths = existing.filter((article) => article.translationId === document.translationId).map((article) => path.resolve(projectRoot, article._sourcePath));
  const affected = new Set([...outputs.map(({ file }) => file), ...oldPaths]);
  const snapshot = new Map();
  for (const file of affected) {
    try { snapshot.set(file, await readFile(file, 'utf8')); } catch (error) { if (error.code === 'ENOENT') snapshot.set(file, null); else throw error; }
  }
  try {
    for (const oldPath of oldPaths) if (!outputs.some(({ file }) => file === oldPath)) await unlink(oldPath);
    for (const { article, file } of outputs) await safeWrite(file, buildSource(article));
    for (const command of [['npm', ['run', 'validate:content']], ['npm', ['run', 'check']], ['npm', ['run', 'build']]]) {
      const result = await run(command[0], command[1]);
      if (!result.ok) {
        await restore(snapshot);
        return { ok: false, status: 422, error: `Publish stopped at ${command[1].join(' ')}. Previous files were restored.`, output: result.output };
      }
    }
    const relativeAffected = [...affected].map((file) => path.relative(projectRoot, file).replaceAll(path.sep, '/'));
    const staged = await run('git', ['add', '--', ...relativeAffected]);
    if (!staged.ok) throw new Error(`Git stage failed: ${staged.output}`);
    const changed = await run('git', ['diff', '--cached', '--quiet']);
    if (changed.ok) return { ok: false, status: 409, error: 'There are no content changes to commit.' };
    const commit = await run('git', ['commit', '-m', `Publish tutorial: ${document.translationId}`]);
    if (!commit.ok) throw new Error(`Git commit failed: ${commit.output}`);
    const head = await run('git', ['rev-parse', 'HEAD']);
    const commitHash = head.ok ? head.output.split(/\s+/).at(-1) : null;
    const pushed = await run('git', ['push', 'origin', 'main']);
    if (!pushed.ok) return { ok: false, status: 502, pushFailed: true, commitHash, error: 'The local commit was created, but pushing to origin/main failed. Retry the push from the editor.', output: pushed.output, actionsUrl: await remoteActionsUrl() };
    return { ok: true, commitHash, actionsUrl: await remoteActionsUrl() };
  } catch (error) {
    await restore(snapshot);
    return { ok: false, status: 500, error: error.message, restored: true };
  }
}

async function pushCommit(commitHash) {
  const head = await run('git', ['rev-parse', 'HEAD']);
  if (!head.ok || (commitHash && head.output.trim() !== commitHash)) return { ok: false, status: 409, error: 'The requested commit is not the current local HEAD.' };
  const pushed = await run('git', ['push', 'origin', 'main']);
  if (!pushed.ok) return { ok: false, status: 502, error: 'Push failed again. Check Git credentials and the remote connection.', output: pushed.output };
  return { ok: true, commitHash: head.output.trim(), actionsUrl: await remoteActionsUrl() };
}

function contentType(file) {
  if (file.endsWith('.css')) return 'text/css; charset=utf-8';
  if (file.endsWith('.js')) return 'text/javascript; charset=utf-8';
  return 'text/html; charset=utf-8';
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://127.0.0.1:${port}`);
    if (url.pathname.startsWith('/api/')) {
      if (req.headers['x-bac9-token'] !== token) return fail(res, 401, 'Invalid local editor token.');
      if (req.method === 'GET' && url.pathname === '/api/articles') {
        const articles = await findArticles();
        const map = new Map();
        for (const article of articles) {
          const entry = map.get(article.translationId) || { translationId: article.translationId };
          entry[article.lang] = publicArticle(article);
          map.set(article.translationId, entry);
        }
        return json(res, 200, { ok: true, articles: [...map.values()] });
      }
      const articleMatch = url.pathname.match(/^\/api\/articles\/([^/]+)$/);
      if (req.method === 'GET' && articleMatch) {
        const document = await currentDocument(articleMatch[1]);
        return document ? json(res, 200, { ok: true, document }) : fail(res, 404, 'Article not found.');
      }
      if (req.method === 'GET' && url.pathname === '/api/drafts') {
        const entries = await (await import('node:fs/promises')).readdir(draftsRoot, { withFileTypes: true }).catch(() => []);
        const drafts = [];
        for (const entry of entries.filter((item) => item.isDirectory())) {
          const document = await readDraft(entry.name);
          if (document) drafts.push({ translationId: entry.name, updatedAt: document.updatedAt, title: document.en?.title || document.ar?.title || 'Untitled' });
        }
        return json(res, 200, { ok: true, drafts });
      }
      const draftMatch = url.pathname.match(/^\/api\/drafts\/([^/]+)$/);
      if (req.method === 'GET' && draftMatch) {
        const document = await readDraft(draftMatch[1]);
        return document ? json(res, 200, { ok: true, document }) : fail(res, 404, 'Draft not found.');
      }
      if (req.method === 'POST' && url.pathname === '/api/normalize') {
        const payload = await readRequest(req);
        const lang = payload.lang === 'ar' ? 'ar' : 'en';
        const parsed = articleFromSource(payload.source || '', { ...(payload.fallback || {}), lang });
        const normalized = normalizeMarkdown(parsed.body, lang);
        return json(res, 200, { ok: true, article: { ...parsed, body: normalized.body }, warnings: normalized.warnings });
      }
      if (req.method === 'POST' && url.pathname === '/api/drafts') {
        const payload = await readRequest(req);
        const document = payload.document || payload;
        const translationId = document.translationId || document.en?.translationId || document.ar?.translationId;
        if (!isSafeId(translationId)) return fail(res, 400, 'A lowercase kebab-case translation ID is required for drafts.');
        await safeWrite(draftFile(translationId), JSON.stringify({ ...document, translationId, updatedAt: new Date().toISOString() }, null, 2));
        return json(res, 200, { ok: true, translationId });
      }
      if (req.method === 'POST' && url.pathname === '/api/validate') {
        const payload = await readRequest(req);
        const existing = await findArticles();
        const validation = await validateDocument(payload.document || payload, { projectRoot, knownIds: new Set(existing.map((article) => article.id)), existingArticles: existing });
        return json(res, validation.errors.length ? 422 : 200, { ok: !validation.errors.length, validation });
      }
      if (req.method === 'POST' && url.pathname === '/api/publish') {
        const payload = await readRequest(req);
        const result = await publish(payload.document || payload, payload.expectedHashes || {});
        return json(res, result.ok ? 200 : result.status || 500, result);
      }
      if (req.method === 'POST' && url.pathname === '/api/push') {
        const payload = await readRequest(req);
        const result = await pushCommit(payload.commitHash);
        return json(res, result.ok ? 200 : result.status || 500, result);
      }
      return fail(res, 404, 'API route not found.');
    }
    const requested = url.pathname === '/' ? 'index.html' : url.pathname.replace(/^\//, '');
    const file = path.resolve(adminRoot, requested);
    if (!file.startsWith(`${adminRoot}${path.sep}`)) return fail(res, 404, 'Not found.');
    let body = await readFile(file);
    if (file.endsWith('index.html')) body = body.toString('utf8').replaceAll('__BAC9_EDITOR_TOKEN__', token);
    res.writeHead(200, { 'content-type': contentType(file), 'cache-control': 'no-store' });
    res.end(body);
  } catch (error) {
    fail(res, error instanceof SyntaxError ? 400 : 500, error.message || 'Editor server error.');
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`BAC9 editor running at http://127.0.0.1:${port}`);
  console.log('This server is local-only; it does not add an admin page to the public Astro site.');
});
