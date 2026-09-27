import { STORAGE_KEY, completionFor, getContinueLessonId, parseProgress, toggleCompletion } from '../lib/learning-progress.mjs';

interface LessonData { id: string; title: string; url: string; path: string; pathTitle: string; step: number; total: number; prerequisites: string[]; }
interface PageData {
  currentLessonId: string | null;
  roadmapUrl: string;
  lessons: LessonData[];
  paths: Array<{ id: string; lessonIds: string[] }>;
  strings: Record<string, string>;
}

const dataNode = document.querySelector<HTMLScriptElement>('#bac9-learning-data');
if (dataNode?.textContent) {
  const data = JSON.parse(dataNode.textContent) as PageData;
  const validIds = data.lessons.map((lesson) => lesson.id);
  const lessonById = new Map(data.lessons.map((lesson) => [lesson.id, lesson]));
  let storageAvailable = true;
  try {
    const probe = `${STORAGE_KEY}.probe`;
    localStorage.setItem(probe, '1');
    localStorage.removeItem(probe);
  } catch {
    storageAvailable = false;
  }
  let progress = storageAvailable ? parseProgress(localStorage.getItem(STORAGE_KEY), validIds) : parseProgress(null, validIds);

  const save = () => {
    if (!storageAvailable) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); }
    catch { storageAvailable = false; }
  };

  const formatProgressCount = (template: string, count: number, total: number) => template
    .replace('{count}', String(count))
    .replace('{total}', String(total));

  const renderProgressSegments = (container: HTMLElement, ids: string[], completed: Set<string>) => {
    const renderedIds = [...container.querySelectorAll<HTMLElement>('[data-progress-segment]')]
      .map((segment) => segment.dataset.progressSegment || '');
    if (renderedIds.length !== ids.length || renderedIds.some((id, index) => id !== ids[index])) {
      container.replaceChildren(...ids.map((id) => {
        const segment = document.createElement('span');
        segment.className = 'progress-segment';
        segment.dataset.progressSegment = id;
        const check = document.createElement('span');
        check.textContent = '✓';
        segment.append(check);
        return segment;
      }));
    }
    container.style.setProperty('--progress-segment-count', String(Math.max(ids.length, 1)));
    container.querySelectorAll<HTMLElement>('[data-progress-segment]').forEach((segment) => {
      segment.classList.toggle('is-complete', completed.has(segment.dataset.progressSegment || ''));
    });
  };

  if (data.currentLessonId && validIds.includes(data.currentLessonId)) {
    progress = { ...progress, lastOpenedId: data.currentLessonId };
    save();
  }

  const updateProgressBlock = (block: HTMLElement) => {
    const scope = block.dataset.progressScope;
    const ids = scope === 'journey' ? validIds : data.paths.find((path) => path.id === scope)?.lessonIds || [];
    block.classList.remove('progress-block--journey', ...data.paths.map((path) => `progress-block--${path.id}`));
    block.classList.add(`progress-block--${scope || 'journey'}`);
    const value = completionFor(progress, ids);
    const completed = new Set(progress.completedIds);
    const bar = block.querySelector<HTMLProgressElement>('[data-progress-bar]');
    const text = block.querySelector<HTMLElement>('[data-progress-text]');
    const count = block.querySelector<HTMLElement>('[data-progress-count]');
    const segments = block.querySelector<HTMLElement>('[data-progress-segments]');
    const template = value.total > 0 && value.count === value.total
      ? block.dataset.progressCompleteTemplate || 'All {total} lessons complete'
      : block.dataset.progressCountTemplate || '{count} of {total} lessons complete';
    const countText = formatProgressCount(template, value.count, value.total);
    if (bar) { bar.value = value.percent; bar.textContent = `${value.percent}%`; bar.setAttribute('aria-valuetext', countText); }
    if (text) text.textContent = `${value.percent}%`;
    if (count) count.textContent = countText;
    if (segments) renderProgressSegments(segments, ids, completed);
    block.classList.toggle('is-complete', value.total > 0 && value.count === value.total);
  };

  const render = () => {
    const continueId = getContinueLessonId(progress, validIds);
    const completed = new Set(progress.completedIds);

    document.querySelectorAll<HTMLElement>('[data-progress-scope]').forEach(updateProgressBlock);

    document.querySelectorAll<HTMLElement>('[data-lesson-id]').forEach((row) => {
      const id = row.dataset.lessonId || '';
      const isComplete = completed.has(id);
      const isCurrent = !isComplete && id === continueId;
      row.classList.toggle('is-complete', isComplete);
      row.classList.toggle('is-current', isCurrent);
      const state = row.querySelector<HTMLElement>('[data-lesson-state]');
      if (state) {
        state.hidden = !(isComplete || isCurrent);
        state.textContent = isComplete ? data.strings.completed : data.strings.next;
      }
      const prerequisites = (row.dataset.prerequisites || '').split(',').filter(Boolean);
      const prerequisiteLabel = row.querySelector<HTMLElement>('[data-prerequisite-status]');
      if (prerequisiteLabel) prerequisiteLabel.classList.toggle('is-met', prerequisites.every((id) => completed.has(id)));
    });

    document.querySelectorAll<HTMLAnchorElement>('[data-path-action]').forEach((link) => {
      const path = data.paths.find((candidate) => candidate.id === link.dataset.path);
      const nextId = path?.lessonIds.find((id) => !completed.has(id)) || path?.lessonIds[0];
      const lesson = nextId ? lessonById.get(nextId) : undefined;
      if (lesson) link.href = lesson.url;
      link.textContent = path?.lessonIds.some((id) => completed.has(id)) ? data.strings.continuePath : data.strings.startPath;
    });

    const panel = document.querySelector<HTMLElement>('[data-continue-panel]');
    if (panel && (progress.lastOpenedId || progress.completedIds.length)) {
      const heading = panel.querySelector<HTMLElement>('[data-continue-heading]');
      const eyebrow = panel.querySelector<HTMLElement>('[data-continue-eyebrow]');
      const meta = panel.querySelector<HTMLElement>('[data-continue-meta]');
      const link = panel.querySelector<HTMLAnchorElement>('[data-continue-link]');
      const progressBlock = panel.querySelector<HTMLElement>('[data-progress-scope]');
      const lesson = continueId ? lessonById.get(continueId) : undefined;
      if (lesson) {
        if (heading) heading.textContent = data.strings.continueJourney;
        if (eyebrow) eyebrow.textContent = data.strings.continueLearning;
        if (meta) meta.textContent = `${lesson.pathTitle} · ${data.strings.lesson} ${lesson.step} ${data.strings.of} ${lesson.total}: ${lesson.title}`;
        if (link) { link.href = lesson.url; link.textContent = data.strings.continueLearning; }
        if (progressBlock) { progressBlock.dataset.progressScope = lesson.path; updateProgressBlock(progressBlock); }
      } else {
        if (heading) heading.textContent = data.strings.journeyComplete;
        if (eyebrow) eyebrow.textContent = data.strings.completed;
        if (meta) meta.textContent = '';
        if (link) { link.href = data.roadmapUrl; link.textContent = data.strings.reviewRoadmap; }
        if (progressBlock) { progressBlock.dataset.progressScope = 'journey'; updateProgressBlock(progressBlock); }
      }
    }

    document.querySelectorAll<HTMLButtonElement>('[data-completion-toggle]').forEach((button) => {
      const id = button.dataset.completionToggle || '';
      const isComplete = completed.has(id);
      button.hidden = false;
      button.disabled = !storageAvailable;
      button.setAttribute('aria-pressed', String(isComplete));
      button.textContent = isComplete ? data.strings.markIncomplete : data.strings.markComplete;
    });

    document.querySelectorAll<HTMLElement>('[data-progress-unavailable]').forEach((message) => {
      message.hidden = storageAvailable;
      message.textContent = data.strings.progressUnavailable;
    });
  };

  document.querySelectorAll<HTMLButtonElement>('[data-completion-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!storageAvailable) return;
      const id = button.dataset.completionToggle || '';
      progress = toggleCompletion(progress, id, !progress.completedIds.includes(id));
      progress = { ...progress, lastOpenedId: id };
      save();
      render();
    });
  });

  render();
}
