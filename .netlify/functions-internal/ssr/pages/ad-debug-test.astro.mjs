import { d as createComponent, r as renderHead, f as renderComponent, g as renderTemplate } from "../chunks/vendor_BQ-iwbOC.mjs";
import "kleur/colors";
import { $ as $$UniversalAd } from "../chunks/UniversalAd_P2YSsr8t.mjs";
/* empty css                                         */
import { r } from "../chunks/data-vendor_CAsGKFmz.mjs";
const $$AdDebugTest = createComponent(($$result, $$props, $$slots) => {
  console.log("Ad debug test page: Starting execution");
  return renderTemplate`<html lang="en" data-astro-cid-3y454mvv> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Ad Debug Test</title>${renderHead()}</head> <body data-astro-cid-3y454mvv> <h1 data-astro-cid-3y454mvv>UniversalAd Component Debug Test</h1> <div class="test-section" data-astro-cid-3y454mvv> <div class="test-title" data-astro-cid-3y454mvv>Test 1: sidebar-premium-spotlight</div> <p data-astro-cid-3y454mvv>This should render the sidebar premium spotlight ad:</p> ${renderComponent($$result, "UniversalAd", $$UniversalAd, { "adId": "sidebar-premium-spotlight", "data-astro-cid-3y454mvv": true })} </div> <div class="test-section" data-astro-cid-3y454mvv> <div class="test-title" data-astro-cid-3y454mvv>Test 2: hero-premium-top</div> <p data-astro-cid-3y454mvv>This should render the hero premium top ad:</p> ${renderComponent($$result, "UniversalAd", $$UniversalAd, { "adId": "hero-premium-top", "data-astro-cid-3y454mvv": true })} </div> <div class="test-section" data-astro-cid-3y454mvv> <div class="test-title" data-astro-cid-3y454mvv>Test 3: leaderboard-main</div> <p data-astro-cid-3y454mvv>This should render the leaderboard main ad:</p> ${renderComponent($$result, "UniversalAd", $$UniversalAd, { "adId": "leaderboard-main", "data-astro-cid-3y454mvv": true })} </div> <div class="test-section" data-astro-cid-3y454mvv> <div class="test-title" data-astro-cid-3y454mvv>Test 4: non-existent-ad</div> <p data-astro-cid-3y454mvv>This should render a fallback ad (testing fallback logic):</p> ${renderComponent($$result, "UniversalAd", $$UniversalAd, { "adId": "non-existent-ad", "data-astro-cid-3y454mvv": true })} </div>  </body> </html>`;
}, "/workspaces/ai-news-site/src/pages/ad-debug-test.astro", void 0);
const $$file = "/workspaces/ai-news-site/src/pages/ad-debug-test.astro";
const $$url = "/ad-debug-test";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$AdDebugTest,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
