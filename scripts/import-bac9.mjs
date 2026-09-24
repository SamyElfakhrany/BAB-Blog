// @ts-nocheck
import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const sourceRoot = 'F:/Obsidian/LCAP/BAC9';
const projectRoot = process.cwd();
const contentRoot = path.join(projectRoot, 'src/content/tutorials');
const imageRoot = path.join(projectRoot, 'public/images');

const articles = [
  {
    id: 'stakeholder-analysis',
    category: 'business',
    source: ['Bussiness Concepts', 'EN', 'Stakeholder_Analysis_Tutorial.md'],
    sourceAr: ['Bussiness Concepts', 'AR', 'Stakeholder_Analysis_Tutorial_AR.md'],
    title: 'Stakeholder Analysis',
    titleAr: 'تحليل أصحاب المصلحة (Stakeholder Analysis)',
    description: 'A practical guide to identifying, analyzing, and engaging stakeholders throughout a BA change initiative.',
    descriptionAr: 'دليل عملي لتحديد أصحاب المصلحة وتحليلهم وإشراكهم خلال مبادرات التغيير وتحليل الأعمال.',
    tags: ['stakeholder-analysis', 'requirements', 'elicitation'],
    readTime: 10,
    hero: 'stakeholder_power_interest_matrix.png',
    heroAr: 'stakeholder_power_interest_matrix_ar.png',
    related: ['prioritization-techniques', 'version-control-for-business-analysts']
  },
  {
    id: 'prioritization-techniques',
    category: 'business',
    source: ['Bussiness Concepts', 'EN', 'Prioritization_Techniques_Tutorial_EN.md'],
    sourceAr: ['Bussiness Concepts', 'AR', 'Prioritization_Techniques_Tutorial_AR.md'],
    title: 'Prioritization Techniques',
    titleAr: 'ترتيب أولويات المتطلبات (Prioritization Techniques)',
    description: 'Compare MoSCoW, value–effort, RICE, and WSJF techniques using a practical product example.',
    descriptionAr: 'قارن بين تقنيات MoSCoW والقيمة–المجهود وRICE وWSJF باستخدام مثال عملي لمنتج.',
    tags: ['prioritization', 'requirements', 'product'],
    readTime: 11,
    hero: 'prioritization_value_effort_matrix_en.png',
    heroAr: 'prioritization_value_effort_matrix_ar.png',
    related: ['stakeholder-analysis', 'llms-for-business-analysts']
  },
  {
    id: 'version-control-for-business-analysts',
    category: 'technical',
    source: ['Techincal Concepts', 'EN', 'Version_Control_for_Business_Analysts_Tutorial.md'],
    sourceAr: ['Techincal Concepts', 'AR', 'Version_Control_for_Business_Analysts_Tutorial_AR.md'],
    title: 'Git and GitHub for Business Analysts',
    titleAr: 'Git وGitHub لمحلل الأعمال: توتوريال من البداية',
    description: 'Understand Git, GitHub, branches, pull requests, and how BAs can review software changes without writing code.',
    descriptionAr: 'افهم Git وGitHub والفروع وطلبات الدمج وكيف يراجع محللو الأعمال تغييرات البرمجيات من غير كتابة كود.',
    tags: ['git', 'github', 'technical-literacy'],
    readTime: 14,
    hero: 'git_branch_pull_request.png',
    heroAr: 'git_branch_pull_request_ar.png',
    related: ['stakeholder-analysis', 'llms-for-business-analysts']
  },
  {
    id: 'llms-for-business-analysts',
    category: 'ai',
    source: ['AI', 'EN', 'LLMs_for_Business_Analysts_Tutorial.md'],
    sourceAr: ['AI', 'AR', 'LLMs_for_Business_Analysts_Tutorial_AR.md'],
    title: 'Large Language Models for Business Analysts',
    titleAr: 'النماذج اللغوية الكبيرة (LLMs)',
    description: 'Use LLMs responsibly for BA drafting, analysis, elicitation, gap finding, and stakeholder communication.',
    descriptionAr: 'استخدم النماذج اللغوية الكبيرة بمسؤولية في المسودات والتحليل وجمع المعلومات واكتشاف الفجوات والتواصل.',
    tags: ['ai', 'llm', 'prompting', 'requirements'],
    readTime: 13,
    hero: 'llm_ba_workflow.png',
    heroAr: 'llm_ba_workflow_ar.png',
    related: ['stakeholder-analysis', 'version-control-for-business-analysts']
  }
];

