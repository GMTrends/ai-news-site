import { b as createAstro, d as createComponent, e as addAttribute, r as renderHead, f as renderComponent, g as renderTemplate } from "../chunks/vendor_BQ-iwbOC.mjs";
import "kleur/colors";
import { $ as $$HeaderPremium } from "../chunks/HeaderPremium_DLonACPk.mjs";
import { $ as $$Footer } from "../chunks/Footer_FSuDz8wK.mjs";
/* empty css                               */
import { r } from "../chunks/data-vendor_CAsGKFmz.mjs";
const $$Astro = createAstro("http://localhost:4321");
const $$404 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$404;
  return renderTemplate`<html lang="en" data-astro-cid-zetdm5md> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Page Not Found | AI Buzz Media</title><meta name="description" content="The page you're looking for doesn't exist."><link rel="canonical"${addAttribute(Astro2.url, "href")}>${renderHead()}</head> <body data-astro-cid-zetdm5md> ${renderComponent($$result, "HeaderPremium", $$HeaderPremium, { "data-astro-cid-zetdm5md": true })} <main class="error-page" data-astro-cid-zetdm5md> <div class="container" data-astro-cid-zetdm5md> <div class="error-content" data-astro-cid-zetdm5md> <h1 class="error-title" data-astro-cid-zetdm5md>404</h1> <h2 class="error-subtitle" data-astro-cid-zetdm5md>Page Not Found</h2> <p class="error-description" data-astro-cid-zetdm5md>
Sorry, the page you're looking for doesn't exist or has been moved.
</p> <div class="error-actions" data-astro-cid-zetdm5md> <a href="/" class="btn btn-primary" data-astro-cid-zetdm5md>Go Home</a> <a href="/blog" class="btn btn-secondary" data-astro-cid-zetdm5md>Browse Articles</a> </div> </div> </div> </main> <div class="footer-padding-spacer" data-astro-cid-zetdm5md></div> ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-zetdm5md": true })}  </body> </html>`;
}, "/workspaces/ai-news-site/src/pages/404.astro", void 0);
const $$file = "/workspaces/ai-news-site/src/pages/404.astro";
const $$url = "/404";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
