import type { APIRoute } from 'astro';
import { sanityClient } from '../lib/sanity';

export const GET: APIRoute = async () => {
  // Get all articles
  const articles = await sanityClient.fetch(`
    *[_type == "article" && status == "published"] {
      "slug": slug.current,
      "category": category->slug.current,
      "lastModified": _updatedAt
    }
  `);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>http://localhost:4321/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${articles.map((article: any) => `
  <url>
    <loc>http://localhost:4321/${article.category}/${article.slug}</loc>
    <lastmod>${new Date(article.lastModified).toISOString()}</lastmod>
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
