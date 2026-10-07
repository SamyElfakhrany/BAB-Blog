// @ts-nocheck
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm, stat, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {
  DRAFTS_DIRECTORY,
  LEGACY_DRAFTS_DIRECTORY,
  draftFilePath,
  listCompatibleDraftIds,
  readCompatibleDraft
} from './lib/draft-storage.mjs';

test('discovers legacy drafts without moving or deleting them', async (context) => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'bab-drafts-'));
  context.after(() => rm(root, { recursive: true, force: true }));
  const legacyFile = path.join(root, LEGACY_DRAFTS_DIRECTORY, 'legacy-lesson', 'document.json');
  await mkdir(path.dirname(legacyFile), { recursive: true });
  await writeFile(legacyFile, JSON.stringify({ translationId: 'legacy-lesson', title: 'Legacy' }));

  assert.deepEqual(await listCompatibleDraftIds(root), ['legacy-lesson']);
  assert.equal((await readCompatibleDraft(root, 'legacy-lesson')).title, 'Legacy');
  assert.equal((await stat(legacyFile)).isFile(), true);
});

test('prefers a BAB draft when the same legacy draft also exists', async (context) => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'bab-drafts-'));
  context.after(() => rm(root, { recursive: true, force: true }));
  const legacyFile = path.join(root, LEGACY_DRAFTS_DIRECTORY, 'shared', 'document.json');
  const currentFile = draftFilePath(root, 'shared');
  await mkdir(path.dirname(legacyFile), { recursive: true });
  await mkdir(path.dirname(currentFile), { recursive: true });
  await writeFile(legacyFile, JSON.stringify({ title: 'Legacy' }));
  await writeFile(currentFile, JSON.stringify({ title: 'BAB' }));

  assert.equal((await readCompatibleDraft(root, 'shared')).title, 'BAB');
  assert.deepEqual(await listCompatibleDraftIds(root), ['shared']);
  assert.equal(currentFile.includes(DRAFTS_DIRECTORY), true);
});

