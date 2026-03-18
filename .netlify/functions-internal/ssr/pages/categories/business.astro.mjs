import { b as createAstro, d as createComponent, f as renderComponent, g as renderTemplate } from "../../chunks/vendor_BQ-iwbOC.mjs";
import "kleur/colors";
import { b as getArticlesByCategory } from "../../chunks/data-vendor_CAsGKFmz.mjs";
import { r } from "../../chunks/data-vendor_CAsGKFmz.mjs";
import { g as getCategoryData } from "../../chunks/categoryData_Btap_tYl.mjs";
import { $ as $$CategoryLayout } from "../../chunks/CategoryLayout_DkGqAOhs.mjs";
const $$Astro = createAstro("http://localhost:4321");
const $$Business = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Business;
  const allBusinessArticles = await getArticlesByCategory("business", 50);
  const businessArticles = allBusinessArticles.slice(0, 8);
  const categoryData = getCategoryData("business");
  const pageTitle = categoryData?.title + " - Tools & Inspiration" || "AI Business Intelligence - Tools & Inspiration";
  const pageDescription = categoryData?.metaDescription || "Leverage AI for strategic business insights, data analysis, and decision-making. Transform your business operations with intelligent solutions.";
  const keywords = categoryData?.keywords.join(", ") || "AI business, business intelligence, data analysis, strategic insights, AI decision making";
  return renderTemplate`${renderComponent($$result, "CategoryLayout", $$CategoryLayout, { "title": pageTitle, "description": pageDescription, "keywords": keywords, "canonicalUrl": Astro2.url.href, "categorySlug": "business", "categoryData": categoryData, "allArticles": allBusinessArticles, "initialArticles": businessArticles, "categoryDisplayName": "Business" })}`;
}, "/workspaces/ai-news-site/src/pages/categories/business.astro", void 0);
const $$file = "/workspaces/ai-news-site/src/pages/categories/business.astro";
const $$url = "/categories/business";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Business,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
