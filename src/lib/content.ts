import type { CollectionEntry } from 'astro:content';

export type Tutorial = CollectionEntry<'tutorials'>;
export type Language = 'en' | 'ar';
export type Category = 'business' | 'technical' | 'ai';

export const categoryLabels: Record<Category, Record<Language, string>> = {
  business: { en: 'Business Analysis Foundations', ar: 'أساسيات تحليل الأعمال' },
  technical: { en: 'Technical Fluency for BAs', ar: 'الفهم التقني لمحللي الأعمال' },
  ai: { en: 'AI for Business Analysts', ar: 'الذكاء الاصطناعي لمحللي الأعمال' }
};

export const categoryDescriptions: Record<Category, Record<Language, string>> = {
  business: {
    en: 'The thinking tools that help BAs understand people, decisions, and change.',
    ar: 'أدوات التفكير التي تساعد محللي الأعمال على فهم الناس والقرارات والتغيير.'
  },
  technical: {
    en: 'Technical literacy for collaborating with software teams and understanding delivery.',
    ar: 'المعرفة التقنية اللازمة للتعاون مع فرق البرمجيات وفهم عملية التسليم.'
  },
  ai: {
    en: 'Practical, responsible ways to use AI inside business analysis work.',
    ar: 'طرق عملية ومسؤولة لاستخدام الذكاء الاصطناعي داخل أعمال تحليل الأعمال.'
  }
};

