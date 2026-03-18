import { b as createAstro, d as createComponent, r as renderHead, e as addAttribute, g as renderTemplate } from "../../../../chunks/vendor_BQ-iwbOC.mjs";
import "kleur/colors";
import "clsx";
import { g as getCollection } from "../../../../chunks/data-vendor_CAsGKFmz.mjs";
import { r } from "../../../../chunks/data-vendor_CAsGKFmz.mjs";
/* empty css                                           */
const $$Astro = createAstro("http://localhost:4321");
async function getStaticPaths() {
  const articles = await getCollection("articles");
  return articles.map((article) => ({
    params: { slug: article.slug },
    props: { article }
  }));
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { article } = Astro2.props;
  const pageTitle = `Edit Article: ${article.data.title}`;
  return renderTemplate`<html lang="en" data-astro-cid-ievex7xh> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${pageTitle} - AI Buzz Media</title><meta name="description" content="Edit article for AI Buzz Media"><!-- Favicon --><link rel="icon" type="image/x-icon" href="/favicon.ico"><!-- Google Fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">${renderHead()}</head> <body data-astro-cid-ievex7xh> <div class="container" data-astro-cid-ievex7xh> <a href="/admin/articles" class="back-btn" data-astro-cid-ievex7xh>← Back to Articles</a> <div class="header" data-astro-cid-ievex7xh> <h1 class="title" data-astro-cid-ievex7xh>Edit Article</h1> <p data-astro-cid-ievex7xh>Editing: ${article.data.title}</p> </div> <div class="edit-form" data-astro-cid-ievex7xh> <div class="info-box" data-astro-cid-ievex7xh> <h3 data-astro-cid-ievex7xh>📝 Manual Editing Required</h3> <p data-astro-cid-ievex7xh>This is a lightweight CMS. To edit this article, you'll need to manually edit the file at:</p> <code data-astro-cid-ievex7xh>src/content/articles/${article.slug}.md</code> </div> <form id="editForm" data-astro-cid-ievex7xh> <div class="form-group" data-astro-cid-ievex7xh> <label class="form-label" data-astro-cid-ievex7xh>Title</label> <input type="text" class="form-input"${addAttribute(article.data.title, "value")} readonly data-astro-cid-ievex7xh> </div> <div class="form-group" data-astro-cid-ievex7xh> <label class="form-label" data-astro-cid-ievex7xh>Author</label> <input type="text" class="form-input"${addAttribute(article.data.author, "value")} readonly data-astro-cid-ievex7xh> </div> <div class="form-group" data-astro-cid-ievex7xh> <label class="form-label" data-astro-cid-ievex7xh>Category</label> <input type="text" class="form-input"${addAttribute(article.data.category, "value")} readonly data-astro-cid-ievex7xh> </div> <div class="form-group" data-astro-cid-ievex7xh> <label class="form-label" data-astro-cid-ievex7xh>Publication Date</label> <input type="text" class="form-input"${addAttribute(new Date(article.data.pubDate).toLocaleDateString(), "value")} readonly data-astro-cid-ievex7xh> </div> <div class="form-group" data-astro-cid-ievex7xh> <label class="form-label" data-astro-cid-ievex7xh>Description</label> <textarea class="form-textarea" readonly data-astro-cid-ievex7xh>${article.data.description}</textarea> </div> <div class="form-group" data-astro-cid-ievex7xh> <label class="form-label" data-astro-cid-ievex7xh>Content Preview (First 500 characters)</label> <textarea class="form-textarea" readonly data-astro-cid-ievex7xh>${article.body.substring(0, 500)}...</textarea> </div> <div class="form-actions" data-astro-cid-ievex7xh> <a${addAttribute(`/${article.data.category}/${article.slug}`, "href")} class="btn btn-primary" data-astro-cid-ievex7xh>
View Article
</a> <button type="button" class="btn btn-secondary" onclick="openFileEditor()" data-astro-cid-ievex7xh>
📁 Open File Editor
</button> <button type="button" class="btn btn-secondary" onclick="copyFilePath()" data-astro-cid-ievex7xh>
📋 Copy File Path
</button> </div> </form> </div> </div>  </body> </html>`;
}, "/workspaces/ai-news-site/src/pages/admin/articles/edit/[slug].astro", void 0);
const $$file = "/workspaces/ai-news-site/src/pages/admin/articles/edit/[slug].astro";
const $$url = "/admin/articles/edit/[slug]";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
