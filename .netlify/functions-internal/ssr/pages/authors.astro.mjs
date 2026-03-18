import { d as createComponent, f as renderComponent, r as renderHead, e as addAttribute, g as renderTemplate } from "../chunks/vendor_BQ-iwbOC.mjs";
import "kleur/colors";
import { $ as $$BaseHead } from "../chunks/BaseHead_DlYNO4qP.mjs";
import { $ as $$HeaderPremium } from "../chunks/HeaderPremium_DLonACPk.mjs";
import { $ as $$Footer } from "../chunks/Footer_FSuDz8wK.mjs";
import { g as getCollection } from "../chunks/data-vendor_CAsGKFmz.mjs";
import { r } from "../chunks/data-vendor_CAsGKFmz.mjs";
import { S as SITE_TITLE } from "../chunks/consts_Dxuyllhi.mjs";
/* empty css                                 */
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const authors = await getCollection("authors");
  const pageTitle = `Authors - ${SITE_TITLE}`;
  const description = "Meet our expert AI and technology writers. Read their latest articles and learn about their expertise.";
  return renderTemplate`<html lang="en" data-astro-cid-5ijxez7g> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": pageTitle, "description": description, "image": "/assets/blog-placeholder-1.jpg", "data-astro-cid-5ijxez7g": true })}${renderHead()}</head> <body data-astro-cid-5ijxez7g> ${renderComponent($$result, "HeaderPremium", $$HeaderPremium, { "data-astro-cid-5ijxez7g": true })} <main class="authors-page" data-astro-cid-5ijxez7g> <div class="authors-container" data-astro-cid-5ijxez7g> <section class="authors-hero" data-astro-cid-5ijxez7g> <h1 class="page-title" data-astro-cid-5ijxez7g>Our Expert Authors</h1> <p class="page-subtitle" data-astro-cid-5ijxez7g>Meet the AI and technology experts behind our content</p> </section> <section class="authors-grid" data-astro-cid-5ijxez7g> ${authors.map((author) => renderTemplate`<article class="author-card" data-astro-cid-5ijxez7g> <div class="author-image" data-astro-cid-5ijxez7g> ${author.data.avatar ? renderTemplate`<img${addAttribute(author.data.avatar, "src")}${addAttribute(author.data.name, "alt")} data-astro-cid-5ijxez7g>` : renderTemplate`<div class="author-placeholder" data-astro-cid-5ijxez7g> ${author.data.name.charAt(0).toUpperCase()} </div>`} </div> <div class="author-info" data-astro-cid-5ijxez7g> <h2 class="author-name" data-astro-cid-5ijxez7g> <a${addAttribute(`/authors/${author.slug}`, "href")} data-astro-cid-5ijxez7g>${author.data.name}</a> </h2> <div class="author-expertise" data-astro-cid-5ijxez7g> ${author.data.social && Object.keys(author.data.social).slice(0, 3).map((platform) => renderTemplate`<span class="expertise-tag" data-astro-cid-5ijxez7g>${platform}</span>`)} </div> <div class="author-bio-preview" data-astro-cid-5ijxez7g> ${author.data.bio && renderTemplate`<p data-astro-cid-5ijxez7g>${author.data.bio.substring(0, 120)}...</p>`} </div> <a${addAttribute(`/authors/${author.slug}`, "href")} class="view-profile" data-astro-cid-5ijxez7g>
View Profile →
</a> </div> </article>`)} </section> </div> </main> ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-5ijxez7g": true })} </body></html>`;
}, "/workspaces/ai-news-site/src/pages/authors/index.astro", void 0);
const $$file = "/workspaces/ai-news-site/src/pages/authors/index.astro";
const $$url = "/authors";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
