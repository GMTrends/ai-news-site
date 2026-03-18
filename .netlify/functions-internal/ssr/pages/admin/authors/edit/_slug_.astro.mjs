import { b as createAstro, d as createComponent, r as renderHead, e as addAttribute, g as renderTemplate } from "../../../../chunks/vendor_BQ-iwbOC.mjs";
import "kleur/colors";
import "clsx";
import { g as getCollection } from "../../../../chunks/data-vendor_CAsGKFmz.mjs";
import { r } from "../../../../chunks/data-vendor_CAsGKFmz.mjs";
/* empty css                                           */
const $$Astro = createAstro("http://localhost:4321");
async function getStaticPaths() {
  const authors = await getCollection("authors");
  return authors.map((author) => ({
    params: { slug: author.slug },
    props: { author }
  }));
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { author } = Astro2.props;
  const pageTitle = `Edit Author: ${author.data.name}`;
  return renderTemplate`<html lang="en" data-astro-cid-zcnj5uuy> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${pageTitle} - AI Buzz Media</title><meta name="description" content="Edit author for AI Buzz Media"><!-- Favicon --><link rel="icon" type="image/x-icon" href="/favicon.ico"><!-- Google Fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">${renderHead()}</head> <body data-astro-cid-zcnj5uuy> <div class="container" data-astro-cid-zcnj5uuy> <a href="/admin/authors" class="back-btn" data-astro-cid-zcnj5uuy>← Back to Authors</a> <div class="header" data-astro-cid-zcnj5uuy> <h1 class="title" data-astro-cid-zcnj5uuy>Edit Author</h1> <p data-astro-cid-zcnj5uuy>Editing: ${author.data.name}</p> </div> <div class="edit-form" data-astro-cid-zcnj5uuy> <div class="author-avatar" data-astro-cid-zcnj5uuy> ${author.data.name.charAt(0).toUpperCase()} </div> <div class="info-box" data-astro-cid-zcnj5uuy> <h3 data-astro-cid-zcnj5uuy>📝 Manual Editing Required</h3> <p data-astro-cid-zcnj5uuy>This is a lightweight CMS. To edit this author, you'll need to manually edit the file at:</p> <code data-astro-cid-zcnj5uuy>src/content/authors/${author.slug}.md</code> </div> <form id="editForm" data-astro-cid-zcnj5uuy> <div class="form-group" data-astro-cid-zcnj5uuy> <label class="form-label" data-astro-cid-zcnj5uuy>Name</label> <input type="text" class="form-input"${addAttribute(author.data.name, "value")} readonly data-astro-cid-zcnj5uuy> </div> <div class="form-group" data-astro-cid-zcnj5uuy> <label class="form-label" data-astro-cid-zcnj5uuy>Title</label> <input type="text" class="form-input"${addAttribute(author.data.title || "AI Expert", "value")} readonly data-astro-cid-zcnj5uuy> </div> <div class="form-group" data-astro-cid-zcnj5uuy> <label class="form-label" data-astro-cid-zcnj5uuy>Bio</label> <textarea class="form-textarea" readonly data-astro-cid-zcnj5uuy>${author.data.bio || "No bio available"}</textarea> </div> <div class="form-group" data-astro-cid-zcnj5uuy> <label class="form-label" data-astro-cid-zcnj5uuy>Email</label> <input type="email" class="form-input"${addAttribute(author.data.email || "No email available", "value")} readonly data-astro-cid-zcnj5uuy> </div> <div class="form-group" data-astro-cid-zcnj5uuy> <label class="form-label" data-astro-cid-zcnj5uuy>Twitter</label> <input type="text" class="form-input"${addAttribute(author.data.twitter || "No Twitter available", "value")} readonly data-astro-cid-zcnj5uuy> </div> <div class="form-actions" data-astro-cid-zcnj5uuy> <a${addAttribute(`/authors/${author.slug}`, "href")} class="btn btn-primary" data-astro-cid-zcnj5uuy>
View Author
</a> <button type="button" class="btn btn-secondary" onclick="openFileEditor()" data-astro-cid-zcnj5uuy>
📁 Open File Editor
</button> <button type="button" class="btn btn-secondary" onclick="copyFilePath()" data-astro-cid-zcnj5uuy>
📋 Copy File Path
</button> </div> </form> </div> </div>  </body> </html>`;
}, "/workspaces/ai-news-site/src/pages/admin/authors/edit/[slug].astro", void 0);
const $$file = "/workspaces/ai-news-site/src/pages/admin/authors/edit/[slug].astro";
const $$url = "/admin/authors/edit/[slug]";
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
