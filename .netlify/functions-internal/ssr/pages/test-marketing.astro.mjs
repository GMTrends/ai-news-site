import { b as createAstro, d as createComponent, r as renderHead, g as renderTemplate } from "../chunks/vendor_BQ-iwbOC.mjs";
import "kleur/colors";
import "clsx";
import { g as getCategoryData } from "../chunks/categoryData_Btap_tYl.mjs";
import { r } from "../chunks/data-vendor_CAsGKFmz.mjs";
const $$Astro = createAstro("http://localhost:4321");
const $$TestMarketing = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$TestMarketing;
  const categoryData = getCategoryData("marketing");
  console.log("Category data:", categoryData);
  const testArticles = [
    {
      title: "Test Article 1",
      slug: "test-1",
      excerpt: "This is a test article",
      publishedAt: "2024-01-01"
    }
  ];
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Test Marketing Page</title>${renderHead()}</head> <body> <h1>Test Marketing Category Page</h1> ${categoryData ? renderTemplate`<div> <h2>${categoryData.title}</h2> <p>${categoryData.description}</p> <p>Tools Count: ${categoryData.toolsCount}</p> </div>` : renderTemplate`<p>No category data found</p>`} <h3>Test Articles:</h3> ${testArticles.map((article) => renderTemplate`<div> <h4>${article.title}</h4> <p>${article.excerpt}</p> </div>`)} <p>If you can see this page, the basic Astro rendering is working.</p> </body></html>`;
}, "/workspaces/ai-news-site/src/pages/test-marketing.astro", void 0);
const $$file = "/workspaces/ai-news-site/src/pages/test-marketing.astro";
const $$url = "/test-marketing";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$TestMarketing,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
