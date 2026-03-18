import { d as createComponent, f as renderComponent, g as renderTemplate, m as maybeRenderHead } from "../chunks/vendor_BQ-iwbOC.mjs";
import "kleur/colors";
import { $ as $$MainLayout } from "../chunks/MainLayout_DdYH-KlJ.mjs";
import { $ as $$HeroRedesigned } from "../chunks/HeroRedesigned_B1RbDut7.mjs";
/* empty css                                     */
import { r } from "../chunks/data-vendor_CAsGKFmz.mjs";
const $$HeroTest = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Hero Redesigned Test - AI News", "description": "Test page for the new isolated hero component", "data-astro-cid-bwv7hysj": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="test-notice" data-astro-cid-bwv7hysj> <div class="notice-content" data-astro-cid-bwv7hysj> <h2 data-astro-cid-bwv7hysj>🧪 Hero Redesigned Test Page</h2> <p data-astro-cid-bwv7hysj>This page tests the new isolated hero component with CSS namespace protection. The component uses "new-" prefixed classes to prevent conflicts.</p> </div> </div> ${renderComponent($$result2, "HeroRedesigned", $$HeroRedesigned, { "data-astro-cid-bwv7hysj": true })} ` })} `;
}, "/workspaces/ai-news-site/src/pages/hero-test.astro", void 0);
const $$file = "/workspaces/ai-news-site/src/pages/hero-test.astro";
const $$url = "/hero-test";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$HeroTest,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
