import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site || 'https://example.github.io/bac9-blog/').href;
  return new Response(`User-agent: *\nAllow: /\nSitemap: ${sitemap}\n`, { headers: { 'Content-Type': 'text/plain' } });
};