export const ui = {
  en: {
    siteName: 'BAC9',
    siteLabel: 'Business Analysis Bootcamp',
    navLearn: 'Start Here',
    navPaths: 'Learning Paths',
    navCaseStudy: 'Case study',
    navTemplates: 'Templates',
    navSearch: 'Search',
    navAbout: 'About',
    mainNavigation: 'Main navigation',
    mobileNavigation: 'Mobile navigation',
    menu: 'Menu',
    closeMenu: 'Close menu',
    skipToContent: 'Skip to content',
    search: 'Search tutorials',
    searchPlaceholder: 'Search concepts, tools, and techniques…',
    featured: 'Start learning',
    allTutorials: 'All tutorials',
    read: 'Read tutorial',
    minRead: 'min read',
    minutes: 'minutes',
    lessons: 'lessons',
    lesson: 'Lesson',
    of: 'of',
    stage: 'Stage',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    exercise: 'Try it yourself',
    template: 'Reusable template',
    related: 'Keep exploring',
    optionalResources: 'Optional resources',
    learningOutcomes: 'By the end of this lesson, you will be able to…',
    prerequisites: 'Recommended first',
    noPrerequisites: 'No technical background required. You can start here.',
    practicalSkill: 'Practical BA skill',
    markComplete: 'Mark as complete',
    markIncomplete: 'Mark as incomplete',
    completed: 'Completed',
    currentLesson: 'Current lesson',
    nextLessonState: 'Up next',
    previousLesson: 'Previous lesson',
    nextLesson: 'Next recommended lesson',
    backToPath: 'Back to the full learning path',
    startPath: 'Start path',
    continuePath: 'Continue path',
    pathProgress: 'Path progress',
    journeyProgress: 'Journey progress',
    progressUnavailable: 'Progress saving is unavailable in this browser. You can still use every lesson.',
    journeyComplete: 'You completed the BAC9 learning journey.',
    language: 'العربية',
    homeIntro: 'A practical learning lab for business analysts who want to think clearly, collaborate with technical teams, and work responsibly with AI.',
    caseStudyIntro: 'Every tutorial uses one familiar online-shopping app so the ideas connect from one lesson to the next.',
    noResults: 'No tutorials match that search.',
    backToLearn: 'Back to learning'
  },
  ar: {
    siteName: 'BAC9',
    siteLabel: 'معسكر تحليل الأعمال',
    navLearn: 'ابدأ هنا',
    navPaths: 'مسارات التعلّم',
    navCaseStudy: 'دراسة الحالة',
    navTemplates: 'قوالب',
    navSearch: 'بحث',
    navAbout: 'عن BAC9',
    mainNavigation: 'التنقل الرئيسي',
    mobileNavigation: 'قائمة التنقل للموبايل',
    menu: 'القائمة',
    closeMenu: 'إغلاق القائمة',
    skipToContent: 'انتقل إلى المحتوى',
    search: 'ابحث في الدروس',
    searchPlaceholder: 'ابحث عن مفاهيم وأدوات وتقنيات…',
    featured: 'ابدأ التعلّم',
    allTutorials: 'كل الدروس',
    read: 'اقرأ الدرس',
    minRead: 'دقيقة قراءة',
    minutes: 'دقيقة',
    lessons: 'دروس',
    lesson: 'الدرس',
    of: 'من',
    stage: 'المرحلة',
    beginner: 'مبتدئ',
    intermediate: 'متوسط',
    advanced: 'متقدم',
    exercise: 'جرّب بنفسك',
    template: 'قالب قابل لإعادة الاستخدام',
    related: 'تابع الاستكشاف',
    optionalResources: 'مصادر اختيارية',
    learningOutcomes: 'بعد الدرس ده هتقدر…',
    prerequisites: 'يُفضّل تبدأ بـ',
    noPrerequisites: 'مش محتاج خلفية تقنية. تقدر تبدأ من هنا.',
    practicalSkill: 'مهارة عملية للـBA',
    markComplete: 'علّم الدرس كمكتمل',
    markIncomplete: 'ألغِ علامة الاكتمال',
    completed: 'مكتمل',
    currentLesson: 'درسك الحالي',
    nextLessonState: 'التالي',
    previousLesson: 'الدرس السابق',
    nextLesson: 'الدرس المقترح التالي',
    backToPath: 'العودة إلى مسار التعلّم كاملًا',
    startPath: 'ابدأ المسار',
    continuePath: 'كمّل المسار',
    pathProgress: 'تقدم المسار',
    journeyProgress: 'تقدم رحلة التعلّم',
    progressUnavailable: 'حفظ التقدم غير متاح في المتصفح ده، لكن كل الدروس ما زالت متاحة.',
    journeyComplete: 'أكملت رحلة تعلّم BAC9.',
    language: 'English',
    homeIntro: 'مساحة تعلّم عملية لمحللي الأعمال الذين يريدون التفكير بوضوح والتعاون مع الفرق التقنية واستخدام الذكاء الاصطناعي بمسؤولية.',
    caseStudyIntro: 'تستخدم كل الدروس تطبيق تسوق أونلاين مألوفًا حتى تتصل الأفكار من درس إلى آخر.',
    noResults: 'لا توجد دروس تطابق هذا البحث.',
    backToLearn: 'العودة إلى التعلّم'
  }
} as const;

export function getLanguage(lang: string): Language {
  return lang === 'ar' ? 'ar' : 'en';
}

export function getDirection(lang: Language) {
  return lang === 'ar' ? 'rtl' : 'ltr';
}

export function getCategoryFromId(id: string): Category | undefined {
  const [, category] = id.split('/');
  return category as Category | undefined;
}

export function getSlug(entry: Tutorial) {
  return entry.id.split('/').at(-1) || entry.data.id;
}

export function getLangFromEntry(entry: Tutorial): Language {
  return entry.data.lang;
}

export function getEntryUrl(entry: Tutorial) {
  return `/${entry.data.lang}/${entry.data.category}/${getSlug(entry)}/`;
}

export function localizePath(pathname: string, lang: Language) {
  return pathname.replace(/^\/(en|ar)(?=\/|$)/, `/${lang}`);
}

export function withBase(pathname: string) {
  const base = import.meta.env.BASE_URL || '/';
  const clean = pathname.startsWith('/') ? pathname.slice(1) : pathname;
  if (base === '/') return `/${clean}`;
  return `${base.replace(/\/$/, '')}/${clean}`;
}

export function formatDate(date: Date, lang: Language) {
  return new Intl.DateTimeFormat(lang === 'ar' ? 'ar-EG' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}
