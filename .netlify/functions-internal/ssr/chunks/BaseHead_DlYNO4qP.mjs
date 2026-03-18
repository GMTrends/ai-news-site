import { d as createComponent, g as renderTemplate, h as defineScriptVars, e as addAttribute, m as maybeRenderHead, b as createAstro, f as renderComponent, u as unescapeHTML } from "./vendor_BQ-iwbOC.mjs";
import "kleur/colors";
import { S as SITE_TITLE } from "./consts_Dxuyllhi.mjs";
import "clsx";
const FallbackImage = new Proxy({ "src": "/_astro/blog-placeholder-1.Bx0Zcyzv.jpg", "width": 960, "height": 480, "format": "jpg" }, {
  get(target, name, receiver) {
    if (name === "clone") {
      return structuredClone(target);
    }
    if (name === "fsPath") {
      return "/workspaces/ai-news-site/src/assets/blog-placeholder-1.jpg";
    }
    return target[name];
  }
});
var __freeze$2 = Object.freeze;
var __defProp$2 = Object.defineProperty;
var __template$2 = (cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(cooked.slice()) }));
var _a$2;
const $$Analytics = createComponent(($$result, $$props, $$slots) => {
  const GA_MEASUREMENT_ID = "G-70SLYWY20D";
  return renderTemplate(_a$2 || (_a$2 = __template$2(["<!-- Google Analytics 4 --><script async", "><\/script> <script>(function(){", `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  
  // Enhanced GA4 Configuration
  gtag('config', GA_MEASUREMENT_ID, {
    // Demographics and Interest Reports
    allow_google_signals: true,
    allow_ad_personalization_signals: true,
    
    // Enhanced Measurement Events
    enhanced_measurement: {
      scrolls: true,              // Track 90% scroll depth
      outbound_clicks: true,      // Track external link clicks
      site_search: true,          // Track search usage
      video_engagement: true,     // Track video interactions
      file_downloads: true,       // Track PDF/file downloads
    },
    
    // Custom Parameters
    page_title: document.title,
    page_location: window.location.href,
    
    // User ID tracking (for logged-in users)
    user_id: null, // Set this if you have user accounts
    
    // Custom Dimensions (we'll use these for article tracking)
    custom_map: {
      'dimension1': 'article_category',
      'dimension2': 'article_author', 
      'dimension3': 'article_type'
    }
  });
  
  // Track page views automatically
  gtag('event', 'page_view', {
    page_title: document.title,
    page_location: window.location.href,
    content_group1: 'AI News Site',
    content_group2: document.querySelector('meta[name="article:section"]')?.content || 'Homepage'
  });
})();<\/script> <!-- Enhanced Event Tracking -->`])), addAttribute(`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`, "src"), defineScriptVars({ GA_MEASUREMENT_ID }));
}, "/workspaces/ai-news-site/src/components/Analytics.astro", void 0);
var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$TrackingPixels = createComponent(($$result, $$props, $$slots) => {
  const GOOGLE_ADS_ID = "YOUR_GOOGLE_ADS_ID";
  return renderTemplate(_a$1 || (_a$1 = __template$1(["<!-- Meta Pixel Code --> <!-- Meta Pixel NoScript -->", '<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=733228089122455&ev=PageView&noscript=1"></noscript><!-- Google Ads Conversion Tracking --><script async', "><\/script><script>(function(){", `
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', GOOGLE_ADS_ID);
  }
})();<\/script><!-- TikTok Pixel NoScript --><noscript><img height="1" width="1" style="display:none" src="https://analytics.tiktok.com/i18n/pixel/events/?sdkid=YOUR_TIKTOK_PIXEL_ID&type=PageView&event=PageView&noscript=1"></noscript><!-- Twitter Pixel NoScript --><noscript><img height="1" width="1" style="display:none" src="https://static.ads-twitter.com/uwt.js"></noscript><!-- Facebook Pixel - Manual Tracking (CSP-Free) --><!-- Manual Google Analytics (CSP-Free) -->`])), maybeRenderHead(), addAttribute(`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`, "src"), defineScriptVars({ GOOGLE_ADS_ID }));
}, "/workspaces/ai-news-site/src/components/TrackingPixels.astro", void 0);
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("http://localhost:4321");
const $$BaseHead = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseHead;
  const canonicalURL = new URL(Astro2.url.pathname, Astro2.site || "http://localhost:4321");
  const { title, description, image = FallbackImage, noindex = false } = Astro2.props;
  const GLOBAL_NOINDEX = false;
  const finalNoindex = noindex || GLOBAL_NOINDEX;
  const imageUrl = typeof image === "string" ? image : image.src;
  return renderTemplate(_a || (_a = __template([`<!-- Global Metadata --><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no"><meta name="format-detection" content="telephone=no"><meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"><meta name="theme-color" content="#00d4ff"><!-- PWA Manifest --><link rel="manifest" href="/manifest.json"><!-- PHASE 3: CSS Performance Optimization --><!-- CSS is now imported at the top of this file using Astro's CSS handling --><!-- DNS Prefetch for external domains --><link rel="dns-prefetch" href="//fonts.googleapis.com"><link rel="dns-prefetch" href="//fonts.gstatic.com"><link rel="dns-prefetch" href="//www.googletagmanager.com"><link rel="dns-prefetch" href="//www.google-analytics.com"><!-- Preconnect to external domains --><link rel="preconnect" href="https://fonts.googleapis.com" crossorigin><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="preconnect" href="https://www.googletagmanager.com" crossorigin><link rel="preconnect" href="https://www.google-analytics.com" crossorigin><!-- CSS files are now properly imported at the top of this component --><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="sitemap" href="/sitemap-index.xml"><link rel="alternate" type="application/rss+xml"`, "", '><meta name="generator"', "><!-- Font preloads - using @fontsource packages --><!-- Fonts are loaded via @fontsource packages in the imports above --><!-- SEO Meta Tags --><title>", '</title><meta name="description"', '><meta name="robots"', "><!-- Cache Control Meta Tags (Development) -->", '<!-- Open Graph --><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:site_name"', '><meta property="og:image"', '><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt"', '><!-- Twitter Card --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"', '><meta property="twitter:title"', '><meta property="twitter:description"', '><meta property="twitter:image"', '><!-- Canonical URL --><link rel="canonical"', '><!-- Structured Data --><script type="application/ld+json">', '<\/script><!-- Performance Monitoring --><!-- Unified Newsletter System --><script src="/src/utils/newsletterManager.ts" type="module"><\/script>', "", ""])), addAttribute(SITE_TITLE, "title"), addAttribute(new URL("rss.xml", Astro2.site || "http://localhost:4321"), "href"), addAttribute(Astro2.generator, "content"), title, addAttribute(description, "content"), addAttribute(finalNoindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1", "content"), false, addAttribute(canonicalURL, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(SITE_TITLE, "content"), addAttribute(new URL(imageUrl, Astro2.site || "http://localhost:4321"), "content"), addAttribute(title, "content"), addAttribute(canonicalURL, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(new URL(imageUrl, Astro2.site || "http://localhost:4321"), "content"), addAttribute(canonicalURL, "href"), unescapeHTML(JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_TITLE,
    "url": Astro2.site || "http://localhost:4321",
    "description": "Latest AI news, reviews, and insights from industry experts",
    "publisher": {
      "@type": "Organization",
      "name": "AI Buzz Media",
      "url": Astro2.site || "http://localhost:4321",
      "logo": {
        "@type": "ImageObject",
        "url": `${Astro2.site || "http://localhost:4321"}/logo.png`,
        "width": 512,
        "height": 512
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${Astro2.site || "http://localhost:4321"}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  })), renderComponent($$result, "Analytics", $$Analytics, {}), renderComponent($$result, "TrackingPixels", $$TrackingPixels, {}));
}, "/workspaces/ai-news-site/src/components/BaseHead.astro", void 0);
export {
  $$BaseHead as $,
  $$TrackingPixels as a,
  $$Analytics as b
};
