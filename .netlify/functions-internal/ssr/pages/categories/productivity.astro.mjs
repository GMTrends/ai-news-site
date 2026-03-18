import { b as createAstro, d as createComponent, f as renderComponent, g as renderTemplate } from "../../chunks/vendor_BQ-iwbOC.mjs";
import "kleur/colors";
import { b as getArticlesByCategory } from "../../chunks/data-vendor_CAsGKFmz.mjs";
import { r } from "../../chunks/data-vendor_CAsGKFmz.mjs";
import { g as getCategoryData } from "../../chunks/categoryData_Btap_tYl.mjs";
import { $ as $$CategoryLayout } from "../../chunks/CategoryLayout_DkGqAOhs.mjs";
const $$Astro = createAstro("http://localhost:4321");
const $$Productivity = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Productivity;
  const allProductivityArticles = await getArticlesByCategory("productivity", 50);
  const productivityArticles = allProductivityArticles.slice(0, 8);
  const categoryData = getCategoryData("productivity");
  const pageTitle = categoryData?.title + " - Tools & Inspiration" || "AI Productivity & Automation - Tools & Inspiration";
  const pageDescription = categoryData?.metaDescription || "Discover AI-powered productivity tools, automation workflows, and efficiency systems. Learn how AI can streamline your work and boost performance.";
  const keywords = categoryData?.keywords.join(", ") || "AI productivity, automation tools, workflow optimization, AI efficiency, business automation";
  return renderTemplate`${renderComponent($$result, "CategoryLayout", $$CategoryLayout, { "title": pageTitle, "description": pageDescription, "keywords": keywords, "canonicalUrl": Astro2.url.href, "categorySlug": "productivity", "categoryData": categoryData, "allArticles": allProductivityArticles, "initialArticles": productivityArticles, "categoryDisplayName": "Productivity" })}`;
}, "/workspaces/ai-news-site/src/pages/categories/productivity.astro", void 0);
const $$file = "/workspaces/ai-news-site/src/pages/categories/productivity.astro";
const $$url = "/categories/productivity";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Productivity,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
