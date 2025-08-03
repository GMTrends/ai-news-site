import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export const GET: APIRoute = async () => {
  // Get all articles from content collections
  const articles = await getCollection('articles');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>http://localhost:4321/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${articles.map((article: CollectionEntry<'articles'>) => `
  <url>
    <loc>http://localhost:4321/${article.data.category || 'articles'}/${article.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
