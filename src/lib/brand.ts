export type BrandLanguage = 'en' | 'ar';

export const brand = {
  id: 'bab',
  displayName: 'BAB | باب',
  localizedName: {
    en: 'BAB',
    ar: 'باب'
  },
  expansion: {
    en: 'Business Analyst Brain',
    ar: 'عقل محلل الأعمال'
  },
  tagline: {
    en: 'Think like a Business Analyst.',
    ar: 'فكّر كمحلل أعمال.'
  },
  supportingLine: {
    en: 'Your door to practical Business Analysis.',
    ar: 'بابك لتعلّم تحليل الأعمال بشكل عملي.'
  },
  description: {
    en: 'A practical bilingual learning lab that helps new and aspiring Business Analysts think clearly, collaborate with technical teams, and work responsibly with AI.',
    ar: 'مساحة تعلّم عملية وثنائية اللغة تساعد محللي الأعمال الجدد والطموحين على التفكير بوضوح والتعاون مع الفرق التقنية واستخدام الذكاء الاصطناعي بمسؤولية.'
  },
  author: {
    name: 'Samy Elfakhrany',
    url: 'https://www.linkedin.com/in/samy-elfakhrany/'
  },
  copyright: {
    en: 'All rights reserved.',
    ar: 'جميع الحقوق محفوظة.'
  },
  assets: {
    mark: '/brand/bab-mark.svg',
    markInverse: '/brand/bab-mark-inverse.svg',
    horizontalLockup: '/brand/bab-lockup-horizontal.svg',
    stackedLockup: '/brand/bab-lockup-stacked.svg',
    englishWordmark: '/brand/bab-wordmark-en.svg',
    arabicWordmark: '/brand/bab-wordmark-ar.svg',
    monochromeLockup: '/brand/bab-lockup-monochrome.svg',
    socialCard: '/brand/bab-social-card.png'
  },
  colors: {
    navy: '#102A43',
    yellow: '#F7C948',
    mint: '#7DD3A8',
    paper: '#F7F9FB',
    white: '#FFFFFF'
  }
} as const;

