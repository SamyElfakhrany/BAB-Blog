export type FollowResourceKind = 'person' | 'podcast' | 'community';
export type FollowTopic = 'business-analysis' | 'product-management' | 'software-engineering' | 'design' | 'ai';
export type FollowContentLanguage = 'ar' | 'en';
export type FollowPlatform = 'linkedin' | 'youtube' | 'website' | 'podcast';

type LocalizedText = Record<'en' | 'ar', string>;
type LocalizedList = Record<'en' | 'ar', string[]>;

export interface FollowResourceLink {
  platform: FollowPlatform;
  url: string;
}

export interface FollowResourceImage {
  src: string;
  presentation: 'portrait' | 'brand';
  sourcePage: string;
  objectPosition?: string;
}

export interface FollowResource {
  id: string;
  order: number;
  kind: FollowResourceKind;
  topics: FollowTopic[];
  contentLanguages: FollowContentLanguage[];
  mark: string;
  name: string;
  image: FollowResourceImage;
  description: LocalizedText;
  tags: LocalizedList;
  links: FollowResourceLink[];
}

export const followTopicOrder: FollowTopic[] = [
  'business-analysis',
  'product-management',
  'software-engineering',
  'design',
  'ai'
];

export const followTopicLabels: Record<FollowTopic, LocalizedText> = {
  'business-analysis': { en: 'Business Analysis', ar: 'تحليل الأعمال' },
  'product-management': { en: 'Product Management', ar: 'إدارة المنتجات' },
  'software-engineering': { en: 'Software Engineering', ar: 'هندسة البرمجيات' },
  design: { en: 'UI/UX & Product Design', ar: 'UI/UX وتصميم المنتجات' },
  ai: { en: 'Artificial Intelligence', ar: 'الذكاء الاصطناعي' }
};

