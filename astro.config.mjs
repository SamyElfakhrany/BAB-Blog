import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

const site = process.env.PUBLIC_SITE_URL || 'https://example.github.io/bac9-blog/';
const base = process.env.PUBLIC_BASE || new URL(site).pathname.replace(/\/$/, '');

export default defineConfig({
  site,
  base: base === '/' ? '' : base,
  output: 'static',
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    }
  }
});
