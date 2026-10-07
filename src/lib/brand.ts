export type BrandLanguage = 'en' | 'ar';

export const brand = {
  id: 'bab',
  displayName: 'BAB',
  localizedName: {
    en: 'BAB',
    ar: 'BAB'
  },
  expansion: {
    en: 'Business Analyst Brain',
    ar: 'عقل محلل الأعمال'
  },
  tagline: {
    en: 'Gate for Every Business Brain',
    ar: 'Gate for Every Business Brain'
  },
  taglineTranslation: {
    ar: 'بوابة لكل عقل في عالم الأعمال'
  },
  supportingLine: {
    en: 'An open doorway to Business Analysis knowledge, tools, people, and learning resources.',
    ar: 'باب مفتوح لمعرفة تحليل الأعمال وأدواته وأشخاصه ومصادر تعلّمه.'
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
    compactColor: '/assets/bab/logos/bab-compact-color.svg',
    compactReverse: '/assets/bab/logos/bab-compact-reverse.svg',
    fullColor: '/assets/bab/logos/bab-full-color.svg',
    fullReverse: '/assets/bab/logos/bab-full-reverse.svg',
    symbolColor: '/assets/bab/logos/bab-symbol-color.svg',
    symbolReverse: '/assets/bab/logos/bab-symbol-reverse.svg',
    heroDark: '/assets/bab/graphics/door-hero-dark.svg',
    heroLight: '/assets/bab/graphics/door-hero-light.svg',
    pattern: '/assets/bab/graphics/door-pattern.svg',
    socialCard: '/assets/bab/graphics/door-hero-light.svg',
    favicon: '/assets/bab/icons/favicon.svg',
    faviconIco: '/assets/bab/icons/favicon.ico',
    favicon32: '/assets/bab/icons/favicon-32.png',
    appleTouchIcon: '/assets/bab/icons/apple-touch-icon.png'
  },
  colors: {
    navy: '#102A43',
    yellow: '#F7C948',
    mint: '#7DD3A8',
    paper: '#F7F9FB',
    white: '#FFFFFF'
  }
} as const;

