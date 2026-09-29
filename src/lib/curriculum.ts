import type { Category, Language, Tutorial } from './content';

export const pathOrder: Category[] = ['business', 'technical', 'product-design', 'ai'];

export interface LocalizedPathDefinition {
  title: string;
  shortTitle: string;
  purpose: string;
  audience: string;
  outcome: string;
  prerequisite: string;
  action: string;
}

export interface PathDefinition {
  id: Category;
  stage: number;
  accent: 'orange' | 'blue' | 'violet' | 'mint';
  prerequisitePaths: Category[];
  copy: Record<Language, LocalizedPathDefinition>;
}

export const pathDefinitions: Record<Category, PathDefinition> = {
  business: {
    id: 'business',
    stage: 1,
    accent: 'orange',
    prerequisitePaths: [],
    copy: {
      en: {
        title: 'Business Analysis Foundations',
        shortTitle: 'Foundations',
        purpose: 'Understand the BA role, requirements, delivery choices, flow, product decisions, and how teams learn from evidence.',
        audience: 'New and aspiring Business Analysts who want a practical starting point.',
        outcome: 'Frame a change, model requirements, choose a delivery approach, prepare testable backlog work, and measure product learning.',
        prerequisite: 'No prior Business Analysis experience is required.',
        action: 'Start with the foundations'
      },
      ar: {
        title: 'أساسيات تحليل الأعمال',
        shortTitle: 'الأساسيات',
        purpose: 'افهم دور محلل الأعمال والمتطلبات وأساليب التسليم والتدفق وقرارات المنتج وإزاي الفريق يتعلّم من الدليل.',
        audience: 'للمبتدئين والمهتمين ببدء مسار مهني في تحليل الأعمال.',
        outcome: 'صِغ التغيير، ومثّل المتطلبات، واختار أسلوب التسليم، وجهز Backlog قابلًا للاختبار، وقِس تعلّم المنتج.',
        prerequisite: 'مش محتاج خبرة سابقة في تحليل الأعمال.',
        action: 'ابدأ بالأساسيات'
      }
    }
  },
  technical: {
    id: 'technical',
    stage: 2,
    accent: 'blue',
    prerequisitePaths: ['business'],
    copy: {
      en: {
        title: 'Technical Fluency for Business Analysts',
        shortTitle: 'Technical Fluency',
        purpose: 'Learn how solutions are structured, store data, connect, run, change, reach production, and are accepted safely.',
        audience: 'BAs who collaborate with software, data, architecture, or delivery teams.',
        outcome: 'Ask sharper technical questions and connect business requirements to solution, testing, and delivery decisions.',
        prerequisite: 'Business Analysis Foundations is recommended, but every lesson remains open.',
        action: 'Build technical fluency'
      },
      ar: {
        title: 'الفهم التقني لمحللي الأعمال',
        shortTitle: 'الفهم التقني',
        purpose: 'اتعلّم إزاي الحلول بتتكوّن، وتخزن البيانات، وتتصل، وتتغير، وتوصل للإنتاج، ويتم قبولها بأمان.',
        audience: 'لمحللي الأعمال اللي بيتعاونوا مع فرق البرمجيات والبيانات والمعمارية والتسليم.',
        outcome: 'اسأل أسئلة تقنية أدق واربط متطلبات العمل بقرارات الحل والاختبار والتسليم.',
        prerequisite: 'يُفضّل إنهاء مسار الأساسيات، لكن كل الدروس متاحة من غير قفل.',
        action: 'طوّر فهمك التقني'
      }
    }
  },
  'product-design': {
    id: 'product-design',
    stage: 3,
    accent: 'violet',
    prerequisitePaths: ['business', 'technical'],
    copy: {
      en: {
        title: 'Product Design Fundamentals',
        shortTitle: 'Product Design',
        purpose: 'Learn to turn user evidence into clear journeys, review interfaces constructively, specify every state, and validate design outcomes.',
        audience: 'Business Analysts and Product Owners who collaborate with UX, product-design, and engineering teams.',
        outcome: 'Plan lightweight UX research, critique designs with evidence, review prototypes and handoffs, and connect usability to product measures.',
        prerequisite: 'Business Analysis Foundations and Technical Fluency are recommended, but every lesson remains open.',
        action: 'Build product-design fluency'
      },
      ar: {
        title: 'أساسيات تصميم المنتجات',
        shortTitle: 'تصميم المنتجات',
        purpose: 'اتعلّم تحوّل دليل المستخدم لرحلات واضحة، وتراجع الواجهات بشكل بنّاء، وتحدد كل الحالات، وتتحقق من نتائج التصميم.',
        audience: 'لمحللي الأعمال والـProduct Owners اللي بيتعاونوا مع فرق UX وتصميم المنتجات والهندسة.',
        outcome: 'خطط UX Research بسيط، وراجع التصميم بالدليل، وافهم الـPrototypes والـHandoff، واربط سهولة الاستخدام بمقاييس المنتج.',
        prerequisite: 'يُفضّل إنهاء مساري أساسيات تحليل الأعمال والفهم التقني، لكن كل الدروس متاحة.',
        action: 'طوّر فهمك لتصميم المنتجات'
      }
    }
  },
  ai: {
    id: 'ai',
    stage: 4,
    accent: 'mint',
    prerequisitePaths: ['business', 'technical', 'product-design'],
    copy: {
      en: {
        title: 'AI for Business Analysts',
        shortTitle: 'AI-enabled BA Work',
        purpose: 'Use language models and AI agents responsibly inside practical Business Analysis workflows.',
        audience: 'BAs ready to use AI while keeping evidence, review, and human approval visible.',
        outcome: 'Design useful AI-assisted workflows with clear boundaries, checks, and measures.',
        prerequisite: 'Foundations, Technical Fluency, and Product Design Fundamentals are recommended before this stage.',
        action: 'Learn AI-enabled BA work'
      },
      ar: {
        title: 'الذكاء الاصطناعي لمحللي الأعمال',
        shortTitle: 'تحليل أعمال مدعوم بالـAI',
        purpose: 'استخدم النماذج اللغوية ووكلاء الذكاء الاصطناعي بمسؤولية داخل شغل تحليل الأعمال.',
        audience: 'لمحللي الأعمال المستعدين لاستخدام الـAI مع الحفاظ على الأدلة والمراجعة والموافقة البشرية.',
        outcome: 'صمّم تدفقات عمل مفيدة ومدعومة بالـAI بحدود وضوابط ومقاييس واضحة.',
        prerequisite: 'يُفضّل إنهاء مسارات الأساسيات والفهم التقني وتصميم المنتجات قبل المرحلة دي.',
        action: 'اتعلّم تحليل الأعمال المدعوم بالـAI'
      }
    }
  }
};

