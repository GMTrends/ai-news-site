import { b as createAstro, d as createComponent, f as renderComponent, g as renderTemplate } from "../../chunks/vendor_BQ-iwbOC.mjs";
import "kleur/colors";
import { b as getArticlesByCategory } from "../../chunks/data-vendor_CAsGKFmz.mjs";
import { r } from "../../chunks/data-vendor_CAsGKFmz.mjs";
import { g as getCategoryData } from "../../chunks/categoryData_Btap_tYl.mjs";
import { $ as $$CategoryLayout } from "../../chunks/CategoryLayout_DkGqAOhs.mjs";
const $$Astro = createAstro("http://localhost:4321");
const $$Marketing = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Marketing;
  const allMarketingArticles = await getArticlesByCategory("marketing", 50);
  const marketingArticles = allMarketingArticles.slice(0, 8);
  const categoryData = getCategoryData("marketing");
  const pageTitle = categoryData?.title + " - Tools & Inspiration" || "AI Marketing & Growth - Tools & Inspiration";
  const pageDescription = categoryData?.metaDescription || "Explore cutting-edge AI marketing tools, growth strategies, and customer engagement solutions. Transform your marketing with intelligent automation.";
  const keywords = categoryData?.keywords.join(", ") || "AI marketing, growth tools, customer engagement, marketing automation, AI analytics";
  return renderTemplate`${renderComponent($$result, "CategoryLayout", $$CategoryLayout, { "title": pageTitle, "description": pageDescription, "keywords": keywords, "canonicalUrl": Astro2.url.href, "categorySlug": "marketing", "categoryData": categoryData, "allArticles": allMarketingArticles, "initialArticles": marketingArticles, "categoryDisplayName": "Marketing" })}`;
}, "/workspaces/ai-news-site/src/pages/categories/marketing.astro", void 0);
const $$file = "/workspaces/ai-news-site/src/pages/categories/marketing.astro";
const $$url = "/categories/marketing";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Marketing,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
