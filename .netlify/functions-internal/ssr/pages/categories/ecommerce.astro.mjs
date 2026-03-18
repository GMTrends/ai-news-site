import { b as createAstro, d as createComponent, f as renderComponent, g as renderTemplate } from "../../chunks/vendor_BQ-iwbOC.mjs";
import "kleur/colors";
import { b as getArticlesByCategory } from "../../chunks/data-vendor_CAsGKFmz.mjs";
import { r } from "../../chunks/data-vendor_CAsGKFmz.mjs";
import { g as getCategoryData } from "../../chunks/categoryData_Btap_tYl.mjs";
import { $ as $$CategoryLayout } from "../../chunks/CategoryLayout_DkGqAOhs.mjs";
const $$Astro = createAstro("http://localhost:4321");
const $$Ecommerce = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Ecommerce;
  const allEcommerceArticles = await getArticlesByCategory("ecommerce", 50);
  const ecommerceArticles = allEcommerceArticles.slice(0, 8);
  const categoryData = getCategoryData("ecommerce");
  const pageTitle = categoryData?.title + " - Tools & Inspiration" || "AI E-commerce & Sales - Tools & Inspiration";
  const pageDescription = categoryData?.metaDescription || "Revolutionize your online business with AI-powered e-commerce tools, sales optimization, and customer experience enhancement.";
  const keywords = categoryData?.keywords.join(", ") || "AI ecommerce, sales optimization, customer experience, online business, AI retail";
  return renderTemplate`${renderComponent($$result, "CategoryLayout", $$CategoryLayout, { "title": pageTitle, "description": pageDescription, "keywords": keywords, "canonicalUrl": Astro2.url.href, "categorySlug": "ecommerce", "categoryData": categoryData, "allArticles": allEcommerceArticles, "initialArticles": ecommerceArticles, "categoryDisplayName": "eCommerce" })}`;
}, "/workspaces/ai-news-site/src/pages/categories/ecommerce.astro", void 0);
const $$file = "/workspaces/ai-news-site/src/pages/categories/ecommerce.astro";
const $$url = "/categories/ecommerce";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Ecommerce,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