export const followResources: FollowResource[] = [
  {
    id: 'ibrahim-mashaal', order: 1, kind: 'person', topics: ['business-analysis'], contentLanguages: ['ar'], mark: 'IM',
    name: 'Ibrahim Mashaal, PMP',
    image: { src: '/images/follow/ibrahim-mashaal.webp', presentation: 'portrait', sourcePage: 'https://www.linkedin.com/in/imashaal/' },
    description: {
      en: 'Practical Arabic guidance on the BA role, requirements, stakeholder conversations, and building a career from real project work.',
      ar: 'محتوى عربي عملي عن دور الـBA والمتطلبات والتعامل مع أصحاب المصلحة وبناء المسار المهني من واقع الشغل.'
    },
    tags: { en: ['BA career', 'Requirements', 'Stakeholders'], ar: ['مسار الـBA', 'المتطلبات', 'أصحاب المصلحة'] },
    links: [{ platform: 'linkedin', url: 'https://www.linkedin.com/in/imashaal/' }]
  },
  {
    id: 'laura-brandenburg', order: 2, kind: 'person', topics: ['business-analysis'], contentLanguages: ['en'], mark: 'LB',
    name: 'Laura Brandenburg',
    image: { src: '/images/follow/laura-brandenburg.webp', presentation: 'portrait', sourcePage: 'https://www.linkedin.com/in/laurabrandenburg' },
    description: {
      en: 'Beginner-friendly explanations of BA responsibilities, process models, requirements, and the steps for entering the profession.',
      ar: 'شرح مناسب للمبتدئين لمسؤوليات الـBA ونمذجة العمليات والمتطلبات وخطوات الدخول للمجال.'
    },
    tags: { en: ['BA foundations', 'Process modeling', 'Career'], ar: ['أساسيات الـBA', 'نمذجة العمليات', 'المسار المهني'] },
    links: [{ platform: 'linkedin', url: 'https://www.linkedin.com/in/laurabrandenburg' }]
  },
  {
    id: 'angela-wick', order: 3, kind: 'person', topics: ['business-analysis', 'ai'], contentLanguages: ['en'], mark: 'AW',
    name: 'Angela Wick',
    image: { src: '/images/follow/angela-wick.webp', presentation: 'portrait', sourcePage: 'https://www.linkedin.com/in/angelawickcbap' },
    description: {
      en: 'Connects modern business analysis with agile delivery, product work, and responsible use of AI in analysis activities.',
      ar: 'بتربط تحليل الأعمال الحديث بالـAgile وشغل المنتجات والاستخدام المسؤول للـAI في أنشطة التحليل.'
    },
    tags: { en: ['Agile analysis', 'AI for BAs', 'Collaboration'], ar: ['التحليل مع Agile', 'AI للـBA', 'التعاون'] },
    links: [{ platform: 'linkedin', url: 'https://www.linkedin.com/in/angelawickcbap' }]
  },
  {
    id: 'adrian-reed', order: 4, kind: 'person', topics: ['business-analysis'], contentLanguages: ['en'], mark: 'AR',
    name: 'Adrian Reed',
    image: { src: '/images/follow/adrian-reed.webp', presentation: 'portrait', sourcePage: 'https://www.linkedin.com/in/adrianreed' },
    description: {
      en: 'Thoughtful BA practice covering systems thinking, facilitation, communication, and finding the real problem behind a request.',
      ar: 'محتوى عميق عن التفكير المنظومي والتيسير والتواصل والوصول للمشكلة الحقيقية وراء الطلب.'
    },
    tags: { en: ['Systems thinking', 'Facilitation', 'Problem analysis'], ar: ['التفكير المنظومي', 'التيسير', 'تحليل المشكلة'] },
    links: [{ platform: 'linkedin', url: 'https://www.linkedin.com/in/adrianreed' }]
  },
  {
    id: 'moaaz-el-masry', order: 5, kind: 'person', topics: ['product-management'], contentLanguages: ['ar'], mark: 'MM',
    name: 'Moaaz El Masry',
    image: { src: '/images/follow/moaaz-el-masry.webp', presentation: 'portrait', sourcePage: 'https://www.linkedin.com/in/moaazelmasry/' },
    description: {
      en: 'Arabic product thinking grounded in discovery, governance, business value, and the realities of building digital products in MENA.',
      ar: 'تفكير عربي في المنتجات مبني على الـDiscovery والحوكمة وقيمة البيزنس وواقع بناء المنتجات الرقمية في المنطقة.'
    },
    tags: { en: ['Discovery', 'Product strategy', 'Governance'], ar: ['الـDiscovery', 'استراتيجية المنتج', 'الحوكمة'] },
    links: [{ platform: 'linkedin', url: 'https://www.linkedin.com/in/moaazelmasry/' }]
  },
  {
    id: 'aakash-gupta', order: 6, kind: 'person', topics: ['product-management', 'ai'], contentLanguages: ['en'], mark: 'AG',
    name: 'Aakash Gupta',
    image: { src: '/images/follow/aakash-gupta.webp', presentation: 'portrait', sourcePage: 'https://www.youtube.com/@growproduct' },
    description: {
      en: 'Frequent breakdowns of product growth, AI product management, industry shifts, and practical career decisions.',
      ar: 'تحليلات مستمرة عن نمو المنتجات وإدارة منتجات الـAI وتغيّرات السوق وقرارات المسار المهني.'
    },
    tags: { en: ['Product growth', 'AI products', 'Career'], ar: ['نمو المنتج', 'منتجات الـAI', 'المسار المهني'] },
    links: [{ platform: 'youtube', url: 'https://www.youtube.com/@growproduct' }]
  },
  {
    id: 'teresa-torres', order: 7, kind: 'person', topics: ['product-management', 'design'], contentLanguages: ['en'], mark: 'TT',
    name: 'Teresa Torres',
    image: { src: '/images/follow/teresa-torres.webp', presentation: 'portrait', sourcePage: 'https://www.linkedin.com/in/teresatorres' },
    description: {
      en: 'Practical continuous discovery habits for interviewing customers, mapping opportunities, and testing assumptions before delivery.',
      ar: 'ممارسات عملية للـContinuous Discovery ومقابلات العملاء ورسم الفرص واختبار الافتراضات قبل التنفيذ.'
    },
    tags: { en: ['Continuous discovery', 'Interviews', 'Assumption testing'], ar: ['الاكتشاف المستمر', 'المقابلات', 'اختبار الافتراضات'] },
    links: [{ platform: 'linkedin', url: 'https://www.linkedin.com/in/teresatorres' }]
  },
  {
    id: 'shreyas-doshi', order: 8, kind: 'person', topics: ['product-management'], contentLanguages: ['en'], mark: 'SD',
    name: 'Shreyas Doshi',
    image: { src: '/images/follow/shreyas-doshi.webp', presentation: 'portrait', sourcePage: 'https://www.linkedin.com/in/shreyasdoshi' },
    description: {
      en: 'Clear mental models for product sense, strategy, prioritization, influence, and working effectively across product teams.',
      ar: 'نماذج تفكير واضحة لفهم المنتج والاستراتيجية وترتيب الأولويات والتأثير والعمل بين فرق المنتج.'
    },
    tags: { en: ['Product sense', 'Strategy', 'Leadership'], ar: ['فهم المنتج', 'الاستراتيجية', 'القيادة'] },
    links: [{ platform: 'linkedin', url: 'https://www.linkedin.com/in/shreyasdoshi' }]
  },
  {
    id: 'osama-elzero', order: 9, kind: 'person', topics: ['software-engineering'], contentLanguages: ['ar'], mark: 'OE',
    name: 'Osama Elzero',
    image: { src: '/images/follow/osama-elzero.webp', presentation: 'portrait', sourcePage: 'https://www.youtube.com/@ElzeroWebSchool' },
    description: {
      en: 'Structured Arabic learning paths for web development, programming fundamentals, tools, and sustainable learning habits.',
      ar: 'مسارات عربية منظمة لتطوير الويب وأساسيات البرمجة والأدوات وعادات التعلّم المستمرة.'
    },
    tags: { en: ['Web development', 'Programming basics', 'Learning paths'], ar: ['تطوير الويب', 'أساسيات البرمجة', 'مسارات التعلّم'] },
    links: [
      { platform: 'youtube', url: 'https://www.youtube.com/@ElzeroWebSchool' },
      { platform: 'linkedin', url: 'https://www.linkedin.com/in/osamaelzero/' }
    ]
  },
  {
    id: 'mostafa-saad', order: 10, kind: 'person', topics: ['software-engineering'], contentLanguages: ['ar', 'en'], mark: 'MS',
    name: 'Mostafa Saad Ibrahim',
    image: { src: '/images/follow/mostafa-saad.webp', presentation: 'portrait', sourcePage: 'https://www.linkedin.com/in/mostafasaad/' },
    description: {
      en: 'Strong guidance on computer-science fundamentals, algorithms, problem solving, and building durable engineering skills.',
      ar: 'توجيه قوي في أساسيات علوم الحاسب والخوارزميات وحل المشكلات وبناء مهارات هندسية تعيش معاك.'
    },
    tags: { en: ['Algorithms', 'Problem solving', 'CS fundamentals'], ar: ['الخوارزميات', 'حل المشكلات', 'أساسيات علوم الحاسب'] },
    links: [{ platform: 'linkedin', url: 'https://www.linkedin.com/in/mostafasaad/' }]
  },
  {
    id: 'hussein-nasser', order: 11, kind: 'person', topics: ['software-engineering'], contentLanguages: ['en'], mark: 'HN',
    name: 'Hussein Nasser',
    image: { src: '/images/follow/hussein-nasser.webp', presentation: 'portrait', sourcePage: 'https://www.youtube.com/@hnasr' },
    description: {
      en: 'Deep but approachable explanations of backend systems, databases, networking, protocols, performance, and architecture tradeoffs.',
      ar: 'شرح عميق وواضح للـBackend وقواعد البيانات والشبكات والبروتوكولات والأداء وقرارات الـArchitecture.'
    },
    tags: { en: ['Backend', 'Databases', 'Architecture'], ar: ['الـBackend', 'قواعد البيانات', 'الـArchitecture'] },
    links: [
      { platform: 'website', url: 'https://www.husseinnasser.com/p/about-hussein.html' },
      { platform: 'youtube', url: 'https://www.youtube.com/@hnasr' }
    ]
  },
  {
    id: 'fireship', order: 12, kind: 'person', topics: ['software-engineering'], contentLanguages: ['en'], mark: 'FS',
    name: 'Fireship',
    image: { src: '/images/follow/fireship.webp', presentation: 'brand', sourcePage: 'https://www.youtube.com/@Fireship' },
    description: {
      en: 'Fast visual explainers that help non-engineers recognize development concepts, tools, and changes across the software landscape.',
      ar: 'شروحات بصرية سريعة تساعد غير المتخصصين يعرفوا مفاهيم وأدوات وتغيّرات عالم البرمجيات.'
    },
    tags: { en: ['Tech explainers', 'Developer trends', 'Web technology'], ar: ['شرح تقني', 'اتجاهات التطوير', 'تقنيات الويب'] },
    links: [
      { platform: 'website', url: 'https://fireship.dev/' },
      { platform: 'youtube', url: 'https://www.youtube.com/@Fireship' }
    ]
  },
  {
    id: 'nada-elnady', order: 13, kind: 'person', topics: ['design'], contentLanguages: ['ar', 'en'], mark: 'NE',
    name: 'Nada Elnady',
    image: { src: '/images/follow/nada-elnady.webp', presentation: 'portrait', sourcePage: 'https://www.linkedin.com/in/nada-elnady-uxwriitng/' },
    description: {
      en: 'Arabic and English perspectives on UX writing, content design, product language, and creating clearer digital experiences.',
      ar: 'محتوى عربي وإنجليزي عن UX Writing وContent Design ولغة المنتج وبناء تجارب رقمية أوضح.'
    },
    tags: { en: ['UX writing', 'Content design', 'Localization'], ar: ['UX Writing', 'Content Design', 'التعريب'] },
    links: [{ platform: 'linkedin', url: 'https://www.linkedin.com/in/nada-elnady-uxwriitng/' }]
  },
  {
    id: 'shadi-mokhtar', order: 14, kind: 'person', topics: ['design'], contentLanguages: ['ar', 'en'], mark: 'SM',
    name: 'Shadi Mokhtar',
    image: { src: '/images/follow/shadi-mokhtar.webp', presentation: 'portrait', sourcePage: 'https://www.linkedin.com/in/shadimokhtar/' },
    description: {
      en: 'Product-design observations that help a BA understand design decisions, user experience, and collaboration with designers.',
      ar: 'ملاحظات عن Product Design تساعد الـBA يفهم قرارات التصميم وتجربة المستخدم والتعاون مع المصممين.'
    },
    tags: { en: ['Product design', 'UX', 'Design collaboration'], ar: ['تصميم المنتجات', 'تجربة المستخدم', 'التعاون مع التصميم'] },
    links: [{ platform: 'linkedin', url: 'https://www.linkedin.com/in/shadimokhtar/' }]
  },
  {
    id: 'nielsen-norman-group', order: 15, kind: 'person', topics: ['design'], contentLanguages: ['en'], mark: 'NN/g',
    name: 'Nielsen Norman Group',
    image: { src: '/images/follow/nielsen-norman-group.webp', presentation: 'brand', sourcePage: 'https://www.youtube.com/@NNgroup' },
    description: {
      en: 'Research-backed guidance on usability, user research, interaction design, accessibility, and communicating UX value.',
      ar: 'إرشادات مبنية على البحث في سهولة الاستخدام وUX Research وتصميم التفاعل وإتاحة الاستخدام وقيمة الـUX.'
    },
    tags: { en: ['UX research', 'Usability', 'Interaction design'], ar: ['UX Research', 'سهولة الاستخدام', 'تصميم التفاعل'] },
    links: [
      { platform: 'website', url: 'https://www.nngroup.com/' },
      { platform: 'youtube', url: 'https://www.youtube.com/@NNgroup' }
    ]
  },
  {
    id: 'aj-and-smart', order: 16, kind: 'person', topics: ['design', 'product-management'], contentLanguages: ['en'], mark: 'AJ',
    name: 'AJ&Smart',
    image: { src: '/images/follow/aj-and-smart.webp', presentation: 'brand', sourcePage: 'https://www.youtube.com/@AJSmart' },
    description: {
      en: 'Hands-on facilitation, workshop, design sprint, and problem-solving techniques that transfer directly into BA sessions.',
      ar: 'تقنيات عملية للتيسير والـWorkshops والـDesign Sprints وحل المشكلات تنفع مباشرة في جلسات الـBA.'
    },
    tags: { en: ['Facilitation', 'Design sprints', 'Workshops'], ar: ['التيسير', 'Design Sprints', 'ورش العمل'] },
    links: [
      { platform: 'website', url: 'https://ajsmart.com/' },
      { platform: 'youtube', url: 'https://www.youtube.com/@AJSmart' }
    ]
  },
  {
    id: 'mohamed-essam', order: 17, kind: 'person', topics: ['ai'], contentLanguages: ['ar', 'en'], mark: 'ME',
    name: 'Mohamed Essam',
    image: { src: '/images/follow/mohamed-essam.webp', presentation: 'portrait', sourcePage: 'https://www.linkedin.com/in/mohamedessam/' },
    description: {
      en: 'AI-focused posts and practical perspectives that help beginners follow machine-learning ideas and industry conversations.',
      ar: 'منشورات عن الـAI وزوايا عملية تساعد المبتدئ يتابع أفكار الـMachine Learning ونقاشات المجال.'
    },
    tags: { en: ['AI career', 'Machine learning', 'Industry insights'], ar: ['مسار الـAI', 'Machine Learning', 'رؤى السوق'] },
    links: [{ platform: 'linkedin', url: 'https://www.linkedin.com/in/mohamedessam/' }]
  },
  {
    id: 'abu-bakr-soliman', order: 18, kind: 'person', topics: ['ai', 'software-engineering'], contentLanguages: ['ar', 'en'], mark: 'AS',
    name: 'Abu Bakr Soliman',
    image: { src: '/images/follow/abu-bakr-soliman.webp', presentation: 'portrait', sourcePage: 'https://www.youtube.com/@bakrianoo' },
    description: {
      en: 'Practical AI engineering, Python, agents, open-source projects, and end-to-end demonstrations for curious builders.',
      ar: 'محتوى عملي عن AI Engineering وPython والـAgents ومشاريع Open Source وشروحات من البداية للنهاية.'
    },
    tags: { en: ['AI engineering', 'Python', 'Open source'], ar: ['AI Engineering', 'Python', 'Open Source'] },
    links: [
      { platform: 'youtube', url: 'https://www.youtube.com/@bakrianoo' },
      { platform: 'linkedin', url: 'https://www.linkedin.com/in/bakrianoo/' }
    ]
  },
  {
    id: 'heba-ahmed', order: 19, kind: 'person', topics: ['ai'], contentLanguages: ['ar'], mark: 'HA',
    name: 'Heba Ahmed',
    image: { src: '/images/follow/heba-ahmed.webp', presentation: 'brand', sourcePage: 'https://www.youtube.com/@dr_hebaahmed' },
    description: {
      en: 'Accessible Arabic walkthroughs of AI tools, automation, prompting, learning workflows, and everyday use cases.',
      ar: 'شروحات عربية سهلة لأدوات الـAI والأتمتة والـPrompting وطرق التعلّم والاستخدامات اليومية.'
    },
    tags: { en: ['AI tools', 'Automation', 'Beginner tutorials'], ar: ['أدوات الـAI', 'الأتمتة', 'شروحات للمبتدئين'] },
    links: [{ platform: 'youtube', url: 'https://www.youtube.com/@dr_hebaahmed' }]
  },
  {
    id: 'ethan-mollick', order: 20, kind: 'person', topics: ['ai', 'business-analysis'], contentLanguages: ['en'], mark: 'EM',
    name: 'Ethan Mollick',
    image: { src: '/images/follow/ethan-mollick.webp', presentation: 'portrait', sourcePage: 'https://www.linkedin.com/in/emollick/' },
    description: {
      en: 'Evidence-aware guidance on using AI at work while preserving human judgment, verification, and responsible decisions.',
      ar: 'إرشادات واعية بالأدلة لاستخدام الـAI في الشغل مع الحفاظ على الحكم البشري والتحقق والقرار المسؤول.'
    },
    tags: { en: ['AI at work', 'Human judgment', 'Responsible adoption'], ar: ['AI في الشغل', 'الحكم البشري', 'الاستخدام المسؤول'] },
    links: [{ platform: 'linkedin', url: 'https://www.linkedin.com/in/emollick/' }]
  },
  {
    id: 'andrew-ng', order: 21, kind: 'person', topics: ['ai'], contentLanguages: ['en'], mark: 'AN',
    name: 'Andrew Ng',
    image: { src: '/images/follow/andrew-ng.webp', presentation: 'brand', sourcePage: 'https://www.youtube.com/@Deeplearningai' },
    description: {
      en: 'Clear AI education and industry updates covering capabilities, limits, business applications, and practical learning paths.',
      ar: 'تعليم واضح وتحديثات عن قدرات الـAI وحدوده وتطبيقاته في البيزنس ومسارات تعلّمه العملية.'
    },
    tags: { en: ['AI education', 'Business applications', 'AI trends'], ar: ['تعليم الـAI', 'تطبيقات البيزنس', 'اتجاهات الـAI'] },
    links: [
      { platform: 'linkedin', url: 'https://www.linkedin.com/in/andrewyng' },
      { platform: 'youtube', url: 'https://www.youtube.com/@Deeplearningai' }
    ]
  },
  {
    id: 'the-product-live', order: 22, kind: 'podcast', topics: ['product-management', 'business-analysis'], contentLanguages: ['ar', 'en'], mark: 'PL',
    name: 'The Product.Live — برودكت لايڤ',
    image: { src: '/images/follow/the-product-live.webp', presentation: 'brand', sourcePage: 'https://www.youtube.com/channel/UCMsOFCu3Dmgvg25pjgIA8Zg' },
    description: {
      en: 'Long-form conversations with product leaders, with strong MENA context and practical lessons from real product careers.',
      ar: 'حوارات طويلة مع قادة منتجات، بسياق قوي من المنطقة ودروس عملية من مسارات مهنية وتجارب حقيقية.'
    },
    tags: { en: ['MENA product', 'Leadership', 'Career stories'], ar: ['منتجات المنطقة', 'القيادة', 'تجارب مهنية'] },
    links: [{ platform: 'youtube', url: 'https://www.youtube.com/channel/UCMsOFCu3Dmgvg25pjgIA8Zg' }]
  },
  {
    id: 'lennys-podcast', order: 23, kind: 'podcast', topics: ['product-management', 'ai'], contentLanguages: ['en'], mark: 'LP',
    name: "Lenny's Podcast",
    image: { src: '/images/follow/lennys-podcast.webp', presentation: 'brand', sourcePage: 'https://www.youtube.com/@LennysPodcast' },
    description: {
      en: 'Detailed interviews with product, growth, design, and AI practitioners focused on decisions, lessons, and operating methods.',
      ar: 'مقابلات تفصيلية مع خبراء المنتجات والنمو والتصميم والـAI تركّز على القرارات والدروس وطرق الشغل.'
    },
    tags: { en: ['Product', 'Growth', 'AI'], ar: ['المنتجات', 'النمو', 'الـAI'] },
    links: [
      { platform: 'podcast', url: 'https://podcasts.apple.com/us/podcast/lennys-podcast-product-career-growth/id1627920305' },
      { platform: 'youtube', url: 'https://www.youtube.com/@LennysPodcast' }
    ]
  },
  {
    id: 'ba-brew', order: 24, kind: 'podcast', topics: ['business-analysis'], contentLanguages: ['en'], mark: 'BB',
    name: 'BA Brew',
    image: { src: '/images/follow/ba-brew.webp', presentation: 'brand', sourcePage: 'https://www.assistkd.com/learning-zone/ba-brew-podcast' },
    description: {
      en: 'Informal discussions about BA techniques, business change, collaboration, and the situations analysts face in practice.',
      ar: 'نقاشات خفيفة عن تقنيات الـBA والتغيير والتعاون والمواقف اللي بيقابلها المحلل في الشغل.'
    },
    tags: { en: ['BA techniques', 'Business change', 'Practice'], ar: ['تقنيات الـBA', 'تغيير الأعمال', 'التطبيق العملي'] },
    links: [{ platform: 'podcast', url: 'https://www.assistkd.com/learning-zone/ba-brew-podcast' }]
  },
  {
    id: 'the-product-experience', order: 25, kind: 'podcast', topics: ['product-management', 'design', 'ai'], contentLanguages: ['en'], mark: 'PX',
    name: 'The Product Experience',
    image: { src: '/images/follow/the-product-experience.webp', presentation: 'brand', sourcePage: 'https://www.mindtheproduct.com/podcasts/the-product-experience/' },
    description: {
      en: 'Weekly conversations about product practice, leadership, discovery, design, and the changing impact of AI on teams.',
      ar: 'حوارات أسبوعية عن ممارسة المنتج والقيادة والـDiscovery والتصميم وتأثير الـAI المتغيّر على الفرق.'
    },
    tags: { en: ['Product practice', 'Leadership', 'Discovery'], ar: ['ممارسة المنتج', 'القيادة', 'الـDiscovery'] },
    links: [{ platform: 'podcast', url: 'https://www.mindtheproduct.com/podcasts/the-product-experience/' }]
  },
  {
    id: 'digital-products-community', order: 26, kind: 'community', topics: ['product-management', 'business-analysis', 'design'], contentLanguages: ['ar'], mark: 'DPC',
    name: 'Digital Products Community — مجتمع منتجات رقمية',
    image: { src: '/images/follow/digital-products-community.webp', presentation: 'brand', sourcePage: 'https://www.linkedin.com/company/digital-products-community-%D9%85%D8%AC%D8%AA%D9%85%D8%B9-%D9%85%D9%86%D8%AA%D8%AC%D8%A7%D8%AA-%D8%B1%D9%82%D9%85%D9%8A%D8%A9/posts/' },
    description: {
      en: 'An Arabic knowledge community spanning business analysis, product management, UX, agile delivery, and digital transformation.',
      ar: 'مجتمع معرفي عربي بيجمع تحليل الأعمال وإدارة المنتجات وUX والـAgile والتحول الرقمي.'
    },
    tags: { en: ['Digital products', 'BA', 'MENA community'], ar: ['المنتجات الرقمية', 'تحليل الأعمال', 'مجتمع عربي'] },
    links: [{ platform: 'linkedin', url: 'https://www.linkedin.com/company/digital-products-community-%D9%85%D8%AC%D8%AA%D9%85%D8%B9-%D9%85%D9%86%D8%AA%D8%AC%D8%A7%D8%AA-%D8%B1%D9%82%D9%85%D9%8A%D8%A9/posts/' }]
  },
  {
    id: 'prdkt-plus', order: 27, kind: 'community', topics: ['product-management'], contentLanguages: ['ar', 'en'], mark: 'P+',
    name: 'Prdkt+ — برودكت بلس',
    image: { src: '/images/follow/prdkt-plus.webp', presentation: 'brand', sourcePage: 'https://www.linkedin.com/company/prdktplus/posts/' },
    description: {
      en: 'A MENA product community offering meetups, workshops, career conversations, and opportunities to learn with peers.',
      ar: 'مجتمع منتجات في المنطقة بيقدم لقاءات وورش ونقاشات مهنية وفرص للتعلّم مع ناس في نفس المجال.'
    },
    tags: { en: ['MENA product', 'Meetups', 'Career growth'], ar: ['منتجات المنطقة', 'لقاءات', 'تطور مهني'] },
    links: [{ platform: 'linkedin', url: 'https://www.linkedin.com/company/prdktplus/posts/' }]
  },
  {
    id: 'iiba-chapters', order: 28, kind: 'community', topics: ['business-analysis'], contentLanguages: ['en'], mark: 'IIBA',
    name: 'IIBA Chapters',
    image: { src: '/images/follow/iiba-chapters.webp', presentation: 'brand', sourcePage: 'https://www.iiba.org/business-analysis-membership/chapters/' },
    description: {
      en: 'Local and virtual BA chapters for events, study groups, professional networking, mentorship, and shared practice.',
      ar: 'فروع محلية وافتراضية للـBA فيها فعاليات ومجموعات دراسة وعلاقات مهنية وإرشاد وتبادل خبرات.'
    },
    tags: { en: ['BA network', 'Events', 'Study groups'], ar: ['شبكة BA', 'فعاليات', 'مجموعات دراسة'] },
    links: [{ platform: 'website', url: 'https://www.iiba.org/business-analysis-membership/chapters/' }]
  },
  {
    id: 'mind-the-product', order: 29, kind: 'community', topics: ['product-management', 'design', 'ai'], contentLanguages: ['en'], mark: 'MTP',
    name: 'Mind the Product',
    image: { src: '/images/follow/mind-the-product.webp', presentation: 'brand', sourcePage: 'https://www.mindtheproduct.com/product-management-slack-community/' },
    description: {
      en: 'A global product community with discussions, events, articles, a podcast, and a large peer network for product people.',
      ar: 'مجتمع عالمي للمنتجات فيه نقاشات وفعاليات ومقالات وبودكاست وشبكة كبيرة من المتخصصين.'
    },
    tags: { en: ['Product community', 'Events', 'Peer learning'], ar: ['مجتمع منتجات', 'فعاليات', 'تعلّم جماعي'] },
    links: [{ platform: 'website', url: 'https://www.mindtheproduct.com/product-management-slack-community/' }]
  }
];