export function pathIndex(category: Category) {
  return pathOrder.indexOf(category);
}

export function sortTutorials(entries: Tutorial[]) {
  return [...entries].sort((a, b) => {
    const byPath = pathIndex(a.data.category) - pathIndex(b.data.category);
    return byPath || a.data.order - b.data.order || a.data.title.localeCompare(b.data.title);
  });
}

export function getPathEntries(entries: Tutorial[], category: Category, lang?: Language) {
  return sortTutorials(entries.filter((entry) => entry.data.category === category && (!lang || entry.data.lang === lang)));
}

export function getJourneyEntries(entries: Tutorial[], lang: Language) {
  return sortTutorials(entries.filter((entry) => entry.data.lang === lang && !entry.data.draft));
}

export function getPathStats(entries: Tutorial[]) {
  return {
    lessonCount: entries.length,
    totalMinutes: entries.reduce((total, entry) => total + entry.data.readTime, 0)
  };
}

export function getLessonPosition(entry: Tutorial, entries: Tutorial[]) {
  const pathEntries = getPathEntries(entries, entry.data.category, entry.data.lang);
  const index = pathEntries.findIndex((candidate) => candidate.data.translationId === entry.data.translationId);
  return { index, step: index + 1, total: pathEntries.length };
}

export function getAdjacentLessons(entry: Tutorial, entries: Tutorial[]) {
  const journey = getJourneyEntries(entries, entry.data.lang);
  const index = journey.findIndex((candidate) => candidate.data.translationId === entry.data.translationId);
  return {
    previous: index > 0 ? journey[index - 1] : undefined,
    next: index >= 0 && index < journey.length - 1 ? journey[index + 1] : undefined
  };
}

export function getTutorialByTranslationId(entries: Tutorial[], id: string, lang: Language) {
  return entries.find((entry) => entry.data.translationId === id && entry.data.lang === lang && !entry.data.draft);
}
