import { d as createComponent, r as renderHead, g as renderTemplate, e as addAttribute } from "../../chunks/vendor_BQ-iwbOC.mjs";
import "kleur/colors";
import "clsx";
import { g as getCollection } from "../../chunks/data-vendor_CAsGKFmz.mjs";
import { r } from "../../chunks/data-vendor_CAsGKFmz.mjs";
/* empty css                                       */
const $$Articles = createComponent(async ($$result, $$props, $$slots) => {
  const articles = await getCollection("articles");
  articles.sort((a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime());
  const pageTitle = "Articles Management";
  return renderTemplate`<html lang="en" data-astro-cid-7enwnw5c> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${pageTitle} - AI Buzz Media</title><meta name="description" content="Manage articles for AI Buzz Media"><!-- Favicon --><link rel="icon" type="image/x-icon" href="/favicon.ico"><!-- Google Fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">${renderHead()}</head> <body data-astro-cid-7enwnw5c> <div class="container" data-astro-cid-7enwnw5c> <a href="/cms/" class="back-btn" data-astro-cid-7enwnw5c>← Back to CMS</a> <div class="header" data-astro-cid-7enwnw5c> <h1 class="title" data-astro-cid-7enwnw5c>Articles Management</h1> <p class="subtitle" data-astro-cid-7enwnw5c>Manage your AI news articles and content</p> <div style="margin-top: 1rem;" data-astro-cid-7enwnw5c> <a href="/admin/articles/new" class="btn btn-primary" data-astro-cid-7enwnw5c>📝 Create New Article</a> </div> </div> <div class="articles-grid" data-astro-cid-7enwnw5c> ${articles.length === 0 ? renderTemplate`<div class="article-card" data-astro-cid-7enwnw5c> <h3 data-astro-cid-7enwnw5c>No articles found</h3> <p data-astro-cid-7enwnw5c>Create your first article to get started!</p> <a href="/admin/articles/new" class="btn btn-primary" data-astro-cid-7enwnw5c>Create First Article</a> </div>` : articles.map((article) => renderTemplate`<div class="article-card" data-astro-cid-7enwnw5c> <div class="article-header" data-astro-cid-7enwnw5c> <div style="flex: 1;" data-astro-cid-7enwnw5c> <h2 class="article-title" data-astro-cid-7enwnw5c>${article.data.title}</h2> <div class="article-meta" data-astro-cid-7enwnw5c> <span data-astro-cid-7enwnw5c>📅 ${new Date(article.data.pubDate).toLocaleDateString()}</span> <span data-astro-cid-7enwnw5c>👤 ${article.data.author}</span> <span class="status-published" data-astro-cid-7enwnw5c>Published</span> </div> ${article.data.category && renderTemplate`<span class="tag" data-astro-cid-7enwnw5c>${article.data.category}</span>`} </div> </div> <p class="article-excerpt" data-astro-cid-7enwnw5c> ${article.data.description || "No description available"} </p> <div class="article-actions" data-astro-cid-7enwnw5c> <a${addAttribute(`/${article.data.category}/${article.slug}`, "href")} class="btn btn-primary" data-astro-cid-7enwnw5c>
View Article
</a> <a${addAttribute(`/admin/articles/edit/${article.slug}`, "href")} class="btn btn-secondary" data-astro-cid-7enwnw5c>
✏️ Edit
</a> <button class="btn btn-secondary" onclick="showDeleteConfirm('{article.slug}')" data-astro-cid-7enwnw5c>
🗑️ Delete
</button> </div> </div>`)} </div> </div>  </body> </html>`;
}, "/workspaces/ai-news-site/src/pages/admin/articles.astro", void 0);
const $$file = "/workspaces/ai-news-site/src/pages/admin/articles.astro";
const $$url = "/admin/articles";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Articles,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
