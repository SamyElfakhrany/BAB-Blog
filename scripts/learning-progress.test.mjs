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

test('calculates segmented progress for every curriculum size', () => {
  for (const total of [2, 3, 6, 11]) {
    const ids = Array.from({ length: total }, (_, index) => `lesson-${index + 1}`);
    const completedIds = ids.filter((_, index) => index % 2 === 0);
    assert.deepEqual(completionFor({ version: 1, lastOpenedId: null, completedIds }, ids), {
      count: completedIds.length,
      total,
      percent: Math.round((completedIds.length / total) * 100)
    });
  }
});

test('tracks non-sequential completion and a complete journey', () => {
  const ids = Array.from({ length: 11 }, (_, index) => `lesson-${index + 1}`);
  assert.deepEqual(completionFor({ version: 1, lastOpenedId: 'lesson-8', completedIds: ['lesson-2', 'lesson-8'] }, ids), {
    count: 2,
    total: 11,
    percent: 18
  });
  assert.deepEqual(completionFor({ version: 1, lastOpenedId: 'lesson-11', completedIds: ids }, ids), {
    count: 11,
    total: 11,
    percent: 100
  });
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
