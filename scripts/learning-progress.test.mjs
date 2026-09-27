import test from 'node:test';
import assert from 'node:assert/strict';
import {
  completionFor,
  emptyProgress,
  getContinueLessonId,
  parseProgress,
  sanitizeProgress,
  toggleCompletion
} from '../src/lib/learning-progress.mjs';

const journey = ['role', 'stakeholders', 'priorities', 'architecture'];

test('recovers from malformed and unsupported progress', () => {
  assert.deepEqual(parseProgress('{bad json', journey), emptyProgress());
  assert.deepEqual(sanitizeProgress({ version: 2, completedIds: ['role'] }, journey), emptyProgress());
});

test('filters stale IDs, duplicates, and invalid last-opened values', () => {
  assert.deepEqual(sanitizeProgress({ version: 1, lastOpenedId: 'old', completedIds: ['role', 'old', 'role'] }, journey), {
    version: 1,
    lastOpenedId: null,
    completedIds: ['role']
  });
});

test('toggles completion and calculates path completion', () => {
  let progress = emptyProgress();
  progress = toggleCompletion(progress, 'role', true);
  progress = toggleCompletion(progress, 'stakeholders', true);
  assert.deepEqual(completionFor(progress, journey), { count: 2, total: 4, percent: 50 });
  progress = toggleCompletion(progress, 'role', false);
  assert.deepEqual(progress.completedIds, ['stakeholders']);
});

test('continues an open incomplete lesson and advances across path boundaries', () => {
  assert.equal(getContinueLessonId({ version: 1, lastOpenedId: 'priorities', completedIds: ['role', 'stakeholders'] }, journey), 'priorities');
  assert.equal(getContinueLessonId({ version: 1, lastOpenedId: 'priorities', completedIds: ['role', 'stakeholders', 'priorities'] }, journey), 'architecture');
});

test('wraps to an earlier skipped lesson and returns null when complete', () => {
  assert.equal(getContinueLessonId({ version: 1, lastOpenedId: 'architecture', completedIds: ['role', 'architecture'] }, journey), 'stakeholders');
  assert.equal(getContinueLessonId({ version: 1, lastOpenedId: 'architecture', completedIds: journey }, journey), null);
});

test('uses conceptual IDs independent of language URLs', () => {
  const progress = sanitizeProgress({ version: 1, lastOpenedId: 'role', completedIds: ['role'] }, journey);
  assert.equal(progress.lastOpenedId, 'role');
  assert.deepEqual(progress.completedIds, ['role']);
});
