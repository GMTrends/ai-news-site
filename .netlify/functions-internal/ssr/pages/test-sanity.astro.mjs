import { d as createComponent, r as renderHead, e as addAttribute, g as renderTemplate } from "../chunks/vendor_BQ-iwbOC.mjs";
import "kleur/colors";
import "clsx";
import { s as sanityClient } from "../chunks/data-vendor_CAsGKFmz.mjs";
import { r } from "../chunks/data-vendor_CAsGKFmz.mjs";
/* empty css                                       */
const $$TestSanity = createComponent(async ($$result, $$props, $$slots) => {
  let sanityStatus = "Unknown";
  let testData = null;
  let errorMessage = null;
  try {
    const result = await sanityClient.fetch(`*[_type == "article"][0..2] {
    _id,
    title,
    "slug": slug.current,
    heroImage {
      asset->
    }
  }`);
    sanityStatus = "Connected ✅";
    testData = result;
  } catch (error) {
    sanityStatus = "Failed ❌";
    errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Sanity connection test failed:", error);
  }
  return renderTemplate`<html lang="en" data-astro-cid-fyxbasdl> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Sanity Connection Test</title>${renderHead()}</head> <body data-astro-cid-fyxbasdl> <div class="container" data-astro-cid-fyxbasdl> <h1 data-astro-cid-fyxbasdl>🧪 Sanity Connection Test</h1> <div${addAttribute(`status-box ${sanityStatus.includes("✅") ? "success" : "error"}`, "class")} data-astro-cid-fyxbasdl> <h2 data-astro-cid-fyxbasdl>Connection Status: ${sanityStatus}</h2> ${errorMessage && renderTemplate`<div data-astro-cid-fyxbasdl> <strong data-astro-cid-fyxbasdl>Error:</strong> ${errorMessage} </div>`} </div> <div class="status-box" data-astro-cid-fyxbasdl> <h2 data-astro-cid-fyxbasdl>Environment Variables</h2> <div class="env-var" data-astro-cid-fyxbasdl>PROJECT_ID: ${"NOT SET"}</div> <div class="env-var" data-astro-cid-fyxbasdl>DATASET: ${"NOT SET"}</div> <div class="env-var" data-astro-cid-fyxbasdl>API_VERSION: ${"NOT SET"}</div> <div class="env-var" data-astro-cid-fyxbasdl>USE_CDN: ${"NOT SET"}</div> </div> ${testData && renderTemplate`<div class="status-box" data-astro-cid-fyxbasdl> <h2 data-astro-cid-fyxbasdl>Sample Data (First 3 Articles)</h2> <div class="data-preview" data-astro-cid-fyxbasdl>${JSON.stringify(testData, null, 2)}</div> </div>`} <div class="status-box" data-astro-cid-fyxbasdl> <h2 data-astro-cid-fyxbasdl>Next Steps</h2> <ul data-astro-cid-fyxbasdl> <li data-astro-cid-fyxbasdl>If connection failed, check your Sanity project settings</li> <li data-astro-cid-fyxbasdl>Verify the project ID matches your Sanity dashboard</li> <li data-astro-cid-fyxbasdl>Ensure your dataset exists and has published content</li> <li data-astro-cid-fyxbasdl>Check if your Sanity project allows public read access</li> </ul> </div> <p data-astro-cid-fyxbasdl><a href="/categories/marketing" style="color: #4f46e5;" data-astro-cid-fyxbasdl>← Back to Marketing Category</a></p> </div> </body></html>`;
}, "/workspaces/ai-news-site/src/pages/test-sanity.astro", void 0);
const $$file = "/workspaces/ai-news-site/src/pages/test-sanity.astro";
const $$url = "/test-sanity";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$TestSanity,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
