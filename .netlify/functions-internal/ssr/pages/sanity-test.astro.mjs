import { b as createAstro, d as createComponent, m as maybeRenderHead, e as addAttribute, g as renderTemplate, f as renderComponent } from "../chunks/vendor_BQ-iwbOC.mjs";
import "kleur/colors";
import { $ as $$MainLayout } from "../chunks/MainLayout_DdYH-KlJ.mjs";
import "clsx";
/* empty css                                       */
import { $ as $$UniversalAd } from "../chunks/UniversalAd_P2YSsr8t.mjs";
import { r } from "../chunks/data-vendor_CAsGKFmz.mjs";
const $$Astro = createAstro("http://localhost:4321");
const $$SanityIntegrationTest = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SanityIntegrationTest;
  const { placement = "test", className = "" } = Astro2.props;
  let sanityStatus = "testing";
  let ads = [];
  let allAds = [];
  let error = null;
  let mappingValidation = { success: false, errors: [], warnings: [] };
  try {
    const { HybridAdManager, SanityAdManager } = await import("../chunks/sanityAds_B8vG8Qpv.mjs");
    try {
      ads = await HybridAdManager.getAdsByPlacement(placement);
      sanityStatus = ads.length > 0 ? "connected" : "no-ads";
    } catch (placementErr) {
      console.warn("Placement fetch failed:", placementErr);
      sanityStatus = "error";
      error = placementErr instanceof Error ? placementErr.message : "Placement fetch failed";
    }
    try {
      const isAvailable = await SanityAdManager.isAvailable();
      if (isAvailable) {
        allAds = await SanityAdManager.getAllAds();
        mappingValidation = validateAdMapping(allAds);
      } else {
        mappingValidation.warnings.push("Sanity client not available - using local fallback");
      }
    } catch (sanityErr) {
      console.warn("Sanity integration test failed:", sanityErr);
      mappingValidation.errors.push(`Sanity integration error: ${sanityErr instanceof Error ? sanityErr.message : "Unknown error"}`);
    }
  } catch (importErr) {
    console.error("Failed to import Sanity utilities:", importErr);
    error = "Failed to load Sanity integration modules";
    sanityStatus = "error";
  }
  function validateAdMapping(ads2) {
    const validation = { success: true, errors: [], warnings: [] };
    const requiredFields = ["id", "type", "placement", "active", "priority", "title", "description", "cta", "ctaUrl"];
    const objectFields = ["dimensions", "targeting", "styling", "analytics", "revenue"];
    ads2.forEach((ad, index) => {
      requiredFields.forEach((field) => {
        if (!ad[field] && ad[field] !== false && ad[field] !== 0) {
          validation.errors.push(`Ad ${index + 1} (${ad.id || "unknown"}): Missing required field '${field}'`);
          validation.success = false;
        }
      });
      objectFields.forEach((field) => {
        if (!ad[field] || typeof ad[field] !== "object") {
          validation.errors.push(`Ad ${index + 1} (${ad.id || "unknown"}): Missing or invalid object field '${field}'`);
          validation.success = false;
        }
      });
      if (ad.dimensions && (!ad.dimensions.width || !ad.dimensions.height)) {
        validation.errors.push(`Ad ${index + 1} (${ad.id || "unknown"}): Invalid dimensions structure`);
        validation.success = false;
      }
      if (ad.styling && ad.styling.colors && (!ad.styling.colors.primary || !ad.styling.colors.secondary)) {
        validation.errors.push(`Ad ${index + 1} (${ad.id || "unknown"}): Invalid styling colors structure`);
        validation.success = false;
      }
      if (ad.analytics && (!ad.analytics.trackingId || !ad.analytics.eventCategory || !ad.analytics.eventAction)) {
        validation.errors.push(`Ad ${index + 1} (${ad.id || "unknown"}): Invalid analytics structure`);
        validation.success = false;
      }
      if (!ad.badge && !ad.icon) {
        validation.warnings.push(`Ad ${index + 1} (${ad.id || "unknown"}): No badge or icon specified`);
      }
      if (ad.ctaUrl === "#") {
        validation.warnings.push(`Ad ${index + 1} (${ad.id || "unknown"}): CTA URL is placeholder '#'`);
      }
    });
    return validation;
  }
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`sanity-test-container ${className}`, "class")} data-astro-cid-yowywthp> <div class="test-header" data-astro-cid-yowywthp> <h3 data-astro-cid-yowywthp>🔗 Sanity CMS Integration Test</h3> <div${addAttribute(`status-indicator status-${sanityStatus}`, "class")} data-astro-cid-yowywthp> ${sanityStatus === "connected" && "✅ Connected"} ${sanityStatus === "no-ads" && "⚠️ Connected (No Ads)"} ${sanityStatus === "error" && "❌ Error"} ${sanityStatus === "unknown" && "❓ Unknown"} </div> </div> <div class="test-details" data-astro-cid-yowywthp> <div class="detail-section" data-astro-cid-yowywthp> <h4 data-astro-cid-yowywthp>Placement Test: "${placement}"</h4> <p data-astro-cid-yowywthp>Found ${ads.length} ads for this placement</p> ${ads.length > 0 && renderTemplate`<ul class="ads-list" data-astro-cid-yowywthp> ${ads.map((ad) => renderTemplate`<li data-astro-cid-yowywthp> <strong data-astro-cid-yowywthp>${ad.title}</strong> - ${ad.type} (${ad.placement})
${ad.active ? " ✅" : " ❌"} </li>`)} </ul>`} </div> <div class="detail-section" data-astro-cid-yowywthp> <h4 data-astro-cid-yowywthp>All Ads from Sanity</h4> <p data-astro-cid-yowywthp>Total ads in Sanity: ${allAds.length}</p> ${allAds.length > 0 && renderTemplate`<ul class="ads-list" data-astro-cid-yowywthp> ${allAds.slice(0, 5).map((ad) => renderTemplate`<li data-astro-cid-yowywthp> <strong data-astro-cid-yowywthp>${ad.title}</strong> - ${ad.type} ${ad.active ? " ✅" : " ❌"} </li>`)} ${allAds.length > 5 && renderTemplate`<li data-astro-cid-yowywthp>... and ${allAds.length - 5} more</li>`} </ul>`} </div> <div class="detail-section" data-astro-cid-yowywthp> <h4 data-astro-cid-yowywthp>🔄 Sanity → UniversalAd Mapping Validation</h4> <div class="mapping-status" data-astro-cid-yowywthp> ${mappingValidation.success ? renderTemplate`<div class="success-indicator" data-astro-cid-yowywthp>✅ All Sanity data properly mapped to UniversalAd props</div>` : renderTemplate`<div class="error-indicator" data-astro-cid-yowywthp>❌ Mapping issues detected</div>`} </div> ${mappingValidation.errors.length > 0 && renderTemplate`<div class="validation-errors" data-astro-cid-yowywthp> <h5 data-astro-cid-yowywthp>🚨 Mapping Errors:</h5> <ul data-astro-cid-yowywthp> ${mappingValidation.errors.map((error2) => renderTemplate`<li class="error-item" data-astro-cid-yowywthp>${error2}</li>`)} </ul> </div>`} ${mappingValidation.warnings.length > 0 && renderTemplate`<div class="validation-warnings" data-astro-cid-yowywthp> <h5 data-astro-cid-yowywthp>⚠️ Mapping Warnings:</h5> <ul data-astro-cid-yowywthp> ${mappingValidation.warnings.map((warning) => renderTemplate`<li class="warning-item" data-astro-cid-yowywthp>${warning}</li>`)} </ul> </div>`} ${mappingValidation.success && mappingValidation.errors.length === 0 && renderTemplate`<div class="mapping-details" data-astro-cid-yowywthp> <p data-astro-cid-yowywthp><strong data-astro-cid-yowywthp>✅ Validation Summary:</strong></p> <ul data-astro-cid-yowywthp> <li data-astro-cid-yowywthp>All required fields present and valid</li> <li data-astro-cid-yowywthp>Object structures (dimensions, styling, analytics) properly mapped</li> <li data-astro-cid-yowywthp>Type-specific defaults applied correctly</li> <li data-astro-cid-yowywthp>Enhanced error handling and fallbacks active</li> <li data-astro-cid-yowywthp>Ready for production use with UniversalAd component</li> </ul> </div>`} </div> ${error && renderTemplate`<div class="error-section" data-astro-cid-yowywthp> <h4 data-astro-cid-yowywthp>❌ Error Details</h4> <pre data-astro-cid-yowywthp>${error}</pre> </div>`} <div class="env-section" data-astro-cid-yowywthp> <h4 data-astro-cid-yowywthp>Environment Variables</h4> <ul data-astro-cid-yowywthp> <li data-astro-cid-yowywthp>Project ID: ${"Not set"}</li> <li data-astro-cid-yowywthp>Dataset: ${"Not set"}</li> <li data-astro-cid-yowywthp>Use CDN: ${"Not set"}</li> <li data-astro-cid-yowywthp>API Version: ${"Not set"}</li> <li data-astro-cid-yowywthp>Token: ${"❌ Not set"}</li> </ul> </div> </div> </div> `;
}, "/workspaces/ai-news-site/src/components/SanityIntegrationTest.astro", void 0);
const $$SanityTest = createComponent(($$result, $$props, $$slots) => {
  const title = "Sanity CMS Integration Test";
  const description = "Testing Sanity CMS integration for dynamic partner content management";
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": title, "description": description, "data-astro-cid-menc4j2u": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="test-page" data-astro-cid-menc4j2u> <div class="container" data-astro-cid-menc4j2u> <header class="page-header" data-astro-cid-menc4j2u> <h1 data-astro-cid-menc4j2u>🔗 Sanity CMS Integration Test</h1> <p data-astro-cid-menc4j2u>This page tests the integration between our AI News Site and Sanity CMS for dynamic partner content management.</p> </header> <!-- Integration Status Test --> <section class="test-section" data-astro-cid-menc4j2u> <h2 data-astro-cid-menc4j2u>📊 Integration Status</h2> ${renderComponent($$result2, "SanityIntegrationTest", $$SanityIntegrationTest, { "placement": "sidebar-premium-spotlight", "data-astro-cid-menc4j2u": true })} </section> <!-- Live Ad Rendering Test --> <section class="test-section" data-astro-cid-menc4j2u> <h2 data-astro-cid-menc4j2u>🎯 Live Partner Content Rendering</h2> <p data-astro-cid-menc4j2u>Testing UniversalAd components with Sanity CMS integration:</p> <div class="ad-test-grid" data-astro-cid-menc4j2u> <div class="ad-test-item" data-astro-cid-menc4j2u> <h3 data-astro-cid-menc4j2u>Sidebar Premium Spotlight</h3> ${renderComponent($$result2, "UniversalAd", $$UniversalAd, { "adId": "sidebar-premium-spotlight", "data-astro-cid-menc4j2u": true })} </div> <div class="ad-test-item" data-astro-cid-menc4j2u> <h3 data-astro-cid-menc4j2u>Hero Premium Top</h3> ${renderComponent($$result2, "UniversalAd", $$UniversalAd, { "adId": "hero-premium-top", "data-astro-cid-menc4j2u": true })} </div> <div class="ad-test-item" data-astro-cid-menc4j2u> <h3 data-astro-cid-menc4j2u>Leaderboard Main</h3> ${renderComponent($$result2, "UniversalAd", $$UniversalAd, { "adId": "leaderboard-main", "data-astro-cid-menc4j2u": true })} </div> </div> </section> <!-- Placement Tests --> <section class="test-section" data-astro-cid-menc4j2u> <h2 data-astro-cid-menc4j2u>📍 Placement-Specific Tests</h2> <div class="placement-tests" data-astro-cid-menc4j2u> ${renderComponent($$result2, "SanityIntegrationTest", $$SanityIntegrationTest, { "placement": "hero-sidebar-top", "className": "placement-test", "data-astro-cid-menc4j2u": true })} ${renderComponent($$result2, "SanityIntegrationTest", $$SanityIntegrationTest, { "placement": "article-sidebar", "className": "placement-test", "data-astro-cid-menc4j2u": true })} ${renderComponent($$result2, "SanityIntegrationTest", $$SanityIntegrationTest, { "placement": "category-sidebar", "className": "placement-test", "data-astro-cid-menc4j2u": true })} </div> </section> <!-- Integration Guide --> <section class="test-section" data-astro-cid-menc4j2u> <h2 data-astro-cid-menc4j2u>📖 Integration Guide</h2> <div class="guide-content" data-astro-cid-menc4j2u> <div class="guide-step" data-astro-cid-menc4j2u> <h3 data-astro-cid-menc4j2u>Step 1: Environment Variables</h3> <p data-astro-cid-menc4j2u>Ensure the following environment variables are set in your <code data-astro-cid-menc4j2u>.env</code> file:</p> <pre data-astro-cid-menc4j2u><code data-astro-cid-menc4j2u>VITE_SANITY_PROJECT_ID=crtekmb2
VITE_SANITY_DATASET=production
VITE_SANITY_USE_CDN=true
VITE_SANITY_API_VERSION=2024-01-01
VITE_SANITY_TOKEN=your-token-here</code></pre> </div> <div class="guide-step" data-astro-cid-menc4j2u> <h3 data-astro-cid-menc4j2u>Step 2: Sanity Studio Setup</h3> <p data-astro-cid-menc4j2u>Run the following commands to set up Sanity Studio:</p> <pre data-astro-cid-menc4j2u><code data-astro-cid-menc4j2u>npm run sanity:dev</code></pre> <p data-astro-cid-menc4j2u>This will start Sanity Studio at <code data-astro-cid-menc4j2u>http://localhost:3333</code></p> </div> <div class="guide-step" data-astro-cid-menc4j2u> <h3 data-astro-cid-menc4j2u>Step 3: Create Partner Content</h3> <p data-astro-cid-menc4j2u>In Sanity Studio, navigate to "💰 Partner Content" → "Ads" and create your first ad with:</p> <ul data-astro-cid-menc4j2u> <li data-astro-cid-menc4j2u>ID matching your adId (e.g., "sidebar-premium-spotlight")</li> <li data-astro-cid-menc4j2u>Active status set to true</li> <li data-astro-cid-menc4j2u>Appropriate placement and type</li> </ul> </div> <div class="guide-step" data-astro-cid-menc4j2u> <h3 data-astro-cid-menc4j2u>Step 4: Test Integration</h3> <p data-astro-cid-menc4j2u>Refresh this page to see your Sanity content rendered dynamically!</p> </div> </div> </section> </div> </main> ` })} `;
}, "/workspaces/ai-news-site/src/pages/sanity-test.astro", void 0);
const $$file = "/workspaces/ai-news-site/src/pages/sanity-test.astro";
const $$url = "/sanity-test";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$SanityTest,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