const assets = {
  EN: ['git_branch_pull_request.png', 'git_workflow_local_remote.png', 'llm_ba_workflow.png', 'llm_rag_for_ba.png', 'prioritization_value_effort_matrix_en.png', 'stakeholder_power_interest_matrix.png'],
  AR: ['git_branch_pull_request_ar.png', 'git_pull_request_diff_example_ar.png', 'git_workflow_local_remote_ar.png', 'llm_ba_workflow_ar.png', 'llm_rag_for_ba_ar.png', 'prioritization_value_effort_matrix_ar.png', 'stakeholder_power_interest_matrix_ar.png']
};

function yamlString(value) {
  return JSON.stringify(value);
}

function normalizeBody(body, lang) {
  let normalized = body.replace(/\r\n/g, '\n').trim();
  normalized = normalized.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, filename) => {
    const clean = filename.split('/').pop();
    return `<Diagram src={${JSON.stringify(`/images/${lang}/${clean}`)}} alt={${JSON.stringify(alt || clean)}} />`;
  });
  normalized = normalized.replace(/!\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, filename, alt) => {
    const clean = filename.split('/').pop();
    return `<Diagram src={${JSON.stringify(`/images/${lang}/${clean}`)}} alt={${JSON.stringify(alt || clean)}} />`;
  });
  normalized = normalized.replace(/\[([^\]]+)\]\(([^)]+\.(?:png|jpg|jpeg|webp))\)/gi, (_, label, filename) => {
    const clean = filename.split('/').pop();
    return `<AssetLink href={${JSON.stringify(`/images/${lang}/${clean}`)}}>${label}</AssetLink>`;
  });
  normalized = normalized.replace(/^# (Edit docs\/|Open a pull request)/gm, '### $1');
  normalized = normalized.replace(/\n{3,}/g, '\n\n');
  return normalized;
}

async function copyAssets() {
  for (const [lang, filenames] of Object.entries(assets)) {
    const sourceDir = path.join(sourceRoot, 'Assets', lang);
    const destinationDir = path.join(imageRoot, lang.toLowerCase());
    await mkdir(destinationDir, { recursive: true });
    for (const filename of filenames) {
      await cp(path.join(sourceDir, filename), path.join(destinationDir, filename), { force: true });
    }
  }
}

async function writeArticle(article, lang) {
  const sourceParts = lang === 'en' ? article.source : article.sourceAr;
  const sourceFile = path.join(sourceRoot, ...sourceParts);
  const body = normalizeBody(await readFile(sourceFile, 'utf8'), lang);
  const title = lang === 'en' ? article.title : article.titleAr;
  const description = lang === 'en' ? article.description : article.descriptionAr;
  const hero = lang === 'en' ? article.hero : article.heroAr;
  const imports = body.includes('<Diagram ') || body.includes('<AssetLink ')
    ? `import Diagram from '../../../../components/Diagram.astro';\nimport AssetLink from '../../../../components/AssetLink.astro';\n\n`
    : '';
  const frontmatter = [
    '---',
    `id: ${article.id}`,
    `translationId: ${article.id}`,
    `lang: ${lang}`,
    `title: ${yamlString(title)}`,
    `description: ${yamlString(description)}`,
    `category: ${article.category}`,
    `tags: ${JSON.stringify(article.tags)}`,
    'difficulty: beginner',
    'published: 2026-09-24',
    'updated: 2026-09-24',
    `readTime: ${article.readTime}`,
    `heroImage: /images/${lang}/${hero}`,
    `related: ${JSON.stringify(article.related)}`,
    'draft: false',
    '---',
    imports
  ].join('\n');
  const destinationDir = path.join(contentRoot, lang, article.category);
  await mkdir(destinationDir, { recursive: true });
  await writeFile(path.join(destinationDir, `${article.id}.mdx`), `${frontmatter}${body}\n`, 'utf8');
}

await mkdir(contentRoot, { recursive: true });
await copyAssets();
for (const article of articles) {
  await writeArticle(article, 'en');
  await writeArticle(article, 'ar');
}

console.log(`Imported ${articles.length * 2} tutorials and ${Object.values(assets).flat().length} diagrams.`);
