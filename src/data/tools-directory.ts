export type ToolCategory =
  | 'ai-research'
  | 'documentation-delivery'
  | 'workshops-diagrams'
  | 'prototyping-no-code'
  | 'automation'
  | 'meetings-communication';

type LocalizedText = Record<'en' | 'ar', string>;
type LocalizedList = Record<'en' | 'ar', string[]>;

export interface ToolLogo {
  src: string;
  sourcePage: string;
}

export interface ToolEntry {
  id: string;
  order: number;
  name: string;
  mark: string;
  url: string;
  category: ToolCategory;
  logo: ToolLogo;
  description: LocalizedText;
  tags: LocalizedList;
  successorNote?: LocalizedText;
}

export const toolCategoryOrder: ToolCategory[] = [
  'ai-research',
  'documentation-delivery',
  'workshops-diagrams',
  'prototyping-no-code',
  'automation',
  'meetings-communication'
];

export const toolCategoryLabels: Record<ToolCategory, LocalizedText> = {
  'ai-research': { en: 'AI assistants & research', ar: 'مساعدات الـAI والبحث' },
  'documentation-delivery': { en: 'Documentation & delivery', ar: 'التوثيق وإدارة التنفيذ' },
  'workshops-diagrams': { en: 'Workshops & diagrams', ar: 'ورش العمل والرسومات' },
  'prototyping-no-code': { en: 'Prototyping & no-code', ar: 'النماذج الأولية وNo-code' },
  automation: { en: 'Automation', ar: 'الأتمتة' },
  'meetings-communication': { en: 'Meetings & communication', ar: 'الاجتماعات والتواصل' }
};

export const toolCategoryDescriptions: Record<ToolCategory, LocalizedText> = {
  'ai-research': {
    en: 'Explore a problem, compare evidence, summarize sources, and turn rough thinking into a clearer starting point.',
    ar: 'استكشف المشكلة، وقارن الأدلة، ولخّص المصادر، وحوّل التفكير الأولي لنقطة بداية أوضح.'
  },
  'documentation-delivery': {
    en: 'Keep requirements, decisions, delivery work, and performance evidence understandable and connected.',
    ar: 'خلّي المتطلبات والقرارات وشغل التنفيذ وأدلة الأداء واضحة ومترابطة.'
  },
  'workshops-diagrams': {
    en: 'Facilitate shared thinking and make processes, journeys, systems, and relationships visible.',
    ar: 'سهّل التفكير المشترك ووضّح العمليات والرحلات والأنظمة والعلاقات بصريًا.'
  },
  'prototyping-no-code': {
    en: 'Make an idea tangible with wireframes, prototypes, websites, or working no-code applications.',
    ar: 'حوّل الفكرة لحاجة ملموسة من خلال Wireframes أو Prototypes أو مواقع وتطبيقات No-code.'
  },
  automation: {
    en: 'Connect everyday tools and remove repetitive handoffs from analysis and delivery workflows.',
    ar: 'اربط الأدوات اليومية وقلّل خطوات التسليم المتكررة في التحليل والتنفيذ.'
  },
  'meetings-communication': {
    en: 'Capture conversations and communicate findings through transcripts, visuals, voice, and media.',
    ar: 'وثّق المحادثات وشارك النتائج من خلال النصوص والصور والصوت والمحتوى المرئي.'
  }
};

