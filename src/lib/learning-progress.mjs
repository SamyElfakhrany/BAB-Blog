// @ts-nocheck
export const STORAGE_KEY = 'bab.learningProgress.v1';
export const LEGACY_STORAGE_KEY = 'bac9.learningProgress.v1';

export function emptyProgress() {
  return { version: 1, lastOpenedId: null, completedIds: [] };
}

export function sanitizeProgress(value, validIds) {
  const valid = new Set(validIds || []);
  if (!value || typeof value !== 'object' || value.version !== 1) return emptyProgress();
  const completed = Array.isArray(value.completedIds)
    ? [...new Set(value.completedIds.filter((id) => typeof id === 'string' && valid.has(id)))]
    : [];
  const lastOpenedId = typeof value.lastOpenedId === 'string' && valid.has(value.lastOpenedId)
    ? value.lastOpenedId
    : null;
  return { version: 1, lastOpenedId, completedIds: completed };
}

export function parseProgress(raw, validIds) {
  if (!raw) return emptyProgress();
  try {
    return sanitizeProgress(JSON.parse(raw), validIds);
  } catch {
    return emptyProgress();
  }
}

export function loadProgress(storage, validIds) {
  const current = storage.getItem(STORAGE_KEY);
  if (current) return { progress: parseProgress(current, validIds), migrated: false };
  const legacy = storage.getItem(LEGACY_STORAGE_KEY);
  const progress = parseProgress(legacy, validIds);
  if (legacy) storage.setItem(STORAGE_KEY, JSON.stringify(progress));
  return { progress, migrated: Boolean(legacy) };
}

export function toggleCompletion(progress, id, completed) {
  const ids = new Set(progress.completedIds || []);
  if (completed) ids.add(id);
  else ids.delete(id);
  return { ...progress, completedIds: [...ids] };
}

export function completionFor(progress, ids) {
  const completed = new Set(progress.completedIds || []);
  const count = ids.filter((id) => completed.has(id)).length;
  return { count, total: ids.length, percent: ids.length ? Math.round((count / ids.length) * 100) : 0 };
}

export function getContinueLessonId(progress, journeyIds) {
  if (!journeyIds.length) return null;
  const completed = new Set(progress.completedIds || []);
  const lastIndex = progress.lastOpenedId ? journeyIds.indexOf(progress.lastOpenedId) : -1;
  if (lastIndex >= 0 && !completed.has(journeyIds[lastIndex])) return journeyIds[lastIndex];
  if (lastIndex >= 0) {
    const next = journeyIds.slice(lastIndex + 1).find((id) => !completed.has(id));
    if (next) return next;
  }
  return journeyIds.find((id) => !completed.has(id)) || null;
}
