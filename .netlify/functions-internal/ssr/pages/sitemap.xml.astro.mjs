import { g as getCollection } from "../chunks/data-vendor_CAsGKFmz.mjs";
import { r } from "../chunks/data-vendor_CAsGKFmz.mjs";
const GET = async () => {
  const articles = await getCollection("articles");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>http://localhost:4321/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${articles.map((article) => `
  <url>
    <loc>http://localhost:4321/${article.data.category || "articles"}/${article.slug}</loc>
    <lastmod>${(/* @__PURE__ */ new Date()).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join("")}
</urlset>`;
  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml"
    }
  });
};
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
