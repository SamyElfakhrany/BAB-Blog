import type { CollectionEntry } from 'astro:content';

export type Tutorial = CollectionEntry<'tutorials'>;
export type Language = 'en' | 'ar';
export type Category = 'business' | 'technical' | 'ai';

export const categoryLabels: Record<Category, Record<Language, string>> = {
  business: { en: 'Business Concepts', ar: 'مفاهيم تحليل الأعمال' },
  technical: { en: 'Technical Concepts', ar: 'مفاهيم تقنية' },
  ai: { en: 'AI for BAs', ar: 'الذكاء الاصطناعي لمحللي الأعمال' }
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
    navLearn: 'Learn',
    navCaseStudy: 'Case study',
    navTemplates: 'Templates',
    navAbout: 'About',
    search: 'Search tutorials',
    searchPlaceholder: 'Search concepts, tools, and techniques…',
    featured: 'Start learning',
    allTutorials: 'All tutorials',
    read: 'Read tutorial',
    minRead: 'min read',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    exercise: 'Try it yourself',
    template: 'Reusable template',
    related: 'Keep exploring',
    language: 'العربية',
    homeIntro: 'A practical learning lab for business analysts who want to think clearly, collaborate with technical teams, and work responsibly with AI.',
    caseStudyIntro: 'Every tutorial uses one familiar online-shopping app so the ideas connect from one lesson to the next.',
    noResults: 'No tutorials match that search.',
    backToLearn: 'Back to learning'
  },
  ar: {
    siteName: 'BAC9',
    siteLabel: 'معسكر تحليل الأعمال',
    navLearn: 'تعلّم',
    navCaseStudy: 'دراسة الحالة',
    navTemplates: 'قوالب',
    navAbout: 'عن BAC9',
    search: 'ابحث في الدروس',
    searchPlaceholder: 'ابحث عن مفاهيم وأدوات وتقنيات…',
    featured: 'ابدأ التعلّم',
    allTutorials: 'كل الدروس',
    read: 'اقرأ الدرس',
    minRead: 'دقيقة قراءة',
    beginner: 'مبتدئ',
    intermediate: 'متوسط',
    advanced: 'متقدم',
    exercise: 'جرّب بنفسك',
    template: 'قالب قابل لإعادة الاستخدام',
    related: 'تابع الاستكشاف',
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
