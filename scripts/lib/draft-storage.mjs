// @ts-nocheck
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

export const DRAFTS_DIRECTORY = '.bab-drafts';
export const LEGACY_DRAFTS_DIRECTORY = '.bac9-drafts';

export function draftFilePath(projectRoot, translationId) {
  return path.join(projectRoot, DRAFTS_DIRECTORY, translationId, 'document.json');
}

export function legacyDraftFilePath(projectRoot, translationId) {
  return path.join(projectRoot, LEGACY_DRAFTS_DIRECTORY, translationId, 'document.json');
}

export async function readCompatibleDraft(projectRoot, translationId) {
  for (const file of [draftFilePath(projectRoot, translationId), legacyDraftFilePath(projectRoot, translationId)]) {
    try {
      return JSON.parse(await readFile(file, 'utf8'));
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  }
  return null;
}

export async function listCompatibleDraftIds(projectRoot) {
  const ids = new Set();
  for (const directory of [DRAFTS_DIRECTORY, LEGACY_DRAFTS_DIRECTORY]) {
    const entries = await readdir(path.join(projectRoot, directory), { withFileTypes: true }).catch((error) => {
      if (error.code === 'ENOENT') return [];
      throw error;
    });
    for (const entry of entries) if (entry.isDirectory()) ids.add(entry.name);
  }
  return [...ids].sort();
}

