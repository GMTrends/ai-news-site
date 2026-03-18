import { b as createAstro, d as createComponent, f as renderComponent, g as renderTemplate } from "../../chunks/vendor_BQ-iwbOC.mjs";
import "kleur/colors";
import { b as getArticlesByCategory } from "../../chunks/data-vendor_CAsGKFmz.mjs";
import { r } from "../../chunks/data-vendor_CAsGKFmz.mjs";
import { g as getCategoryData } from "../../chunks/categoryData_Btap_tYl.mjs";
import { $ as $$CategoryLayout } from "../../chunks/CategoryLayout_DkGqAOhs.mjs";
const $$Astro = createAstro("http://localhost:4321");
const $$AiAgents = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AiAgents;
  const allAIAgentsArticles = await getArticlesByCategory("ai-agents", 50);
  const aiAgentsArticles = allAIAgentsArticles.slice(0, 8);
  const categoryData = getCategoryData("ai-agents");
  const pageTitle = categoryData?.title + " - Tools & Inspiration" || "AI Agents & Automation - Tools & Inspiration";
  const pageDescription = categoryData?.metaDescription || "Discover intelligent AI agents and autonomous systems that can handle complex tasks, workflows, and decision-making processes.";
  const keywords = categoryData?.keywords.join(", ") || "AI agents, autonomous systems, intelligent automation, AI workflows, smart assistants";
  return renderTemplate`${renderComponent($$result, "CategoryLayout", $$CategoryLayout, { "title": pageTitle, "description": pageDescription, "keywords": keywords, "canonicalUrl": Astro2.url.href, "categorySlug": "ai-agents", "categoryData": categoryData, "allArticles": allAIAgentsArticles, "initialArticles": aiAgentsArticles, "categoryDisplayName": "AI Agents" })}`;
}, "/workspaces/ai-news-site/src/pages/categories/ai-agents.astro", void 0);
const $$file = "/workspaces/ai-news-site/src/pages/categories/ai-agents.astro";
const $$url = "/categories/ai-agents";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$AiAgents,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
