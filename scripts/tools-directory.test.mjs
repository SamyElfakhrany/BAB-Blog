import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { toolCategoryOrder, tools } from '../src/data/tools-directory.ts';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const requestedTools = [
  'futurepedia', 'poe', 'bubble', 'webflow', 'wix-studio', 'adalo', 'softr', 'flutterflow',
  'zapier', 'glide', 'notion-ai', 'chatgpt-images', 'resemble-ai', 'otter', 'visily', 'uizard'
];

test('catalog contains 30 unique, ordered tools in known categories', () => {
  assert.equal(tools.length, 30);
  assert.equal(new Set(tools.map((tool) => tool.id)).size, tools.length);
  assert.equal(new Set(tools.map((tool) => tool.order)).size, tools.length);
  assert.deepEqual(tools.map((tool) => tool.order), Array.from({ length: 30 }, (_, index) => index + 1));
  tools.forEach((tool) => assert.ok(toolCategoryOrder.includes(tool.category), `${tool.id} has an invalid category`));
  requestedTools.forEach((id) => assert.ok(tools.some((tool) => tool.id === id), `${id} is missing`));
});

test('every tool has complete localized copy and a secure official link', () => {
  tools.forEach((tool) => {
    assert.ok(tool.name.trim(), `${tool.id} needs a name`);
    assert.match(tool.url, /^https:\/\//, `${tool.id} needs an HTTPS URL`);
    assert.match(tool.logo.sourcePage, /^https:\/\//, `${tool.id} needs an HTTPS logo source`);
    for (const lang of /** @type {const} */ (['en', 'ar'])) {
      assert.ok(tool.description[lang].trim(), `${tool.id} needs a ${lang} description`);
      assert.ok(tool.tags[lang].length >= 2, `${tool.id} needs ${lang} use-case tags`);
      tool.tags[lang].forEach((tag) => assert.ok(tag.trim(), `${tool.id} has an empty ${lang} tag`));
    }
  });
});

test('every local logo asset exists', async () => {
  await Promise.all(tools.map((tool) => access(`${projectRoot}public${tool.logo.src}`)));
});
