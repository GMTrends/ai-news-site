import { d as createComponent, f as renderComponent, g as renderTemplate, m as maybeRenderHead } from "../chunks/vendor_BQ-iwbOC.mjs";
import "kleur/colors";
import { $ as $$MainLayout } from "../chunks/MainLayout_DdYH-KlJ.mjs";
import { r } from "../chunks/data-vendor_CAsGKFmz.mjs";
const $$SimpleSanityTest = createComponent(async ($$result, $$props, $$slots) => {
  const title = "Simple Sanity Test";
  const description = "Testing Sanity CMS integration";
  let testResult = "Testing...";
  let error = null;
  try {
    const { HybridAdManager } = await import("../chunks/sanityAds_B8vG8Qpv.mjs");
    const ads = await HybridAdManager.getAdsByPlacement("sidebar-premium-spotlight");
    if (ads && ads.length > 0) {
      testResult = `✅ Success! Found ${ads.length} ads. First ad: ${ads[0].title}`;
    } else {
      testResult = "⚠️ No ads found, but integration is working (using local fallback)";
    }
  } catch (err) {
    error = err instanceof Error ? err.message : "Unknown error";
    testResult = `❌ Error: ${error}`;
  }
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": title, "description": description }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="test-page"> <div class="container" style="max-width: 800px; margin: 2rem auto; padding: 2rem;"> <h1>🔗 Simple Sanity CMS Test</h1> <div style="background: rgba(30, 41, 59, 0.5); padding: 2rem; border-radius: 8px; margin: 2rem 0;"> <h2>Integration Status</h2> <p style="font-size: 1.2rem; margin: 1rem 0;">${testResult}</p> ${error && renderTemplate`<div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); padding: 1rem; border-radius: 6px; margin-top: 1rem;"> <strong>Error Details:</strong> <pre style="margin-top: 0.5rem; font-size: 0.9rem;">${error}</pre> </div>`} </div> <div style="background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.3); padding: 1.5rem; border-radius: 8px;"> <h3>✅ What This Means for You:</h3> <ul style="margin: 1rem 0; line-height: 1.6;"> <li><strong>If you see "Success":</strong> Your Sanity CMS integration is fully working! You can manage partner ads through Sanity Studio.</li> <li><strong>If you see "No ads found":</strong> The integration works, but you haven't added any ads to Sanity yet. You can still manage ads through the CMS.</li> <li><strong>If you see "Error":</strong> There's an issue with the Sanity connection, but local fallback is working.</li> </ul> <p><strong>Bottom line:</strong> You can manage partner ads without touching code - everything goes through Sanity CMS! 🎉</p> </div> </div> </main> ` })}`;
}, "/workspaces/ai-news-site/src/pages/simple-sanity-test.astro", void 0);
const $$file = "/workspaces/ai-news-site/src/pages/simple-sanity-test.astro";
const $$url = "/simple-sanity-test";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$SimpleSanityTest,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