export const tools: ToolEntry[] = [
  {
    id: 'futurepedia', order: 1, name: 'Futurepedia', mark: 'FP', url: 'https://www.futurepedia.io/', category: 'ai-research',
    logo: { src: '/images/tools/futurepedia.png', sourcePage: 'https://www.futurepedia.io/' },
    description: {
      en: 'Browse a large AI-tool directory when you need to discover possible products before comparing them yourself.',
      ar: 'استكشف دليلًا كبيرًا لأدوات الـAI لما تحتاج تعرف المنتجات المتاحة قبل ما تقارنها بنفسك.'
    },
    tags: { en: ['Tool discovery', 'AI landscape', 'Shortlisting'], ar: ['اكتشاف الأدوات', 'سوق الـAI', 'قائمة مختصرة'] }
  },
  {
    id: 'poe', order: 2, name: 'Poe', mark: 'PO', url: 'https://poe.com/', category: 'ai-research',
    logo: { src: '/images/tools/poe.svg', sourcePage: 'https://poe.com/' },
    description: {
      en: 'Compare conversations with multiple AI models and build focused bots for repeated analysis tasks.',
      ar: 'قارن محادثات مع نماذج AI مختلفة وابنِ Bots مركّزة لمهام التحليل المتكررة.'
    },
    tags: { en: ['Model comparison', 'Custom bots', 'Drafting'], ar: ['مقارنة النماذج', 'Bots مخصصة', 'صياغة'] }
  },
  {
    id: 'chatgpt', order: 3, name: 'ChatGPT', mark: 'CG', url: 'https://chatgpt.com/', category: 'ai-research',
    logo: { src: '/images/tools/chatgpt.png', sourcePage: 'https://chatgpt.com/' },
    description: {
      en: 'Explore requirements, analyze files, challenge assumptions, and draft clear stakeholder-ready material.',
      ar: 'استكشف المتطلبات، وحلّل الملفات، واختبر الافتراضات، واكتب محتوى واضحًا لأصحاب المصلحة.'
    },
    tags: { en: ['Analysis', 'File review', 'Drafting'], ar: ['تحليل', 'مراجعة ملفات', 'صياغة'] }
  },
  {
    id: 'claude', order: 4, name: 'Claude', mark: 'CL', url: 'https://claude.ai/', category: 'ai-research',
    logo: { src: '/images/tools/claude.svg', sourcePage: 'https://claude.ai/' },
    description: {
      en: 'Work through long documents, synthesize complex context, and improve structured analytical writing.',
      ar: 'اشتغل على مستندات طويلة، ولخّص سياقًا معقدًا، وحسّن الكتابة التحليلية المنظمة.'
    },
    tags: { en: ['Long documents', 'Synthesis', 'Writing'], ar: ['مستندات طويلة', 'تلخيص', 'كتابة'] }
  },
  {
    id: 'gemini', order: 5, name: 'Gemini', mark: 'GE', url: 'https://gemini.google.com/', category: 'ai-research',
    logo: { src: '/images/tools/gemini.svg', sourcePage: 'https://gemini.google.com/' },
    description: {
      en: 'Research, reason across mixed media, and work with information already living in the Google ecosystem.',
      ar: 'ابحث وحلّل محتوى متعدد الأنواع واشتغل مع المعلومات الموجودة داخل منظومة Google.'
    },
    tags: { en: ['Research', 'Multimodal', 'Google Workspace'], ar: ['بحث', 'محتوى متعدد', 'Google Workspace'] }
  },
  {
    id: 'perplexity', order: 6, name: 'Perplexity', mark: 'PX', url: 'https://www.perplexity.ai/', category: 'ai-research',
    logo: { src: '/images/tools/perplexity.svg', sourcePage: 'https://www.perplexity.ai/' },
    description: {
      en: 'Start source-linked web research quickly and follow the evidence behind an answer.',
      ar: 'ابدأ بحثًا سريعًا على الويب مع روابط للمصادر وراجع الدليل وراء كل إجابة.'
    },
    tags: { en: ['Web research', 'Sources', 'Market scan'], ar: ['بحث الويب', 'مصادر', 'مسح السوق'] }
  },
  {
    id: 'notebooklm', order: 7, name: 'NotebookLM', mark: 'NL', url: 'https://notebooklm.google.com/', category: 'ai-research',
    logo: { src: '/images/tools/notebooklm.png', sourcePage: 'https://notebooklm.google.com/' },
    description: {
      en: 'Question a controlled set of project sources and create grounded summaries from the material you provide.',
      ar: 'اسأل مجموعة محددة من مصادر المشروع وأنشئ ملخصات مبنية على المواد اللي أنت ضفتها.'
    },
    tags: { en: ['Source grounding', 'Project research', 'Summaries'], ar: ['مصادر محددة', 'بحث المشروع', 'ملخصات'] }
  },
  {
    id: 'notion-ai', order: 8, name: 'Notion AI', mark: 'NA', url: 'https://www.notion.com/product/ai', category: 'documentation-delivery',
    logo: { src: '/images/tools/notion-ai.svg', sourcePage: 'https://www.notion.com/product/ai' },
    description: {
      en: 'Draft, search, summarize, and organize project knowledge inside a shared documentation workspace.',
      ar: 'اكتب وابحث ولخّص ونظّم معرفة المشروع داخل مساحة توثيق مشتركة.'
    },
    tags: { en: ['Knowledge base', 'Documentation', 'Summaries'], ar: ['قاعدة معرفة', 'توثيق', 'ملخصات'] }
  },
  {
    id: 'jira', order: 9, name: 'Jira', mark: 'JI', url: 'https://www.atlassian.com/software/jira', category: 'documentation-delivery',
    logo: { src: '/images/tools/jira.svg', sourcePage: 'https://www.atlassian.com/software/jira' },
    description: {
      en: 'Track delivery work, refine backlog items, and connect requirements to implementation progress.',
      ar: 'تابع شغل التنفيذ، ونقّح عناصر الـBacklog، واربط المتطلبات بتقدم التنفيذ.'
    },
    tags: { en: ['Backlog', 'Delivery tracking', 'Agile'], ar: ['Backlog', 'متابعة التنفيذ', 'Agile'] }
  },
  {
    id: 'confluence', order: 10, name: 'Confluence', mark: 'CO', url: 'https://www.atlassian.com/software/confluence', category: 'documentation-delivery',
    logo: { src: '/images/tools/confluence.svg', sourcePage: 'https://www.atlassian.com/software/confluence' },
    description: {
      en: 'Maintain requirements, decisions, meeting notes, and project context in a collaborative knowledge base.',
      ar: 'احتفظ بالمتطلبات والقرارات وملاحظات الاجتماعات وسياق المشروع في قاعدة معرفة تعاونية.'
    },
    tags: { en: ['Requirements', 'Decision log', 'Team knowledge'], ar: ['متطلبات', 'سجل قرارات', 'معرفة الفريق'] }
  },
  {
    id: 'power-bi', order: 11, name: 'Power BI', mark: 'BI', url: 'https://www.microsoft.com/en-us/power-platform/products/power-bi', category: 'documentation-delivery',
    logo: { src: '/images/tools/power-bi.png', sourcePage: 'https://www.microsoft.com/en-us/power-platform/products/power-bi' },
    description: {
      en: 'Turn operational data into dashboards that help stakeholders monitor outcomes and make decisions.',
      ar: 'حوّل بيانات التشغيل إلى Dashboards تساعد أصحاب المصلحة يتابعوا النتائج وياخدوا قرارات.'
    },
    tags: { en: ['Dashboards', 'KPIs', 'Data analysis'], ar: ['Dashboards', 'مؤشرات أداء', 'تحليل بيانات'] }
  },
  {
    id: 'miro', order: 12, name: 'Miro', mark: 'MI', url: 'https://miro.com/', category: 'workshops-diagrams',
    logo: { src: '/images/tools/miro.svg', sourcePage: 'https://miro.com/' },
    description: {
      en: 'Facilitate remote workshops and map processes, journeys, assumptions, and stakeholder ideas together.',
      ar: 'سهّل ورش العمل عن بُعد وارسم العمليات والرحلات والافتراضات وأفكار أصحاب المصلحة معًا.'
    },
    tags: { en: ['Workshops', 'Process mapping', 'Collaboration'], ar: ['ورش عمل', 'رسم العمليات', 'تعاون'] }
  },
  {
    id: 'figjam', order: 13, name: 'FigJam', mark: 'FJ', url: 'https://www.figma.com/figjam/', category: 'workshops-diagrams',
    logo: { src: '/images/tools/figjam.svg', sourcePage: 'https://www.figma.com/figjam/' },
    description: {
      en: 'Run lightweight collaborative sessions for brainstorming, affinity mapping, flows, and journey work.',
      ar: 'نفّذ جلسات تعاونية خفيفة للعصف الذهني وتجميع الأفكار ورسم التدفقات والرحلات.'
    },
    tags: { en: ['Brainstorming', 'Affinity mapping', 'User flows'], ar: ['عصف ذهني', 'تجميع الأفكار', 'User flows'] }
  },
  {
    id: 'lucidchart', order: 14, name: 'Lucidchart', mark: 'LC', url: 'https://lucid.co/lucidchart', category: 'workshops-diagrams',
    logo: { src: '/images/tools/lucidchart.svg', sourcePage: 'https://lucid.co/lucidchart' },
    description: {
      en: 'Create polished process maps, system diagrams, data models, and current-to-future-state views.',
      ar: 'أنشئ خرائط عمليات ورسومات أنظمة ونماذج بيانات ورسومات للوضع الحالي والمستقبلي.'
    },
    tags: { en: ['Process maps', 'System diagrams', 'Data models'], ar: ['خرائط عمليات', 'رسومات أنظمة', 'نماذج بيانات'] }
  },
  {
    id: 'bubble', order: 15, name: 'Bubble', mark: 'BU', url: 'https://bubble.io/', category: 'prototyping-no-code',
    logo: { src: '/images/tools/bubble.png', sourcePage: 'https://bubble.io/' },
    description: {
      en: 'Build working web applications without traditional coding to test a workflow or product assumption.',
      ar: 'ابنِ تطبيقات ويب شغالة من غير برمجة تقليدية لاختبار Workflow أو افتراض في المنتج.'
    },
    tags: { en: ['Web apps', 'MVP', 'Workflow testing'], ar: ['تطبيقات ويب', 'MVP', 'اختبار Workflow'] }
  },
  {
    id: 'webflow', order: 16, name: 'Webflow', mark: 'WF', url: 'https://webflow.com/', category: 'prototyping-no-code',
    logo: { src: '/images/tools/webflow.svg', sourcePage: 'https://webflow.com/' },
    description: {
      en: 'Design and publish responsive websites while validating content, structure, and interaction ideas.',
      ar: 'صمّم وانشر مواقع Responsive واختبر أفكار المحتوى والهيكل والتفاعل.'
    },
    tags: { en: ['Websites', 'Responsive design', 'Content testing'], ar: ['مواقع', 'Responsive design', 'اختبار محتوى'] }
  },
  {
    id: 'wix-studio', order: 17, name: 'Wix Studio', mark: 'WS', url: 'https://www.wix.com/studio', category: 'prototyping-no-code',
    logo: { src: '/images/tools/wix-studio.png', sourcePage: 'https://www.wix.com/studio' },
    description: {
      en: 'Create responsive web experiences with visual design, collaboration, and advanced layout controls.',
      ar: 'أنشئ تجارب ويب Responsive بتصميم بصري وتعاون وتحكم متقدم في الـLayout.'
    },
    tags: { en: ['Web design', 'Responsive layouts', 'Collaboration'], ar: ['تصميم ويب', 'Responsive layouts', 'تعاون'] },
    successorNote: { en: 'Current successor to Editor X', ar: 'البديل الحالي لـ Editor X' }
  },
  {
    id: 'adalo', order: 18, name: 'Adalo', mark: 'AD', url: 'https://www.adalo.com/', category: 'prototyping-no-code',
    logo: { src: '/images/tools/adalo.png', sourcePage: 'https://www.adalo.com/' },
    description: {
      en: 'Turn simple mobile-app ideas into interactive prototypes and working no-code products.',
      ar: 'حوّل أفكار تطبيقات الموبايل البسيطة إلى Prototypes تفاعلية ومنتجات No-code شغالة.'
    },
    tags: { en: ['Mobile apps', 'Prototype', 'MVP'], ar: ['تطبيقات موبايل', 'Prototype', 'MVP'] }
  },
  {
    id: 'softr', order: 19, name: 'Softr', mark: 'SO', url: 'https://www.softr.io/', category: 'prototyping-no-code',
    logo: { src: '/images/tools/softr.png', sourcePage: 'https://www.softr.io/' },
    description: {
      en: 'Build portals, internal tools, and simple business applications on top of structured data.',
      ar: 'ابنِ Portals وأدوات داخلية وتطبيقات أعمال بسيطة فوق بيانات منظمة.'
    },
    tags: { en: ['Portals', 'Internal tools', 'Business apps'], ar: ['Portals', 'أدوات داخلية', 'تطبيقات أعمال'] }
  },
  {
    id: 'flutterflow', order: 20, name: 'FlutterFlow', mark: 'FF', url: 'https://www.flutterflow.io/', category: 'prototyping-no-code',
    logo: { src: '/images/tools/flutterflow.png', sourcePage: 'https://www.flutterflow.io/' },
    description: {
      en: 'Design cross-platform application flows visually and hand developers a more tangible product concept.',
      ar: 'صمّم تدفقات تطبيقات متعددة المنصات بصريًا وسلّم للمطورين تصورًا أوضح للمنتج.'
    },
    tags: { en: ['App flows', 'Cross-platform', 'Developer handoff'], ar: ['تدفقات تطبيق', 'منصات متعددة', 'تسليم للمطورين'] }
  },
  {
    id: 'glide', order: 21, name: 'Glide', mark: 'GL', url: 'https://www.glideapps.com/', category: 'prototyping-no-code',
    logo: { src: '/images/tools/glide.svg', sourcePage: 'https://www.glideapps.com/' },
    description: {
      en: 'Create practical data-backed apps for internal workflows, pilots, and operational experiments.',
      ar: 'أنشئ تطبيقات عملية مبنية على البيانات للـWorkflows الداخلية والتجارب التشغيلية.'
    },
    tags: { en: ['Internal apps', 'Data-backed', 'Pilot'], ar: ['تطبيقات داخلية', 'مبني على البيانات', 'تجربة أولية'] }
  },
  {
    id: 'visily', order: 22, name: 'Visily', mark: 'VI', url: 'https://www.visily.ai/', category: 'prototyping-no-code',
    logo: { src: '/images/tools/visily.png', sourcePage: 'https://www.visily.ai/' },
    description: {
      en: 'Create wireframes and UI concepts quickly when you need to make a requirement easier to discuss.',
      ar: 'أنشئ Wireframes وتصورات للواجهة بسرعة لما تحتاج تخلي المتطلب أسهل في النقاش.'
    },
    tags: { en: ['Wireframes', 'UI concepts', 'Requirements'], ar: ['Wireframes', 'تصور واجهة', 'متطلبات'] }
  },
  {
    id: 'uizard', order: 23, name: 'Uizard', mark: 'UI', url: 'https://uizard.io/', category: 'prototyping-no-code',
    logo: { src: '/images/tools/uizard.png', sourcePage: 'https://uizard.io/' },
    description: {
      en: 'Generate and edit interface mockups to explore a user flow before committing to development.',
      ar: 'أنشئ وعدّل Mockups للواجهة لاستكشاف رحلة المستخدم قبل الالتزام بالتطوير.'
    },
    tags: { en: ['Mockups', 'User flows', 'Rapid prototyping'], ar: ['Mockups', 'User flows', 'نماذج سريعة'] }
  },
  {
    id: 'figma', order: 24, name: 'Figma', mark: 'FI', url: 'https://www.figma.com/', category: 'prototyping-no-code',
    logo: { src: '/images/tools/figma.svg', sourcePage: 'https://www.figma.com/' },
    description: {
      en: 'Review interface designs, inspect reusable components, comment on flows, and collaborate through handoff.',
      ar: 'راجع تصميمات الواجهات والمكونات المتكررة وعلّق على التدفقات وتعاون خلال الـHandoff.'
    },
    tags: { en: ['UI review', 'Prototypes', 'Design handoff'], ar: ['مراجعة UI', 'Prototypes', 'Design handoff'] }
  },
  {
    id: 'zapier', order: 25, name: 'Zapier', mark: 'ZA', url: 'https://zapier.com/', category: 'automation',
    logo: { src: '/images/tools/zapier.svg', sourcePage: 'https://zapier.com/' },
    description: {
      en: 'Connect common business tools and automate routine updates, notifications, and information transfers.',
      ar: 'اربط أدوات البيزنس الشائعة وأتمت التحديثات والتنبيهات ونقل المعلومات المتكرر.'
    },
    tags: { en: ['Integrations', 'Workflow automation', 'Notifications'], ar: ['Integrations', 'أتمتة Workflow', 'تنبيهات'] }
  },
  {
    id: 'make', order: 26, name: 'Make', mark: 'MA', url: 'https://www.make.com/', category: 'automation',
    logo: { src: '/images/tools/make.svg', sourcePage: 'https://www.make.com/' },
    description: {
      en: 'Model multi-step automations visually when a process crosses several systems or decisions.',
      ar: 'صمّم Automations متعددة الخطوات بصريًا لما العملية تعدّي على أنظمة أو قرارات مختلفة.'
    },
    tags: { en: ['Visual automation', 'Integrations', 'Process design'], ar: ['أتمتة بصرية', 'Integrations', 'تصميم عمليات'] }
  },
  {
    id: 'otter', order: 27, name: 'Otter.ai', mark: 'OT', url: 'https://otter.ai/', category: 'meetings-communication',
    logo: { src: '/images/tools/otter.png', sourcePage: 'https://otter.ai/' },
    description: {
      en: 'Transcribe meetings and revisit decisions, questions, and action items after a stakeholder conversation.',
      ar: 'حوّل الاجتماعات لنص وارجع للقرارات والأسئلة والـAction items بعد محادثات أصحاب المصلحة.'
    },
    tags: { en: ['Transcription', 'Meeting notes', 'Action items'], ar: ['تفريغ صوتي', 'ملاحظات اجتماع', 'Action items'] }
  },
  {
    id: 'fireflies', order: 28, name: 'Fireflies.ai', mark: 'FA', url: 'https://fireflies.ai/', category: 'meetings-communication',
    logo: { src: '/images/tools/fireflies.png', sourcePage: 'https://fireflies.ai/' },
    description: {
      en: 'Capture and search meeting conversations so important requirements and follow-ups are easier to retrieve.',
      ar: 'سجّل وابحث في محادثات الاجتماعات علشان المتطلبات والمتابعات المهمة تكون أسهل في الرجوع لها.'
    },
    tags: { en: ['Meeting capture', 'Search', 'Follow-ups'], ar: ['تسجيل اجتماعات', 'بحث', 'متابعات'] }
  },
  {
    id: 'chatgpt-images', order: 29, name: 'ChatGPT Images', mark: 'CI', url: 'https://chatgpt.com/images', category: 'meetings-communication',
    logo: { src: '/images/tools/chatgpt-images.png', sourcePage: 'https://openai.com/index/introducing-chatgpt-images-2-5/' },
    description: {
      en: 'Create and edit explanatory visuals, concept illustrations, and communication assets from natural-language instructions.',
      ar: 'أنشئ وعدّل رسومات توضيحية وتصورات وأصول للتواصل باستخدام تعليمات بلغة طبيعية.'
    },
    tags: { en: ['Image generation', 'Visual explanation', 'Editing'], ar: ['توليد صور', 'شرح بصري', 'تعديل'] },
    successorNote: { en: 'Current successor to DALL·E 2', ar: 'البديل الحالي لـ DALL·E 2' }
  },
  {
    id: 'resemble-ai', order: 30, name: 'Resemble AI', mark: 'RA', url: 'https://www.resemble.ai/', category: 'meetings-communication',
    logo: { src: '/images/tools/resemble-ai.png', sourcePage: 'https://www.resemble.ai/' },
    description: {
      en: 'Generate voice content for demos, prototypes, and communication experiments that need spoken output.',
      ar: 'أنشئ محتوى صوتيًا للـDemos والـPrototypes وتجارب التواصل اللي تحتاج صوتًا منطوقًا.'
    },
    tags: { en: ['Voice generation', 'Prototype audio', 'Demos'], ar: ['توليد صوت', 'صوت للـPrototype', 'Demos'] }
  }
];
