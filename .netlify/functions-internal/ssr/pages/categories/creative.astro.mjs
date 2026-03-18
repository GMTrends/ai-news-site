import { b as createAstro, d as createComponent, f as renderComponent, g as renderTemplate } from "../../chunks/vendor_BQ-iwbOC.mjs";
import "kleur/colors";
import { b as getArticlesByCategory } from "../../chunks/data-vendor_CAsGKFmz.mjs";
import { r } from "../../chunks/data-vendor_CAsGKFmz.mjs";
import { g as getCategoryData } from "../../chunks/categoryData_Btap_tYl.mjs";
import { $ as $$CategoryLayout } from "../../chunks/CategoryLayout_DkGqAOhs.mjs";
const $$Astro = createAstro("http://localhost:4321");
const $$Creative = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Creative;
  const allCreativeArticles = await getArticlesByCategory("creative", 50);
  const creativeArticles = allCreativeArticles.slice(0, 8);
  const categoryData = getCategoryData("creative");
  const pageTitle = categoryData?.title + " - Tools & Inspiration" || "AI Creative & Design - Tools & Inspiration";
  const pageDescription = categoryData?.metaDescription || "Unleash your creativity with AI-powered design tools, content generation, and artistic solutions. Create stunning visuals and content effortlessly.";
  const keywords = categoryData?.keywords.join(", ") || "AI design, creative tools, content generation, AI art, design automation";
  return renderTemplate`${renderComponent($$result, "CategoryLayout", $$CategoryLayout, { "title": pageTitle, "description": pageDescription, "keywords": keywords, "canonicalUrl": Astro2.url.href, "categorySlug": "creative", "categoryData": categoryData, "allArticles": allCreativeArticles, "initialArticles": creativeArticles, "categoryDisplayName": "Creative" })}`;
}, "/workspaces/ai-news-site/src/pages/categories/creative.astro", void 0);
const $$file = "/workspaces/ai-news-site/src/pages/categories/creative.astro";
const $$url = "/categories/creative";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Creative,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
