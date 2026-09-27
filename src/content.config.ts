import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const tutorials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './BAC9-tutorials' }),
  schema: z.object({
    id: z.string(),
    translationId: z.string(),
    lang: z.enum(['en', 'ar']),
    title: z.string(),
    description: z.string(),
    category: z.enum(['business', 'technical', 'ai']),
    tags: z.array(z.string()),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    published: z.coerce.date(),
    updated: z.coerce.date(),
    readTime: z.number().int().positive(),
    order: z.number().int().positive(),
    prerequisites: z.array(z.string()),
    learningOutcomes: z.array(z.string()).length(3),
    practicalSkill: z.string().min(1),
    heroImage: z.string(),
    related: z.array(z.string()),
    draft: z.boolean().default(false)
  })
});

export const collections = { tutorials };
