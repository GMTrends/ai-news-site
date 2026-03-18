import { r as renderers } from "./chunks/data-vendor_CAsGKFmz.mjs";
import { s as serverEntrypointModule } from "./chunks/_@astrojs-ssr-adapter_DYQ_v7bF.mjs";
import { manifest } from "./manifest_C3wmWbCT.mjs";
import "./_astro-internal_middleware.mjs";
import { createExports } from "@astrojs/netlify/ssr-function.js";
const _page0 = () => import("./pages/_image.astro.mjs");
const _page1 = () => import("./pages/admin/_---params_.astro.mjs");
const _page2 = () => import("./pages/404.astro.mjs");
const _page3 = () => import("./pages/about.astro.mjs");
const _page4 = () => import("./pages/ad-debug-test.astro.mjs");
const _page5 = () => import("./pages/admin/ad-config.astro.mjs");
const _page6 = () => import("./pages/admin/analytics.astro.mjs");
const _page7 = () => import("./pages/admin/articles/edit/_slug_.astro.mjs");
const _page8 = () => import("./pages/admin/articles.astro.mjs");
const _page9 = () => import("./pages/admin/authors/edit/_slug_.astro.mjs");
const _page10 = () => import("./pages/admin/authors.astro.mjs");
const _page11 = () => import("./pages/admin.astro.mjs");
const _page12 = () => import("./pages/advertise-with-us.astro.mjs");
const _page13 = () => import("./pages/affiliate-disclosure.astro.mjs");
const _page14 = () => import("./pages/ai-tools-comparison.astro.mjs");
const _page15 = () => import("./pages/api/analytics/authors.astro.mjs");
const _page16 = () => import("./pages/api/authors/_slug_.json.astro.mjs");
const _page17 = () => import("./pages/api/authors.json.astro.mjs");
const _page18 = () => import("./pages/api/contact.json.astro.mjs");
const _page19 = () => import("./pages/api/download.astro.mjs");
const _page20 = () => import("./pages/api/search-articles.json.astro.mjs");
const _page21 = () => import("./pages/api/security-check.json.astro.mjs");
const _page22 = () => import("./pages/api/subscribe.astro.mjs");
const _page23 = () => import("./pages/api/subscribe.json.astro.mjs");
const _page24 = () => import("./pages/api/upload/avatar.json.astro.mjs");
const _page25 = () => import("./pages/authors/_slug_.astro.mjs");
const _page26 = () => import("./pages/authors.astro.mjs");
const _page27 = () => import("./pages/blog.astro.mjs");
const _page28 = () => import("./pages/blog/_---slug_.astro.mjs");
const _page29 = () => import("./pages/categories/ai-agents.astro.mjs");
const _page30 = () => import("./pages/categories/business.astro.mjs");
const _page31 = () => import("./pages/categories/creative.astro.mjs");
const _page32 = () => import("./pages/categories/ecommerce.astro.mjs");
const _page33 = () => import("./pages/categories/marketing.astro.mjs");
const _page34 = () => import("./pages/categories/productivity.astro.mjs");
const _page35 = () => import("./pages/cms.astro.mjs");
const _page36 = () => import("./pages/contact.astro.mjs");
const _page37 = () => import("./pages/cookie-policy.astro.mjs");
const _page38 = () => import("./pages/disclaimers.astro.mjs");
const _page39 = () => import("./pages/faq.astro.mjs");
const _page40 = () => import("./pages/form-test.astro.mjs");
const _page41 = () => import("./pages/hero-mockup.astro.mjs");
const _page42 = () => import("./pages/hero-test.astro.mjs");
const _page43 = () => import("./pages/lead-magnets/_slug_.astro.mjs");
const _page44 = () => import("./pages/privacy-policy.astro.mjs");
const _page45 = () => import("./pages/rss.xml.astro.mjs");
const _page46 = () => import("./pages/sanity-test.astro.mjs");
const _page47 = () => import("./pages/simple-sanity-test.astro.mjs");
const _page48 = () => import("./pages/sitemap.xml.astro.mjs");
const _page49 = () => import("./pages/terms-of-service.astro.mjs");
const _page50 = () => import("./pages/test-category-static.astro.mjs");
const _page51 = () => import("./pages/test-marketing.astro.mjs");
const _page52 = () => import("./pages/test-sanity.astro.mjs");
const _page53 = () => import("./pages/_category_/_slug_.astro.mjs");
const _page54 = () => import("./pages/index.astro.mjs");
const pageMap = /* @__PURE__ */ new Map([
  ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
  ["node_modules/@sanity/astro/dist/studio/studio-route.astro", _page1],
  ["src/pages/404.astro", _page2],
  ["src/pages/about.astro", _page3],
  ["src/pages/ad-debug-test.astro", _page4],
  ["src/pages/admin/ad-config.astro", _page5],
  ["src/pages/admin/analytics.astro", _page6],
  ["src/pages/admin/articles/edit/[slug].astro", _page7],
  ["src/pages/admin/articles.astro", _page8],
  ["src/pages/admin/authors/edit/[slug].astro", _page9],
  ["src/pages/admin/authors.astro", _page10],
  ["src/pages/admin.astro", _page11],
  ["src/pages/advertise-with-us.astro", _page12],
  ["src/pages/affiliate-disclosure.astro", _page13],
  ["src/pages/ai-tools-comparison.astro", _page14],
  ["src/pages/api/analytics/authors.ts", _page15],
  ["src/pages/api/authors/[slug].json.ts", _page16],
  ["src/pages/api/authors/index.json.ts", _page17],
  ["src/pages/api/contact.json.ts", _page18],
  ["src/pages/api/download.ts", _page19],
  ["src/pages/api/search-articles.json.ts", _page20],
  ["src/pages/api/security-check.json.ts", _page21],
  ["src/pages/api/subscribe.ts", _page22],
  ["src/pages/api/subscribe.json.ts", _page23],
  ["src/pages/api/upload/avatar.json.ts", _page24],
  ["src/pages/authors/[slug].astro", _page25],
  ["src/pages/authors/index.astro", _page26],
  ["src/pages/blog/index.astro", _page27],
  ["src/pages/blog/[...slug].astro", _page28],
  ["src/pages/categories/ai-agents.astro", _page29],
  ["src/pages/categories/business.astro", _page30],
  ["src/pages/categories/creative.astro", _page31],
  ["src/pages/categories/ecommerce.astro", _page32],
  ["src/pages/categories/marketing.astro", _page33],
  ["src/pages/categories/productivity.astro", _page34],
  ["src/pages/cms.astro", _page35],
  ["src/pages/contact.astro", _page36],
  ["src/pages/cookie-policy.astro", _page37],
  ["src/pages/disclaimers.astro", _page38],
  ["src/pages/faq.astro", _page39],
  ["src/pages/form-test.astro", _page40],
  ["src/pages/hero-mockup.astro", _page41],
  ["src/pages/hero-test.astro", _page42],
  ["src/pages/lead-magnets/[slug].astro", _page43],
  ["src/pages/privacy-policy.astro", _page44],
  ["src/pages/rss.xml.js", _page45],
  ["src/pages/sanity-test.astro", _page46],
  ["src/pages/simple-sanity-test.astro", _page47],
  ["src/pages/sitemap.xml.ts", _page48],
  ["src/pages/terms-of-service.astro", _page49],
  ["src/pages/test-category-static.astro", _page50],
  ["src/pages/test-marketing.astro", _page51],
  ["src/pages/test-sanity.astro", _page52],
  ["src/pages/[category]/[slug].astro", _page53],
  ["src/pages/index.astro", _page54]
]);
const serverIslandMap = /* @__PURE__ */ new Map();
const _manifest = Object.assign(manifest, {
  pageMap,
  serverIslandMap,
  renderers,
  middleware: () => import("./_astro-internal_middleware.mjs")
});
const _args = void 0;
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = "start";
if (_start in serverEntrypointModule) {
  serverEntrypointModule[_start](_manifest, _args);
}
export {
  __astrojsSsrVirtualEntry as default,
  pageMap
};
