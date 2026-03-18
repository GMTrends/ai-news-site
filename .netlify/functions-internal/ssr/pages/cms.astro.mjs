import { d as createComponent, r as renderHead, g as renderTemplate } from "../chunks/vendor_BQ-iwbOC.mjs";
import "kleur/colors";
import "clsx";
/* empty css                               */
import { r } from "../chunks/data-vendor_CAsGKFmz.mjs";
const $$Cms = createComponent(($$result, $$props, $$slots) => {
  const pageTitle = "Content Management System";
  return renderTemplate`<html lang="en" data-astro-cid-h6qsow3q> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${pageTitle} - AI Buzz Media</title><meta name="description" content="Content management system for AI Buzz Media"><!-- Favicon --><link rel="icon" type="image/x-icon" href="/favicon.ico"><!-- Google Fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">${renderHead()}</head> <body data-astro-cid-h6qsow3q> <a href="/admin/" class="back-btn" data-astro-cid-h6qsow3q>← Back to Admin</a> <div class="cms-container" data-astro-cid-h6qsow3q> <div class="cms-header" data-astro-cid-h6qsow3q> <h1 class="cms-title" data-astro-cid-h6qsow3q>Content Management System</h1> <p class="cms-subtitle" data-astro-cid-h6qsow3q>Manage your AI Buzz Media content with ease</p> </div> <div class="stats-grid" data-astro-cid-h6qsow3q> <div class="stat-card" data-astro-cid-h6qsow3q> <div class="stat-number" data-astro-cid-h6qsow3q>2</div> <div class="stat-label" data-astro-cid-h6qsow3q>Articles</div> </div> <div class="stat-card" data-astro-cid-h6qsow3q> <div class="stat-number" data-astro-cid-h6qsow3q>2</div> <div class="stat-label" data-astro-cid-h6qsow3q>Authors</div> </div> <div class="stat-card" data-astro-cid-h6qsow3q> <div class="stat-number" data-astro-cid-h6qsow3q>6</div> <div class="stat-label" data-astro-cid-h6qsow3q>Categories</div> </div> <div class="stat-card" data-astro-cid-h6qsow3q> <div class="stat-number" data-astro-cid-h6qsow3q>1</div> <div class="stat-label" data-astro-cid-h6qsow3q>Pages</div> </div> </div> <div class="cms-grid" data-astro-cid-h6qsow3q> <!-- Articles Management --> <div class="cms-card" data-astro-cid-h6qsow3q> <div class="card-header" data-astro-cid-h6qsow3q> <div class="card-icon articles-icon" data-astro-cid-h6qsow3q>📝</div> <h2 class="card-title" data-astro-cid-h6qsow3q>Articles</h2> </div> <p class="card-description" data-astro-cid-h6qsow3q>
Create, edit, and manage your AI news articles. Add featured images, categories, and SEO metadata.
</p> <div class="card-actions" data-astro-cid-h6qsow3q> <a href="/admin/articles" class="btn btn-primary" data-astro-cid-h6qsow3q>View Articles</a> <a href="/admin/articles/new" class="btn btn-secondary" data-astro-cid-h6qsow3q>Create New</a> </div> </div> <!-- Authors Management --> <div class="cms-card" data-astro-cid-h6qsow3q> <div class="card-header" data-astro-cid-h6qsow3q> <div class="card-icon authors-icon" data-astro-cid-h6qsow3q>👤</div> <h2 class="card-title" data-astro-cid-h6qsow3q>Authors</h2> </div> <p class="card-description" data-astro-cid-h6qsow3q>
Manage your team of AI experts and contributors. Add bios, credentials, and social links.
</p> <div class="card-actions" data-astro-cid-h6qsow3q> <a href="/admin/authors" class="btn btn-primary" data-astro-cid-h6qsow3q>View Authors</a> <a href="/admin/authors/new" class="btn btn-secondary" data-astro-cid-h6qsow3q>Add Author</a> </div> </div> <!-- Categories Management --> <div class="cms-card" data-astro-cid-h6qsow3q> <div class="card-header" data-astro-cid-h6qsow3q> <div class="card-icon categories-icon" data-astro-cid-h6qsow3q>🏷️</div> <h2 class="card-title" data-astro-cid-h6qsow3q>Categories</h2> </div> <p class="card-description" data-astro-cid-h6qsow3q>
Organize your content with categories like AI News, Reviews, Tutorials, and more.
</p> <div class="card-actions" data-astro-cid-h6qsow3q> <a href="/admin/categories" class="btn btn-primary" data-astro-cid-h6qsow3q>View Categories</a> <a href="/admin/categories/new" class="btn btn-secondary" data-astro-cid-h6qsow3q>Add Category</a> </div> </div> <!-- Site Settings --> <div class="cms-card" data-astro-cid-h6qsow3q> <div class="card-header" data-astro-cid-h6qsow3q> <div class="card-icon settings-icon" data-astro-cid-h6qsow3q>⚙️</div> <h2 class="card-title" data-astro-cid-h6qsow3q>Site Settings</h2> </div> <p class="card-description" data-astro-cid-h6qsow3q>
Configure your site's appearance, SEO settings, and global preferences.
</p> <div class="card-actions" data-astro-cid-h6qsow3q> <a href="/admin/settings" class="btn btn-primary" data-astro-cid-h6qsow3q>Site Settings</a> <a href="/admin/analytics" class="btn btn-secondary" data-astro-cid-h6qsow3q>Analytics</a> </div> </div> </div> <!-- Quick Actions --> <div class="cms-card" data-astro-cid-h6qsow3q> <h3 style="margin-bottom: 1rem; color: #333;" data-astro-cid-h6qsow3q>Quick Actions</h3> <div class="card-actions" data-astro-cid-h6qsow3q> <a href="/admin/articles/new" class="btn btn-primary" data-astro-cid-h6qsow3q>📝 Write New Article</a> <a href="/admin/authors/new" class="btn btn-secondary" data-astro-cid-h6qsow3q>👤 Add New Author</a> <a href="/admin/categories/new" class="btn btn-secondary" data-astro-cid-h6qsow3q>🏷️ Create Category</a> <a href="/admin/backup" class="btn btn-secondary" data-astro-cid-h6qsow3q>💾 Backup Content</a> <a href="/admin/export" class="btn btn-secondary" data-astro-cid-h6qsow3q>📤 Export Data</a> </div> </div> </div>  </body> </html>`;
}, "/workspaces/ai-news-site/src/pages/cms.astro", void 0);
const $$file = "/workspaces/ai-news-site/src/pages/cms.astro";
const $$url = "/cms";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Cms,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
