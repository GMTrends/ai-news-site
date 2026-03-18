import { b as createAstro, d as createComponent, g as renderTemplate, h as defineScriptVars, u as unescapeHTML, m as maybeRenderHead, e as addAttribute, f as renderComponent, l as spreadAttributes, F as Fragment } from "../chunks/vendor_BQ-iwbOC.mjs";
import "kleur/colors";
import { $ as $$MainLayout } from "../chunks/MainLayout_DdYH-KlJ.mjs";
import { d as getFeaturedArticles, h as calculateReadTime, b as getArticlesByCategory } from "../chunks/data-vendor_CAsGKFmz.mjs";
import { r } from "../chunks/data-vendor_CAsGKFmz.mjs";
import "clsx";
import { AdManager } from "../chunks/adConfig_CXa8_-6N.mjs";
import { HybridAdManager } from "../chunks/sanityAds_B8vG8Qpv.mjs";
/* empty css                                 */
import "../chunks/HeroRedesigned_B1RbDut7.mjs";
import { H as HOMEPAGE_CATEGORIES } from "../chunks/consts_Dxuyllhi.mjs";
function generateWebPUrl(imageUrl, width = 1200, height, options = {}) {
  const baseUrl = imageUrl.startsWith("http") ? imageUrl : `${"http://localhost:4321"}${imageUrl}`;
  if (baseUrl.includes("?") || baseUrl.includes("fm=")) {
    return baseUrl;
  }
  const params = new URLSearchParams();
  params.set("w", width.toString());
  if (height) params.set("h", height.toString());
  params.set("q", (options.quality || 85).toString());
  params.set("fm", options.format || "webp");
  if (options.fit) params.set("fit", options.fit);
  if (options.position) params.set("position", options.position);
  params.set("auto", "format,compress");
  params.set("fit", "max");
  return `${baseUrl}?${params.toString()}`;
}
function generateResponsiveSrcSet(imageUrl, sizes = [400, 800, 1200, 1600], options = {}) {
  return sizes.map((size) => {
    const optimizedUrl = generateWebPUrl(imageUrl, size, void 0, options);
    return `${optimizedUrl} ${size}w`;
  }).join(", ");
}
function generateHeroImage(imageUrl, alt, width = 1200, height = 630, options = {}) {
  return {
    src: generateWebPUrl(imageUrl, width, height, options),
    srcset: generateResponsiveSrcSet(imageUrl, [800, 1200, 1600], options),
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px",
    width: width.toString(),
    height: height.toString(),
    loading: "eager",
    fetchpriority: "high",
    decoding: "async",
    alt
  };
}
function generateThumbnail(imageUrl, alt, width = 400, height = 250, options = {}) {
  return {
    src: generateWebPUrl(imageUrl, width, height, { ...options, fit: "cover" }),
    srcset: generateResponsiveSrcSet(imageUrl, [300, 400, 600], { ...options, fit: "cover" }),
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px",
    loading: "lazy",
    decoding: "async",
    alt
  };
}
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$2 = createAstro("http://localhost:4321");
const $$UniversalPromo = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$UniversalPromo;
  const { adId, adConfig, className = "" } = Astro2.props;
  let ad = adConfig;
  if (!ad) {
    try {
      ad = await HybridAdManager.getAdById(adId);
      if (!ad) {
        ad = AdManager.getAdById(adId);
      }
      if (!ad) {
        const adIdParts = adId.split("-");
        let baseAdId = adId;
        let categorySlugFromId = "";
        if (adIdParts.length > 1 && adIdParts[adIdParts.length - 1].length > 0) {
          const lastPart = adIdParts[adIdParts.length - 1];
          if (isNaN(parseInt(lastPart)) && lastPart.match(/^[a-z0-9-]+$/)) {
            categorySlugFromId = lastPart;
            baseAdId = adIdParts.slice(0, adIdParts.length - 1).join("-");
          }
        }
        const categoryName = categorySlugFromId ? categorySlugFromId.replace(/-/g, " ").split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ") : "AI";
        const fallbackTemplates = {
          "sidebar-premium-spotlight": {
            title: `Premium AI Tools for ${categoryName}`,
            description: `Discover top-rated AI solutions tailored for ${categoryName} professionals.`,
            icon: "✨",
            badge: "FEATURED"
          },
          "sidebar-newsletter-promo": {
            title: `AI Innovation Weekly`,
            description: `Exclusive insights, cutting-edge tools, and expert strategies delivered to your inbox every week.`,
            icon: "🚀",
            badge: "PREMIUM"
          },
          "sidebar-trending-news": {
            title: `Trending ${categoryName} AI News`,
            description: `Don't miss out on the latest breakthroughs and trends in ${categoryName} AI.`,
            icon: "📰",
            badge: "HOT"
          },
          "hero-premium-top": {
            title: "Boost Your AI Workflow",
            description: "Premium flexible hero ad - responsive width, optimized for sidebar integration",
            icon: "⚡",
            badge: "FEATURED"
          },
          "leaderboard-main": {
            title: "Supercharge Your AI Journey",
            description: "Discover premium AI tools that successful entrepreneurs use to scale their businesses",
            icon: "⭐",
            badge: "PREMIUM"
          },
          "default": {
            title: "Explore AI Innovations",
            description: "Find the best AI tools and insights for your needs.",
            icon: "💡",
            badge: "NEW"
          }
        };
        const content = fallbackTemplates[baseAdId] || fallbackTemplates.default;
        ad = {
          id: adId,
          type: adId.includes("leaderboard") ? "leaderboard" : adId.includes("hero") ? "hero" : "sidebar",
          placement: "fallback",
          active: true,
          priority: 999,
          title: content.title,
          description: content.description,
          cta: "Learn More",
          ctaUrl: "#",
          badge: content.badge,
          icon: content.icon,
          dimensions: { width: 300, height: 180 },
          // Default dimensions for fallback
          styling: {
            theme: "gradient",
            colors: { primary: "#00c4ef", secondary: "#0056ef" }
          },
          analytics: {
            trackingId: `fallback-${adId}`,
            eventCategory: "ads",
            eventAction: "click"
          },
          revenue: { cpm: 0, estimatedMonthlyRevenue: 0, adNetwork: "fallback" }
        };
      }
    } catch (error) {
      console.error(`UniversalPromo: Error loading ad '${adId}':`, error);
      try {
        const { AdManager: AdManager2 } = await import("../chunks/adConfig_CXa8_-6N.mjs");
        ad = AdManager2.getAdById(adId);
      } catch (localError) {
        console.error(`UniversalPromo: Local config fallback also failed:`, localError);
      }
      if (!ad) {
        ad = {
          id: adId,
          type: "sidebar",
          placement: "fallback",
          active: true,
          priority: 999,
          title: "AI Tools Discovery",
          description: "Explore cutting-edge AI solutions handpicked for entrepreneurs",
          cta: "Discover Tools",
          ctaUrl: "/ai-tools",
          icon: "🤖",
          dimensions: { width: 300, height: 180 },
          targeting: {},
          styling: {
            theme: "gradient",
            colors: {
              primary: "#00c4ef",
              secondary: "#0056ef"
            },
            animation: "none"
          },
          analytics: {
            trackingId: adId,
            eventCategory: "ai_tools_discovery",
            eventAction: "click"
          },
          revenue: {
            cpm: 0,
            estimatedMonthlyRevenue: 0,
            adNetwork: "internal"
          }
        };
      }
    }
  }
  if (!ad || !ad.active) {
    console.error(`UniversalPromo: Critical error - no ad available for '${adId}'`);
    return null;
  }
  const getAdStyles = (ad2) => {
    const { styling, dimensions } = ad2;
    let backgroundStyle = "";
    if (styling.theme === "gradient") {
      backgroundStyle = `linear-gradient(135deg, ${styling.colors.primary} 0%, ${styling.colors.secondary} 100%)`;
    } else if (styling.theme === "solid") {
      backgroundStyle = styling.colors.primary;
    }
    return {
      background: backgroundStyle,
      width: `${dimensions.width}px`,
      height: `${dimensions.height}px`,
      maxWidth: "100%"
    };
  };
  const adStyles = getAdStyles(ad);
  ad.type === "leaderboard";
  ad.type === "sidebar";
  ad.type === "hero";
  const trackingCode = `
  function trackPromoClick_${ad.id.replace(/-/g, "_")}() {
    if (typeof gtag !== 'undefined') {
      gtag('event', '${ad.analytics.eventAction}', {
        'event_category': '${ad.analytics.eventCategory}',
        'event_label': '${ad.id}',
        'custom_parameter_1': '${ad.placement}',
        'custom_parameter_2': '${ad.type}'
      });
    }
    

  }
`;
  return renderTemplate(_a || (_a = __template(["<!-- UniversalPromo Component - CSS ISOLATED to prevent parent layout bleeding -->", "<!-- JavaScript for Analytics Tracking --><script>", "<\/script><script>(function(){", "\n  // Inject the tracking function\n  eval(trackingCode);\n})();<\/script>"])), ad && renderTemplate`${maybeRenderHead()}<div class="universal-ad-isolator" style="isolation: isolate !important; display: block !important; position: relative !important; background: linear-gradient(135deg,rgba(0,212,255,0.03) 0%,rgba(0,102,255,0.03) 100%) !important; border-radius: 0 !important;"><div${addAttribute(`universal-promo promo-${ad.type} promo-${ad.id} ${className}`, "class")}${addAttribute(ad.id, "data-promo-id")}>${ad.type === "sidebar" && ad.id !== "hero-premium-top" && renderTemplate`<a${addAttribute(ad.ctaUrl, "href")} class="sidebar-promo"${addAttribute(`trackPromoClick_${ad.id.replace(/-/g, "_")}()`, "onclick")} target="_blank" rel="noopener noreferrer"${addAttribute(`background: ${adStyles.background}; width: ${adStyles.width}; height: ${adStyles.height};`, "style")}>${ad.badge && renderTemplate`<span class="promo-badge">${ad.badge}</span>`}<div class="promo-content">${ad.icon && renderTemplate`<div class="promo-icon"><span class="icon-emoji">${ad.icon}</span></div>`}<h3 class="promo-title gradient-text">${ad.title}</h3><p class="promo-description">${ad.description}</p><span class="promo-cta">${ad.cta}</span></div></a>`}${ad.type === "leaderboard" && renderTemplate`<div class="leaderboard-promo-container"><a${addAttribute(ad.ctaUrl, "href")} class="leaderboard-promo-link"${addAttribute(`trackPromoClick_${ad.id.replace(/-/g, "_")}()`, "onclick")} target="_blank" rel="noopener noreferrer"><div class="leaderboard-floating-icon">${ad.icon && renderTemplate`<div class="leaderboard-icon-wrapper"><span class="leaderboard-icon-emoji">${ad.icon}</span><div class="leaderboard-icon-halo"></div></div>`}</div><div class="leaderboard-content">${ad.badge && renderTemplate`<div class="leaderboard-badge-wrapper"><span class="leaderboard-premium-badge">${ad.badge}</span></div>`}<h3 class="leaderboard-title">${ad.title}</h3><p class="leaderboard-description">${ad.description}</p></div><div class="leaderboard-cta-section"><span class="leaderboard-cta-button"><span class="leaderboard-cta-text">${ad.cta}</span><div class="leaderboard-cta-shine"></div></span></div><div class="leaderboard-particles"><div class="leaderboard-particle leaderboard-particle-1"></div><div class="leaderboard-particle leaderboard-particle-2"></div><div class="leaderboard-particle leaderboard-particle-3"></div></div></a></div>`}${(ad.type === "hero" || ad.id === "hero-premium-top") && renderTemplate`<div class="premium-hero-promo-container"><div class="premium-hero-promo-content-wrapper"><div class="premium-hero-promo-inner"><div class="premium-icon-section">${ad.icon && renderTemplate`<div class="premium-icon-wrapper"><span class="premium-icon-emoji">${ad.icon}</span><div class="premium-icon-glow"></div></div>`}</div><div class="premium-content-section">${ad.badge && renderTemplate`<div class="premium-badge-wrapper"><span class="premium-badge">${ad.badge}</span></div>`}<h3 class="premium-title">${ad.title}</h3><p class="premium-description">${ad.description}</p><a${addAttribute(ad.ctaUrl, "href")} class="premium-cta-button"${addAttribute(`trackPromoClick_${ad.id.replace(/-/g, "_")}()`, "onclick")} target="_blank" rel="noopener noreferrer"><span class="premium-cta-text">${ad.cta}</span><svg class="premium-cta-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></a></div></div><div class="premium-hero-promo-shine"></div></div></div>`}</div></div>`, unescapeHTML(trackingCode), defineScriptVars({ trackingCode }));
}, "/workspaces/ai-news-site/src/components/UniversalPromo.astro", void 0);
const $$Hero = createComponent(async ($$result, $$props, $$slots) => {
  const allFeaturedArticles = await getFeaturedArticles(12);
  function hasTags(article, tags) {
    if (!article.tags) return false;
    return tags.every((tag) => article.tags.includes(tag));
  }
  function isRecent(article, days = 30) {
    if (!article.publishedAt) return false;
    const published = new Date(article.publishedAt);
    const now = /* @__PURE__ */ new Date();
    const diff = (now.getTime() - published.getTime()) / (1e3 * 60 * 60 * 24);
    return diff <= days;
  }
  function sortByDateDesc(articles) {
    return articles.slice().sort((a, b) => {
      const dateA = new Date(a.publishedAt).getTime();
      const dateB = new Date(b.publishedAt).getTime();
      return dateB - dateA;
    });
  }
  function selectBestByHeroFields(articles, heroPlacement, revenuePotential, contentType, priorityValue) {
    let matches = articles.filter((a) => a.heroPlacement === heroPlacement);
    if (priorityValue) matches = matches.filter((a) => a.priority === priorityValue);
    if (revenuePotential) matches = matches.filter((a) => a.revenuePotential === revenuePotential);
    if (contentType) matches = matches.filter((a) => a.contentType === contentType);
    if (matches.length === 0) return null;
    const recent = matches.filter((a) => isRecent(a, 30));
    if (recent.length > 0) {
      return sortByDateDesc(recent)[0];
    }
    return sortByDateDesc(matches)[0];
  }
  function selectMainArticle(articles) {
    let main = selectBestByHeroFields(articles, "large", "high-affiliate", "tool-review", "high");
    if (main) return main;
    main = selectBestByHeroFields(articles, "large", "high-affiliate", void 0, "high");
    if (main) return main;
    main = selectBestByHeroFields(articles, "large", void 0, void 0, "high");
    if (main) return main;
    main = selectBestByHeroFields(articles, "large", "high-affiliate", "tool-review", "normal");
    if (main) return main;
    main = selectBestByHeroFields(articles, "large", "high-affiliate", void 0, "normal");
    if (main) return main;
    main = selectBestByHeroFields(articles, "large", void 0, void 0, "normal");
    if (main) return main;
    main = articles.filter((a) => a.heroPlacement === "small").sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())[0];
    return main;
  }
  function selectSmallArticles(articles, mainArticle2) {
    let pool = articles.filter((a) => a._id !== mainArticle2?._id);
    let smalls = pool.filter((a) => hasTags(a, ["featured-hero-small"]));
    const typeTags = ["tool-review", "comparison", "tutorial", "breaking-news"];
    let selected = [];
    let usedIds = /* @__PURE__ */ new Set();
    for (let tag of typeTags) {
      let candidates = smalls.filter((a) => hasTags(a, [tag]) && !usedIds.has(a._id));
      let best = null;
      if (candidates.length > 0) {
        const recent = candidates.filter((a) => isRecent(a, 30));
        if (recent.length > 0) {
          best = sortByDateDesc(recent)[0];
        } else {
          best = sortByDateDesc(candidates)[0];
        }
      }
      if (best) {
        selected.push(best);
        usedIds.add(best._id);
      }
      if (selected.length === 4) break;
    }
    if (selected.length < 4) {
      let remaining = smalls.filter((a) => !usedIds.has(a._id));
      let sorted = sortByDateDesc([
        ...remaining.filter((a) => isRecent(a, 30)),
        ...remaining.filter((a) => !isRecent(a, 30))
      ]);
      for (let a of sorted) {
        if (!usedIds.has(a._id)) {
          selected.push(a);
          usedIds.add(a._id);
          if (selected.length === 4) break;
        }
      }
    }
    if (selected.length < 4) {
      let legacy = pool.filter((a) => hasTags(a, ["featured"]) && !usedIds.has(a._id));
      let sorted = sortByDateDesc([
        ...legacy.filter((a) => isRecent(a, 30)),
        ...legacy.filter((a) => !isRecent(a, 30))
      ]);
      for (let a of sorted) {
        selected.push(a);
        usedIds.add(a._id);
        if (selected.length === 4) break;
      }
    }
    if (selected.length < 4) {
      let sorted = sortByDateDesc([
        ...pool.filter((a) => isRecent(a, 30) && !usedIds.has(a._id)),
        ...pool.filter((a) => !isRecent(a, 30) && !usedIds.has(a._id))
      ]);
      for (let a of sorted) {
        selected.push(a);
        usedIds.add(a._id);
        if (selected.length === 4) break;
      }
    }
    return selected;
  }
  const mainArticle = selectMainArticle(allFeaturedArticles);
  const secondaryArticles = selectSmallArticles(allFeaturedArticles, mainArticle);
  const showMain = mainArticle || allFeaturedArticles[0];
  const showSecondary = secondaryArticles.length > 0 ? secondaryArticles : allFeaturedArticles.slice(1, 5);
  function formatDate(dateString) {
    if (!dateString) return "Recently";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }
  function getArticleUrl(article) {
    const category = article.category?.slug?.current || "articles";
    const slug = article.slug?.current || article.slug;
    return `/${category}/${slug}`;
  }
  function getCategoryKey(category) {
    if (!category) return "";
    return (category.displayName || category.name || "").toLowerCase();
  }
  return renderTemplate`${maybeRenderHead()}<section class="hero" data-astro-cid-bbe6dxrz> <div class="hero-container" data-astro-cid-bbe6dxrz> <div class="hero-content" data-astro-cid-bbe6dxrz> <div class="hero-text-group" data-astro-cid-bbe6dxrz> <h1 class="hero-title" data-astro-cid-bbe6dxrz>Master AI Before Everyone Else</h1> <p class="hero-subtitle" data-astro-cid-bbe6dxrz>Expert AI reviews and breaking news</p> </div> </div> <div class="hero-grid" data-astro-cid-bbe6dxrz> <!-- Main Featured Article --> ${showMain && renderTemplate`<article class="main-featured" data-astro-cid-bbe6dxrz> <a${addAttribute(getArticleUrl(showMain), "href")} class="article-image-main-link" data-astro-cid-bbe6dxrz> <div class="article-image-main" data-astro-cid-bbe6dxrz> ${showMain.featuredImage ? renderTemplate`<img${spreadAttributes(generateHeroImage(showMain.featuredImage, showMain.title, 800, 400), void 0, { "class": "astro-bbe6dxrz" })} width="800" height="400" data-astro-cid-bbe6dxrz>` : renderTemplate`<div class="placeholder-image-main" data-astro-cid-bbe6dxrz>🤖</div>`} </div> </a> <div class="article-content-main" data-astro-cid-bbe6dxrz> ${showMain.category ? getCategoryKey(showMain.category) === "ai business" || getCategoryKey(showMain.category) === "business" ? renderTemplate`<a href="/categories/business" class="category-badge" data-astro-cid-bbe6dxrz>BUSINESS</a>` : getCategoryKey(showMain.category) === "marketing" ? renderTemplate`<a href="/categories/marketing" class="category-badge" data-astro-cid-bbe6dxrz>MARKETING</a>` : getCategoryKey(showMain.category) === "ai agents" ? renderTemplate`<a href="/categories/ai-agents" class="category-badge" data-astro-cid-bbe6dxrz>AI AGENTS</a>` : getCategoryKey(showMain.category) === "creative" ? renderTemplate`<a href="/categories/creative" class="category-badge" data-astro-cid-bbe6dxrz>CREATIVE</a>` : getCategoryKey(showMain.category) === "ecommerce" ? renderTemplate`<a href="/categories/ecommerce" class="category-badge" data-astro-cid-bbe6dxrz>ECOMMERCE</a>` : getCategoryKey(showMain.category) === "productivity" ? renderTemplate`<a href="/categories/productivity" class="category-badge" data-astro-cid-bbe6dxrz>PRODUCTIVITY</a>` : renderTemplate`<span class="category-badge" data-astro-cid-bbe6dxrz>UNCATEGORIZED</span>` : renderTemplate`<span class="category-badge" data-astro-cid-bbe6dxrz>UNCATEGORIZED</span>`} <h2 data-astro-cid-bbe6dxrz><a${addAttribute(getArticleUrl(showMain), "href")} data-astro-cid-bbe6dxrz>${showMain.title}</a></h2> <p data-astro-cid-bbe6dxrz>${showMain.excerpt}</p> <div class="article-meta" data-astro-cid-bbe6dxrz> <span class="author" data-astro-cid-bbe6dxrz> <span class="by-text" data-astro-cid-bbe6dxrz>By</span> <a${addAttribute(`/authors/${typeof showMain.author?.slug === "object" ? showMain.author.slug.current : showMain.author?.slug || "anonymous"}`, "href")} class="author-link"${addAttribute(`View profile of ${showMain.author?.name || "Anonymous"}`, "aria-label")} data-astro-cid-bbe6dxrz> ${showMain.author?.name || "Anonymous"} </a> </span> <span class="date" data-astro-cid-bbe6dxrz>${formatDate(showMain.publishedAt)}</span> <span class="read-time" data-astro-cid-bbe6dxrz>${calculateReadTime(showMain)} min read</span> </div> </div> </article>`} <!-- Revenue-Optimized Sidebar --> <div class="hero-sidebar" data-astro-cid-bbe6dxrz> <!-- Secondary Articles Grid with Premium Ad --> <div class="secondary-grid" data-astro-cid-bbe6dxrz> <!-- Premium Ad Placement - CSS ISOLATION IMPLEMENTED --> ${renderComponent($$result, "UniversalPromo", $$UniversalPromo, { "adId": "hero-premium-top", "data-astro-cid-bbe6dxrz": true })} ${showSecondary.slice(0, 3).map((article) => renderTemplate`<article class="secondary-article" data-astro-cid-bbe6dxrz> <a${addAttribute(getArticleUrl(article), "href")} class="article-image-small-link" data-astro-cid-bbe6dxrz> <div class="article-image-small" data-astro-cid-bbe6dxrz> ${article.featuredImage ? renderTemplate`<img${spreadAttributes(generateThumbnail(article.featuredImage, article.title, 100, 100), void 0, { "class": "astro-bbe6dxrz" })} width="100" height="100" data-astro-cid-bbe6dxrz>` : renderTemplate`<div class="placeholder-image-small" data-astro-cid-bbe6dxrz>📰</div>`} </div> </a> <div class="article-content-small" data-astro-cid-bbe6dxrz> ${article.category ? getCategoryKey(article.category) === "ai business" || getCategoryKey(article.category) === "business" ? renderTemplate`<a href="/categories/business" class="category-badge" data-astro-cid-bbe6dxrz>BUSINESS</a>` : getCategoryKey(article.category) === "marketing" ? renderTemplate`<a href="/categories/marketing" class="category-badge" data-astro-cid-bbe6dxrz>MARKETING</a>` : getCategoryKey(article.category) === "ai agents" ? renderTemplate`<a href="/categories/ai-agents" class="category-badge" data-astro-cid-bbe6dxrz>AI AGENTS</a>` : getCategoryKey(article.category) === "creative" ? renderTemplate`<a href="/categories/creative" class="category-badge" data-astro-cid-bbe6dxrz>CREATIVE</a>` : getCategoryKey(article.category) === "ecommerce" ? renderTemplate`<a href="/categories/ecommerce" class="category-badge" data-astro-cid-bbe6dxrz>ECOMMERCE</a>` : getCategoryKey(article.category) === "productivity" ? renderTemplate`<a href="/categories/productivity" class="category-badge" data-astro-cid-bbe6dxrz>PRODUCTIVITY</a>` : renderTemplate`<span class="category-badge" data-astro-cid-bbe6dxrz>UNCATEGORIZED</span>` : renderTemplate`<span class="category-badge" data-astro-cid-bbe6dxrz>UNCATEGORIZED</span>`} <div style="height: 6px;" data-astro-cid-bbe6dxrz></div> <h3 data-astro-cid-bbe6dxrz><a${addAttribute(getArticleUrl(article), "href")} data-astro-cid-bbe6dxrz>${article.title}</a></h3> <div class="article-meta-small" data-astro-cid-bbe6dxrz> <span class="author" data-astro-cid-bbe6dxrz>
By <a${addAttribute(`/authors/${typeof article.author?.slug === "object" ? article.author.slug.current : article.author?.slug || "anonymous"}`, "href")} class="author-link"${addAttribute(`View profile of ${article.author?.name || "Anonymous"}`, "aria-label")} data-astro-cid-bbe6dxrz> ${article.author?.name || "Anonymous"} </a> </span> <span class="date" data-astro-cid-bbe6dxrz>${formatDate(article.publishedAt)}</span> </div> </div> </article>`)} </div> </div> </div> </div> </section> <!-- DEBUG HARNESS: TEMPORARY – outlines + runtime computed styles logger --> `;
}, "/workspaces/ai-news-site/src/components/Hero.astro", void 0);
createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="convert-hero-section"> <!-- Animated Background --> <div class="convert-hero-background"> <div class="convert-hero-radial-gradient" id="convertHeroRadialGradient"></div> <div class="convert-hero-blob convert-hero-blob-1"></div> <div class="convert-hero-blob convert-hero-blob-2"></div> <div class="convert-hero-blob convert-hero-blob-3"></div> </div> <!-- Floating Particles --> <div class="convert-hero-particles" id="convertHeroParticles"></div> <div class="convert-hero-container"> <!-- Notification Badge --> <div class="convert-hero-notification"> <div class="convert-hero-notification-badge"> <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #22d3ee;"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path> </svg> <span style="color: #cbd5e1;"> <span style="font-weight: 600; color: #22d3ee;">537 entrepreneurs</span> joined this week
</span> <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #22d3ee;"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path> </svg> </div> </div> <!-- Two Column Layout --> <div class="convert-hero-grid"> <!-- Left Column --> <div class="convert-hero-left-column"> <!-- Headline --> <h1 class="convert-hero-headline"> <span class="convert-hero-headline-line convert-hero-gradient-cyan">Make $10,247+/Month With AI</span> <span class="convert-hero-headline-line convert-hero-headline-social-proof convert-hero-gradient-white" style="margin-top: 0.375rem;">Join 3,847 Entrepreneurs Already Doing It</span> </h1> <!-- Benefits --> <div class="convert-hero-benefits"> <div class="convert-hero-benefit-item"> <span class="convert-hero-benefit-icon">🤖</span> <span class="convert-hero-benefit-text">AI money machines generating $1K-$10K/month</span> </div> <div class="convert-hero-benefit-item"> <span class="convert-hero-benefit-icon">💎</span> <span class="convert-hero-benefit-text">AI automation setups that replace 10+ hours daily</span> </div> <div class="convert-hero-benefit-item"> <span class="convert-hero-benefit-icon">⚡</span> <span class="convert-hero-benefit-text">First access to breakthrough AI tools before they go viral</span> </div> <div class="convert-hero-benefit-item"> <span class="convert-hero-benefit-icon">🚀</span> <span class="convert-hero-benefit-text">Join exclusive community of successful AI entrepreneurs</span> </div> </div> <!-- Testimonial --> <div class="convert-hero-testimonial"> <div class="convert-hero-testimonial-content"> <div class="convert-hero-testimonial-avatar">MK</div> <div class="convert-hero-testimonial-body"> <div class="convert-hero-stars"> <svg width="16" height="16" fill="#fb923c" stroke="#fb923c" viewBox="0 0 24 24"> <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path> </svg> <svg width="16" height="16" fill="#fb923c" stroke="#fb923c" viewBox="0 0 24 24"> <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path> </svg> <svg width="16" height="16" fill="#fb923c" stroke="#fb923c" viewBox="0 0 24 24"> <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path> </svg> <svg width="16" height="16" fill="#fb923c" stroke="#fb923c" viewBox="0 0 24 24"> <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path> </svg> <svg width="16" height="16" fill="#fb923c" stroke="#fb923c" viewBox="0 0 24 24"> <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path> </svg> </div> <p class="convert-hero-testimonial-quote">"This AI system helped me build a $15K/month side business in 90 days"</p> <p class="convert-hero-testimonial-author">— Maria K., Tech Consultant</p> </div> </div> </div> </div> <!-- Right Column - Vault Card --> <div class="convert-hero-right-column"> <div class="convert-hero-vault-wrapper"> <div class="convert-hero-vault-glow"></div> <div class="convert-hero-vault-card"> <!-- Header --> <div class="convert-hero-vault-header"> <div class="convert-hero-badges-container"> <div class="convert-hero-bonus-badge">🎁 FREE BONUS</div> <div class="convert-hero-limited-badge"> <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #f87171;"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> <span class="convert-hero-limited-text">LIMITED: <span id="convertHeroSpotsRemaining">347</span> SPOTS LEFT <span class="convert-hero-spots-timestamp" id="convertHeroSpotsTimestamp"></span></span> </div> </div> <h3 class="convert-hero-vault-title">2026 AI Money & Productivity Vault</h3> <p class="convert-hero-vault-subtitle">+ Exclusive Discord Access</p> </div> <!-- Bonus Items --> <div class="convert-hero-bonus-items"> <div class="convert-hero-bonus-item"> <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #fb923c; flex-shrink: 0; margin-top: 0.125rem;"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> <span class="convert-hero-bonus-item-text">$10K/Month AI Side Hustles (Copy-paste systems)</span> </div> <div class="convert-hero-bonus-item"> <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #fb923c; flex-shrink: 0; margin-top: 0.125rem;"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> <span class="convert-hero-bonus-item-text">AI Agents That Do 10 Hours of Work in 10 Minutes</span> </div> <div class="convert-hero-bonus-item"> <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #fb923c; flex-shrink: 0; margin-top: 0.125rem;"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> <span class="convert-hero-bonus-item-text">Personal AI Assistant Setup (makes money while you sleep)</span> </div> <div class="convert-hero-bonus-item"> <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #fb923c; flex-shrink: 0; margin-top: 0.125rem;"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> <span class="convert-hero-bonus-item-text">AI Marketing Funnels That Convert 10X Better</span> </div> <div class="convert-hero-bonus-value"> <span class="convert-hero-bonus-value-text">Worth $2,497 — Yours Free</span> </div> </div> <!-- Risk Reversal --> <div class="convert-hero-risk-reversal"> <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #10b981; flex-shrink: 0;"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> <span>100% Free — No Credit Card Required</span> </div> <!-- Email Form --> <div class="convert-hero-email-form"> <div class="convert-hero-form-glow"></div> <div class="convert-hero-form-inner"> <div class="convert-hero-email-input-wrapper"> <svg class="convert-hero-email-icon" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #94a3b8; flex-shrink: 0;"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path> </svg> <input type="email" class="convert-hero-email-input" placeholder="your@email.com" id="convertHeroEmailInput" autocomplete="email" aria-label="Email address" aria-describedby="convertHeroEmailError"> <svg class="convert-hero-validation-icon convert-hero-validation-success" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="display: none; flex-shrink: 0;"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> <svg class="convert-hero-validation-icon convert-hero-validation-error" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="display: none; flex-shrink: 0;"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path> </svg> </div> <div class="convert-hero-email-error" id="convertHeroEmailError" role="alert" aria-live="polite"></div> <button class="convert-hero-submit-btn" id="convertHeroSubmitBtn" type="button"> <span id="convertHeroBtnText">Get Instant Access (Free)</span> <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" id="convertHeroBtnIcon" style="flex-shrink: 0;"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path> </svg> </button> </div> </div> <!-- Trust Badges --> <div class="convert-hero-trust-badges"> <div class="convert-hero-trust-badge"> <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path> </svg> <span>No spam</span> </div> <div class="convert-hero-trust-badge"> <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path> </svg> <span>GDPR Compliant</span> </div> <div class="convert-hero-trust-badge"> <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path> </svg> <span>256-bit SSL</span> </div> </div> </div> </div> </div> </div> <!-- Stats Section --> <div class="convert-hero-stats-grid"> <div class="convert-hero-stat-card-wrapper"> <div class="convert-hero-stat-glow"></div> <div class="convert-hero-stat-card"> <div class="convert-hero-stat-content"> <div class="convert-hero-stat-icon-wrapper"> <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #22d3ee;"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path> </svg> </div> <div> <div class="convert-hero-stat-value">5,247</div> <div class="convert-hero-stat-label">Success Stories</div> </div> </div> </div> </div> <div class="convert-hero-stat-card-wrapper"> <div class="convert-hero-stat-glow"></div> <div class="convert-hero-stat-card"> <div class="convert-hero-stat-content"> <div class="convert-hero-stat-icon-wrapper"> <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #22d3ee;"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> </div> <div> <div class="convert-hero-stat-value">$2.3M+</div> <div class="convert-hero-stat-label">Revenue Generated</div> </div> </div> </div> </div> <div class="convert-hero-stat-card-wrapper"> <div class="convert-hero-stat-glow"></div> <div class="convert-hero-stat-card"> <div class="convert-hero-stat-content"> <div class="convert-hero-stat-icon-wrapper"> <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #22d3ee;"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path> </svg> </div> <div> <div class="convert-hero-stat-value">10 hrs</div> <div class="convert-hero-stat-label">Saved Daily</div> </div> </div> </div> </div> </div> <!-- Trust Indicators --> <div class="convert-hero-trust-section"> <div class="convert-hero-trust-divider"></div> <p class="convert-hero-trust-title">TRUSTED BY PROFESSIONALS FROM</p> <div class="convert-hero-companies"> <div class="convert-hero-company" style="animation-delay: 0.1s;"> <svg class="convert-hero-company-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path> <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path> <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path> <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path> </svg> <span>Google</span> </div> <div class="convert-hero-company" style="animation-delay: 0.2s;"> <svg class="convert-hero-company-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z" fill="#00A4EF"></path> </svg> <span>Microsoft</span> </div> <div class="convert-hero-company" style="animation-delay: 0.3s;"> <svg class="convert-hero-company-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M13.383 0l-4.305 7.433v7.134L13.383 24l4.305-7.433V7.433L13.383 0z" fill="#FF9900"></path> </svg> <span>Amazon</span> </div> <div class="convert-hero-company" style="animation-delay: 0.4s;"> <svg class="convert-hero-company-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="#0081FB"></path> </svg> <span>Meta</span> </div> <div class="convert-hero-company" style="animation-delay: 0.5s;"> <svg class="convert-hero-company-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.49-2.08-.96-3.24-1.51-1.84-.78-3.18-1.35-4.38-2.33C3.93 15.25 2.87 13.5 2.3 11.3c-.58-2.2-.04-4.25 1.13-6.1 1.06-1.69 2.84-2.89 4.77-3.27A8.96 8.96 0 0112 2.36c1.56 0 3.05.24 4.35.72 1.41.52 2.73 1.36 3.41 2.87a9 9 0 01.7 3.4c.09.75.13 1.5.13 2.25a28.5 28.5 0 01-.12 2.7c-.08.8-.2 1.58-.38 2.33-.11.45-.27.89-.46 1.32-.3.69-.7 1.33-1.2 1.9l-.01.01zm.11-8.08c.06-.44.1-.89.1-1.35 0-.41-.03-.82-.08-1.22-.14-1.08-.41-2.12-.92-3.05-.48-.87-1.18-1.61-2.07-2.12-.8-.46-1.71-.7-2.65-.7-1.1 0-2.2.29-3.1.84-.78.48-1.45 1.15-1.96 1.97-.58.92-.95 1.96-1.1 3.05-.07.4-.1.81-.1 1.22 0 .46.04.91.1 1.35.15 1.09.52 2.13 1.1 3.05.51.82 1.18 1.49 1.96 1.97.9.55 2 .84 3.1.84.94 0 1.85-.24 2.65-.7.89-.51 1.59-1.25 2.07-2.12.51-.93.78-1.97.92-3.05z" fill="#A8A8A8"></path> <path d="M12.03 7.6c-2.4 0-4.35 1.95-4.35 4.35s1.95 4.35 4.35 4.35 4.35-1.95 4.35-4.35-1.95-4.35-4.35-4.35zm0 7.2c-1.57 0-2.85-1.28-2.85-2.85s1.28-2.85 2.85-2.85 2.85 1.28 2.85 2.85-1.28 2.85-2.85 2.85z" fill="#000"></path> </svg> <span>Apple</span> </div> </div> </div> </div> </section>  <!-- Styles from HeroConvert for the header section -->  <!-- Styles from HeroRedesigned for the main-grid section --> <!-- Note: The main-grid styles are already included in HeroRedesigned.astro and will be available globally --> <!-- We just need to ensure the section wrapper uses the correct class -->`;
}, "/workspaces/ai-news-site/src/components/HeroHybrid.astro", void 0);
const $$HeroToggle = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderTemplate`${renderComponent($$result, "Hero", $$Hero, {})}`}`;
}, "/workspaces/ai-news-site/src/components/HeroToggle.astro", void 0);
const $$CategoryShortcuts = createComponent(($$result, $$props, $$slots) => {
  const categories = [
    { name: "AI Marketing", slug: "marketing", icon: "📈", description: "AI marketing & content creation" },
    { name: "AI Business", slug: "business", icon: "💼", description: "AI in business & enterprise" },
    { name: "AI Agents", slug: "ai-agents", icon: "🤖", description: "Autonomous AI agents" },
    { name: "AI Productivity", slug: "productivity", icon: "⚡", description: "AI productivity & automation tools" },
    { name: "AI Creative", slug: "creative", icon: "🎨", description: "AI video & image generation" },
    { name: "AI eCommerce", slug: "ecommerce", icon: "🛒", description: "AI for eCommerce & online business" }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="category-shortcuts" data-astro-cid-zf72xgq6> <div class="shortcuts-container" data-astro-cid-zf72xgq6> <h2 class="shortcuts-title" data-astro-cid-zf72xgq6>Browse by Category</h2> <div class="shortcuts-grid" data-astro-cid-zf72xgq6> ${categories.map((category) => renderTemplate`<a${addAttribute(`/categories/${category.slug}`, "href")}${addAttribute(`shortcut-button ${category.slug}`, "class")} data-astro-cid-zf72xgq6> <div class="shortcut-icon" data-astro-cid-zf72xgq6>${category.icon}</div> <div class="shortcut-content" data-astro-cid-zf72xgq6> <h3 data-astro-cid-zf72xgq6>${category.name}</h3> <p data-astro-cid-zf72xgq6>${category.description}</p> </div> </a>`)} </div> </div> </section> `;
}, "/workspaces/ai-news-site/src/components/CategoryShortcuts.astro", void 0);
const $$Astro$1 = createAstro("http://localhost:4321");
const $$HomepageNewsletterSidebar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$HomepageNewsletterSidebar;
  const { categorySlug, currentArticleSlug, className = "", articles = [], mainGridCount = 5 } = Astro2.props;
  let filteredArticles = [];
  if (Array.isArray(articles) && articles.length > 0) {
    const sidebarArticles = articles.slice(mainGridCount, mainGridCount + 3);
    if (sidebarArticles.length < 3) {
      const remaining = 3 - sidebarArticles.length;
      const fallbackArticles = articles.slice(0, remaining);
      filteredArticles = [...sidebarArticles, ...fallbackArticles];
    } else {
      filteredArticles = sidebarArticles;
    }
  }
  function formatDate(dateString) {
    if (!dateString) return "";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
      });
    } catch {
      return "";
    }
  }
  function getArticleUrl(article) {
    const category = article.category?.slug?.current || categorySlug;
    const slug = article.slug?.current || article.slug;
    return `/${category}/${slug}`;
  }
  return renderTemplate`${maybeRenderHead()}<aside${addAttribute(`homepage-newsletter-sidebar ${className}`, "class")} data-astro-cid-buyyhgyx> <!-- Newsletter Signup - Prime Position for Homepage --> <div class="sidebar-section newsletter-signup-section" data-astro-cid-buyyhgyx> <div class="newsletter-header" data-astro-cid-buyyhgyx> <div class="newsletter-icon" data-astro-cid-buyyhgyx>📧</div> <h3 class="newsletter-title" data-astro-cid-buyyhgyx>Stay Updated</h3> </div> <p class="newsletter-description" data-astro-cid-buyyhgyx>Get weekly AI insights, tool reviews, and exclusive content delivered to your inbox.</p> <div class="newsletter-benefits" data-astro-cid-buyyhgyx> <div class="benefit-item" data-astro-cid-buyyhgyx> <span class="benefit-icon" data-astro-cid-buyyhgyx>🎯</span> <span class="benefit-text" data-astro-cid-buyyhgyx>Curated AI tools</span> </div> <div class="benefit-item" data-astro-cid-buyyhgyx> <span class="benefit-icon" data-astro-cid-buyyhgyx>📈</span> <span class="benefit-text" data-astro-cid-buyyhgyx>Industry insights</span> </div> <div class="benefit-item" data-astro-cid-buyyhgyx> <span class="benefit-icon" data-astro-cid-buyyhgyx>🚀</span> <span class="benefit-text" data-astro-cid-buyyhgyx>Early access</span> </div> </div> <form class="newsletter-form" data-astro-cid-buyyhgyx> <input type="email" placeholder="Enter your email" class="newsletter-input" required data-astro-cid-buyyhgyx> <button type="submit" class="newsletter-submit" data-astro-cid-buyyhgyx>Subscribe Free</button> </form> <p class="newsletter-privacy" data-astro-cid-buyyhgyx>No spam, unsubscribe anytime.</p> </div> <!-- Related Articles --> <div class="sidebar-section sidebar-related" data-astro-cid-buyyhgyx> <h3 class="section-title" data-astro-cid-buyyhgyx>Related in ${categorySlug?.charAt(0).toUpperCase() + categorySlug?.slice(1)}</h3> <div class="related-articles" data-astro-cid-buyyhgyx> ${filteredArticles.map((a) => renderTemplate`<a${addAttribute(getArticleUrl(a), "href")} class="related-article-item" data-astro-cid-buyyhgyx> ${a.featuredImage ? renderTemplate`<img${addAttribute(a.featuredImage, "src")}${addAttribute(a.title, "alt")} class="related-article-thumbnail" width="56" height="56" loading="lazy" decoding="async" data-astro-cid-buyyhgyx>` : renderTemplate`<div class="related-article-thumbnail placeholder-thumbnail" data-astro-cid-buyyhgyx>📰</div>`} <div class="related-article-content" data-astro-cid-buyyhgyx> <h4 class="related-article-title" data-astro-cid-buyyhgyx>${a.title || "Article Title"}</h4> <div class="related-article-date" data-astro-cid-buyyhgyx>${formatDate(a.publishedAt)}</div> </div> </a>`)} </div> </div> <!-- AI Tool Comparison Widget - Streamlined --> <div class="sidebar-section tool-comparison" data-astro-cid-buyyhgyx> <h3 class="section-title" data-astro-cid-buyyhgyx>Recommended Tools</h3> <div class="comparison-grid" data-astro-cid-buyyhgyx> <div class="tool-card" data-astro-cid-buyyhgyx> <div class="tool-icon" data-astro-cid-buyyhgyx>🤖</div> <div class="tool-info" data-astro-cid-buyyhgyx> <h4 data-astro-cid-buyyhgyx>Claude AI</h4> <span class="tool-price" data-astro-cid-buyyhgyx>$20/mo</span> </div> <a href="#" class="tool-link" data-astro-cid-buyyhgyx>Get Started</a> </div> <div class="tool-card" data-astro-cid-buyyhgyx> <div class="tool-icon" data-astro-cid-buyyhgyx>✨</div> <div class="tool-info" data-astro-cid-buyyhgyx> <h4 data-astro-cid-buyyhgyx>ChatGPT Plus</h4> <span class="tool-price" data-astro-cid-buyyhgyx>$20/mo</span> </div> <a href="#" class="tool-link" data-astro-cid-buyyhgyx>Get Started</a> </div> </div> </div> <!-- Marketing Category Specific Ad - Fills Empty Space --> ${categorySlug === "marketing" && renderTemplate`<div class="sidebar-section marketing-ad-section" data-astro-cid-buyyhgyx> <div class="marketing-ad-header" data-astro-cid-buyyhgyx> <div class="marketing-ad-badge" data-astro-cid-buyyhgyx>MARKETING</div> <div class="marketing-ad-icon" data-astro-cid-buyyhgyx>📊</div> </div> <div class="marketing-ad-content" data-astro-cid-buyyhgyx> <h3 class="marketing-ad-title" data-astro-cid-buyyhgyx>AI Marketing Mastery</h3> <p class="marketing-ad-description" data-astro-cid-buyyhgyx>Transform your marketing with cutting-edge AI tools and automation solutions.</p> <div class="marketing-ad-cta-group" data-astro-cid-buyyhgyx> <a href="/categories/marketing" class="marketing-ad-cta-primary" data-astro-cid-buyyhgyx>Explore Tools</a> <a href="/advertise" class="marketing-ad-cta-secondary" data-astro-cid-buyyhgyx>Advertise Here</a> </div> </div> </div>`} </aside>  `;
}, "/workspaces/ai-news-site/src/components/HomepageNewsletterSidebar.astro", void 0);
const $$Astro = createAstro("http://localhost:4321");
const $$HomepagePartnerSidebar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$HomepagePartnerSidebar;
  const { categorySlug, currentArticleSlug, className = "", articles = [], mainGridCount = 5, sidebarCount = 3, priority = "high" } = Astro2.props;
  let filteredArticles = [];
  if (Array.isArray(articles) && articles.length > 0) {
    const sidebarArticles = articles.slice(mainGridCount, mainGridCount + sidebarCount);
    if (sidebarArticles.length < sidebarCount) {
      const remaining = sidebarCount - sidebarArticles.length;
      const availableArticles = articles.filter((_, index) => index < mainGridCount);
      const shuffled = availableArticles.sort(() => 0.5 - Math.random());
      const fallbackArticles = shuffled.slice(0, remaining);
      filteredArticles = [...sidebarArticles, ...fallbackArticles];
    } else {
      filteredArticles = sidebarArticles;
    }
  }
  function formatDate(dateString) {
    if (!dateString) return "";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
      });
    } catch {
      return "";
    }
  }
  function getArticleUrl(article) {
    const category = article.category?.slug?.current || categorySlug;
    const slug = article.slug?.current || article.slug;
    return `/${category}/${slug}`;
  }
  return renderTemplate`${maybeRenderHead()}<aside${addAttribute(`homepage-partner-sidebar ${className}`, "class")} data-astro-cid-sbrm7gxs> <!-- Top Partner Space - Premium Monetization (All priorities) --> <div class="sidebar-section premium-partner-section" data-astro-cid-sbrm7gxs> <div class="sponsor-header" data-astro-cid-sbrm7gxs> <div class="sponsor-badge" data-astro-cid-sbrm7gxs>FEATURED PARTNER</div> <div class="sponsor-icon" data-astro-cid-sbrm7gxs>⭐</div> </div> <div class="sponsor-content" data-astro-cid-sbrm7gxs> <h3 class="sponsor-title" data-astro-cid-sbrm7gxs>Premium AI Solutions</h3> <p class="sponsor-description" data-astro-cid-sbrm7gxs>Exclusive advertising space for AI companies. Showcase your cutting-edge solutions to our engaged audience.</p> <div class="sponsor-features" data-astro-cid-sbrm7gxs> <div class="feature-item" data-astro-cid-sbrm7gxs> <span class="feature-icon" data-astro-cid-sbrm7gxs>🎯</span> <span class="feature-text" data-astro-cid-sbrm7gxs>Targeted Audience</span> </div> <div class="feature-item" data-astro-cid-sbrm7gxs> <span class="feature-icon" data-astro-cid-sbrm7gxs>📈</span> <span class="feature-text" data-astro-cid-sbrm7gxs>High Engagement</span> </div> </div> <a href="/advertise" class="sponsor-cta" data-astro-cid-sbrm7gxs>Partner With Us</a> </div> </div> <!-- Related Articles --> <div class="sidebar-section sidebar-related" data-astro-cid-sbrm7gxs> <h3 class="section-title" data-astro-cid-sbrm7gxs>Related in ${categorySlug?.charAt(0).toUpperCase() + categorySlug?.slice(1)}</h3> <div class="related-articles" data-astro-cid-sbrm7gxs> ${filteredArticles.map((a) => renderTemplate`<a${addAttribute(getArticleUrl(a), "href")} class="related-article-item" data-astro-cid-sbrm7gxs> ${a.featuredImage ? renderTemplate`<img${addAttribute(a.featuredImage, "src")}${addAttribute(a.title, "alt")} class="related-article-thumbnail" width="56" height="56" loading="lazy" decoding="async" data-astro-cid-sbrm7gxs>` : renderTemplate`<div class="related-article-thumbnail placeholder-thumbnail" data-astro-cid-sbrm7gxs>📰</div>`} <div class="related-article-content" data-astro-cid-sbrm7gxs> <h4 class="related-article-title" data-astro-cid-sbrm7gxs>${a.title || "Article Title"}</h4> <div class="related-article-date" data-astro-cid-sbrm7gxs>${formatDate(a.publishedAt)}</div> </div> </a>`)} </div> </div> <!-- AI Tool Comparison Widget - Streamlined (All priorities) --> <div class="sidebar-section tool-comparison" data-astro-cid-sbrm7gxs> <h3 class="section-title" data-astro-cid-sbrm7gxs>Recommended Tools</h3> <div class="comparison-grid" data-astro-cid-sbrm7gxs> <div class="tool-card" data-astro-cid-sbrm7gxs> <div class="tool-icon" data-astro-cid-sbrm7gxs>🤖</div> <div class="tool-info" data-astro-cid-sbrm7gxs> <h4 data-astro-cid-sbrm7gxs>Claude AI</h4> <span class="tool-price" data-astro-cid-sbrm7gxs>$20/mo</span> </div> <a href="#" class="tool-link" data-astro-cid-sbrm7gxs>Get Started</a> </div> <div class="tool-card" data-astro-cid-sbrm7gxs> <div class="tool-icon" data-astro-cid-sbrm7gxs>✨</div> <div class="tool-info" data-astro-cid-sbrm7gxs> <h4 data-astro-cid-sbrm7gxs>ChatGPT Plus</h4> <span class="tool-price" data-astro-cid-sbrm7gxs>$20/mo</span> </div> <a href="#" class="tool-link" data-astro-cid-sbrm7gxs>Get Started</a> </div> </div> </div> <!-- Bottom Partner Space - Secondary Monetization (Only for high priority sections) --> ${priority === "high" && renderTemplate`<div class="sidebar-section secondary-partner-section" data-astro-cid-sbrm7gxs> <div class="secondary-ad-header" data-astro-cid-sbrm7gxs> <div class="secondary-ad-badge" data-astro-cid-sbrm7gxs>FEATURED CONTENT</div> <div class="secondary-ad-icon" data-astro-cid-sbrm7gxs>💡</div> </div> <div class="secondary-ad-content" data-astro-cid-sbrm7gxs> <h3 class="secondary-ad-title" data-astro-cid-sbrm7gxs>AI Innovation Hub</h3> <p class="secondary-ad-description" data-astro-cid-sbrm7gxs>Discover the latest AI breakthroughs and cutting-edge technologies that are shaping the future.</p> <div class="secondary-ad-features" data-astro-cid-sbrm7gxs> <div class="feature-item" data-astro-cid-sbrm7gxs> <span class="feature-icon" data-astro-cid-sbrm7gxs>🚀</span> <span class="feature-text" data-astro-cid-sbrm7gxs>Latest Updates</span> </div> <div class="feature-item" data-astro-cid-sbrm7gxs> <span class="feature-icon" data-astro-cid-sbrm7gxs>🔬</span> <span class="feature-text" data-astro-cid-sbrm7gxs>Research Insights</span> </div> </div> <a href="/ai-innovation" class="secondary-ad-cta" data-astro-cid-sbrm7gxs>Discover More</a> </div> </div>`} </aside> `;
}, "/workspaces/ai-news-site/src/components/HomepagePartnerSidebar.astro", void 0);
const $$AIBuzzLayout = createComponent(async ($$result, $$props, $$slots) => {
  const homepageCategories = HOMEPAGE_CATEGORIES;
  function getArticleUrl(article) {
    const category = article.category?.slug?.current || "marketing";
    const slug = article.slug?.current || article.slug;
    return `/${category}/${slug}`;
  }
  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
  }
  const categoryArticles = {};
  for (const category of homepageCategories) {
    categoryArticles[category.slug] = await getArticlesByCategory(category.slug, 12);
  }
  function getArticleCounts(categorySlug) {
    const priority = homepageCategories.find((c) => c.slug === categorySlug)?.homepagePriority || 99;
    if (priority <= 2) {
      return { main: 5, sidebar: 3 };
    } else if (priority <= 4) {
      return { main: 4, sidebar: 3 };
    } else if (categorySlug === "ai-agents") {
      return { main: 4, sidebar: 3 };
    } else {
      return { main: 3, sidebar: 2 };
    }
  }
  function getPriorityLevel(categorySlug) {
    const priority = homepageCategories.find((c) => c.slug === categorySlug)?.homepagePriority || 99;
    if (priority <= 2) return "high";
    if (priority <= 4) return "medium";
    return "low";
  }
  function generatePlaceholderArticles(category, count) {
    const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    const categoryTitles = {
      marketing: [
        "AI-Powered Marketing Automation Strategies",
        "Content Creation with ChatGPT: Complete Guide",
        "Social Media Marketing Automation Tools",
        "Email Marketing AI: Boost Your Campaigns",
        "SEO Optimization with AI: Best Practices",
        "Marketing Analytics: AI-Driven Insights",
        "Personalization at Scale with Machine Learning",
        "AI Copywriting: Write Better Content Faster"
      ],
      business: [
        "AI Side Hustles: Make Money with Automation",
        "Entrepreneur's Guide to AI Tools",
        "Business Process Automation with AI",
        "AI for Small Business: Getting Started",
        "Revenue Growth with AI Solutions",
        "AI Customer Service: Transform Your Support",
        "Data-Driven Decision Making with AI",
        "Scaling Your Business with AI Technology"
      ],
      "ai-agents": [
        "Building Autonomous AI Agents: Tutorial",
        "AI Agent Architecture: Design Patterns",
        "Deploying AI Agents in Production",
        "Multi-Agent Systems: Coordination Strategies",
        "AI Agent Performance Optimization",
        "Enterprise AI Agent Implementation",
        "AI Agent Security Best Practices",
        "Testing and Debugging AI Agents"
      ],
      productivity: [
        "AI Productivity Tools: Top 10 Picks",
        "Automate Your Workflow with AI",
        "Time Management with AI Assistants",
        "AI-Powered Task Management Systems",
        "Boost Productivity: AI Hacks for Professionals",
        "AI Calendar Management: Never Miss a Meeting",
        "Document Automation with AI",
        "AI Note-Taking: Organize Your Thoughts"
      ],
      creative: [
        "AI Image Generation: Midjourney vs DALL-E",
        "Video Creation with AI: Complete Guide",
        "AI Music Production: Tools and Techniques",
        "Creative Writing with AI Assistants",
        "AI Design Tools: Revolutionize Your Workflow",
        "3D Modeling with AI: Future of Design",
        "AI Animation: Bring Ideas to Life",
        "Photography Enhancement with AI"
      ],
      ecommerce: [
        "AI for E-commerce: Boost Sales Today",
        "Product Recommendations with AI",
        "AI Inventory Management Systems",
        "Customer Experience: AI-Powered Solutions",
        "AI Pricing Strategies for Online Stores",
        "E-commerce Chatbots: Increase Conversions",
        "AI Fraud Detection: Protect Your Store",
        "Supply Chain Optimization with AI"
      ]
    };
    const titles = categoryTitles[category] || Array.from({ length: count }, (_, i) => `Sample Article ${i + 1}`);
    const authors = [
      { name: "AI Expert", slug: "ai-expert" },
      { name: "Tech Writer", slug: "tech-writer" },
      { name: "Industry Analyst", slug: "industry-analyst" },
      { name: "Product Manager", slug: "product-manager" },
      { name: "Developer", slug: "developer" },
      { name: "Content Creator", slug: "content-creator" },
      { name: "Business Consultant", slug: "business-consultant" },
      { name: "Marketing Specialist", slug: "marketing-specialist" }
    ];
    return Array.from({ length: count }, (_, i) => {
      const daysAgo = Math.floor(Math.random() * 30);
      const publishDate = /* @__PURE__ */ new Date();
      publishDate.setDate(publishDate.getDate() - daysAgo);
      const author = authors[i % authors.length];
      return {
        _id: `placeholder-${category}-${i + 1}`,
        title: titles[i] || `Sample ${category} Article ${i + 1}`,
        excerpt: `${loremIpsum.substring(0, 120)}...`,
        slug: `sample-${category}-${i + 1}`,
        // String format (matching Sanity's "slug": slug.current)
        category: {
          name: category,
          displayName: category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, " "),
          slug: { current: category }
          // Full slug object with .current
        },
        author: {
          name: author.name,
          slug: author.slug
          // String format (matching Sanity's author->{name, "slug": slug.current})
        },
        publishedAt: publishDate.toISOString(),
        content: Array(5).fill(loremIpsum).join(" "),
        featuredImage: null,
        status: "published"
      };
    });
  }
  const fallbackArticlesByCategory = {};
  for (const category of homepageCategories) {
    fallbackArticlesByCategory[category.slug] = generatePlaceholderArticles(category.slug, 12);
  }
  const finalArticles = {};
  for (const category in categoryArticles) {
    const articles = categoryArticles[category];
    if (articles.length === 0) {
      finalArticles[category] = fallbackArticlesByCategory[category] || [];
    } else if (articles.length < 12) {
      const needed = 12 - articles.length;
      const placeholders = generatePlaceholderArticles(category, needed);
      finalArticles[category] = [...articles, ...placeholders];
    } else {
      finalArticles[category] = articles;
    }
  }
  for (const category in finalArticles) {
    const counts = getArticleCounts(category);
    finalArticles[category].slice(0, counts.main);
  }
  return renderTemplate`${maybeRenderHead()}<section class="aibuzz-layout" data-astro-cid-ylb2qzx2> <div class="layout-container" data-astro-cid-ylb2qzx2> ${homepageCategories.map((cat, index) => {
    const allCategoryArticles = finalArticles[cat.slug] || [];
    const counts = getArticleCounts(cat.slug);
    const sectionMainArticles = allCategoryArticles.slice(0, counts.main);
    if (cat.slug === "marketing") {
      return renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-ylb2qzx2": true }, { "default": async ($$result2) => renderTemplate` <section class="content-section priority-high"${addAttribute(cat.slug, "id")} data-astro-cid-ylb2qzx2> <div class="section-header" data-astro-cid-ylb2qzx2> <h2 class="section-title" data-astro-cid-ylb2qzx2><a${addAttribute(`/categories/${cat.slug}`, "href")} data-astro-cid-ylb2qzx2>${cat.displayName}</a></h2> <a${addAttribute(`/categories/${cat.slug}`, "href")} class="view-all-link" data-astro-cid-ylb2qzx2>View All →</a> </div> <div class="section-layout marketing-section-layout" data-astro-cid-ylb2qzx2> <div class="main-content" data-astro-cid-ylb2qzx2> <div class="grid-layout-special" data-astro-cid-ylb2qzx2> <div class="top-row" data-astro-cid-ylb2qzx2> ${sectionMainArticles.slice(0, 2).map((article) => renderTemplate`<article class="large-card" data-astro-cid-ylb2qzx2> <a${addAttribute(getArticleUrl(article), "href")} class="card-image-link" data-astro-cid-ylb2qzx2> <div class="card-image" style="aspect-ratio: 16/9; height: 250px;" data-astro-cid-ylb2qzx2> ${article.featuredImage ? renderTemplate`<img${addAttribute(article.featuredImage, "src")}${addAttribute(article.title, "alt")} loading="lazy" style="object-fit: cover; width: 100%; height: 100%;" data-astro-cid-ylb2qzx2>` : renderTemplate`<div class="placeholder-image" data-astro-cid-ylb2qzx2>📰</div>`} <div class="card-image-gradient" style="position:absolute;left:0;bottom:0;width:100%;height:40%;background:linear-gradient(180deg,rgba(24,25,26,0) 0%,rgba(24,25,26,0.7) 100%);" data-astro-cid-ylb2qzx2></div> </div> </a> <div class="card-content" data-astro-cid-ylb2qzx2> <a${addAttribute(`/categories/${cat.slug}`, "href")} class="category-tag category-link-safe" data-astro-cid-ylb2qzx2>${cat.displayName}</a> <div style="height: 16px;" data-astro-cid-ylb2qzx2></div> <h3 style="font-weight:800;" data-astro-cid-ylb2qzx2><a${addAttribute(getArticleUrl(article), "href")} data-astro-cid-ylb2qzx2>${article.title}</a></h3> <p data-astro-cid-ylb2qzx2>${article.excerpt}</p> <div class="card-meta" data-astro-cid-ylb2qzx2> <span class="author" data-astro-cid-ylb2qzx2>
By <a${addAttribute(`/authors/${typeof article.author?.slug === "object" ? article.author.slug.current : article.author?.slug || "anonymous"}`, "href")} class="author-link"${addAttribute(`View profile of ${article.author?.name || "Anonymous"}`, "aria-label")} data-astro-cid-ylb2qzx2>${article.author?.name || "Anonymous"}</a> </span> <span class="date" data-astro-cid-ylb2qzx2>${formatDate(article.publishedAt)}</span> <span class="read-time" data-astro-cid-ylb2qzx2>${calculateReadTime(article)} min read</span> </div> </div> </article>`)} </div> <div class="bottom-row" data-astro-cid-ylb2qzx2> ${sectionMainArticles.slice(2, 5).map((article) => renderTemplate`<article class="stacked-card" data-astro-cid-ylb2qzx2> <div class="stacked-image-wrapper" data-astro-cid-ylb2qzx2> <a${addAttribute(getArticleUrl(article), "href")} class="stacked-image-link" data-astro-cid-ylb2qzx2> ${article.featuredImage ? renderTemplate`<img${addAttribute(article.featuredImage, "src")}${addAttribute(article.title, "alt")} loading="lazy" data-astro-cid-ylb2qzx2>` : renderTemplate`<div class="placeholder-small" data-astro-cid-ylb2qzx2>📰</div>`} </a> </div> <div class="stacked-content" data-astro-cid-ylb2qzx2> <a${addAttribute(`/categories/${cat.slug}`, "href")} class="category-tag category-link-safe" data-astro-cid-ylb2qzx2>${cat.displayName}</a> <h4 data-astro-cid-ylb2qzx2><a${addAttribute(getArticleUrl(article), "href")} data-astro-cid-ylb2qzx2>${article.title}</a></h4> <p data-astro-cid-ylb2qzx2>${article.excerpt}</p> <div class="stacked-meta" data-astro-cid-ylb2qzx2> <span class="author" data-astro-cid-ylb2qzx2>
By <a${addAttribute(`/authors/${typeof article.author?.slug === "object" ? article.author.slug.current : article.author?.slug || "anonymous"}`, "href")} class="author-link"${addAttribute(`View profile of ${article.author?.name || "Anonymous"}`, "aria-label")} data-astro-cid-ylb2qzx2>${article.author?.name || "Anonymous"}</a> </span> <span class="date" data-astro-cid-ylb2qzx2>${formatDate(article.publishedAt)}</span> <span class="read-time" data-astro-cid-ylb2qzx2>${calculateReadTime(article)} min read</span> </div> </div> </article>`)} </div> </div> </div> <div class="sidebar sticky-col marketing-sidebar" data-astro-cid-ylb2qzx2> ${renderComponent($$result2, "HomepageNewsletterSidebar", $$HomepageNewsletterSidebar, { "categorySlug": cat.slug, "articles": allCategoryArticles, "mainGridCount": counts.main, "data-astro-cid-ylb2qzx2": true })} </div> </div> </section> ` })}`;
    }
    if (cat.slug === "business") {
      return renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-ylb2qzx2": true }, { "default": async ($$result2) => renderTemplate` <section class="content-section priority-high"${addAttribute(cat.slug, "id")} data-astro-cid-ylb2qzx2> <div class="section-header" data-astro-cid-ylb2qzx2> <h2 class="section-title" data-astro-cid-ylb2qzx2><a${addAttribute(`/categories/${cat.slug}`, "href")} data-astro-cid-ylb2qzx2>${cat.displayName}</a></h2> <a${addAttribute(`/categories/${cat.slug}`, "href")} class="view-all-link" data-astro-cid-ylb2qzx2>View All →</a> </div> <div class="section-layout" data-astro-cid-ylb2qzx2> <div class="main-content" data-astro-cid-ylb2qzx2> <div class="grid-layout-special" data-astro-cid-ylb2qzx2> <div class="top-row" data-astro-cid-ylb2qzx2> ${sectionMainArticles.slice(0, 2).map((article) => renderTemplate`<article class="large-card" data-astro-cid-ylb2qzx2> <a${addAttribute(getArticleUrl(article), "href")} class="card-image-link" data-astro-cid-ylb2qzx2> <div class="card-image" style="aspect-ratio: 16/9;" data-astro-cid-ylb2qzx2> ${article.featuredImage ? renderTemplate`<img${addAttribute(article.featuredImage, "src")}${addAttribute(article.title, "alt")} loading="lazy" style="object-fit: cover; width: 100%; height: 100%;" data-astro-cid-ylb2qzx2>` : renderTemplate`<div class="placeholder-image" data-astro-cid-ylb2qzx2>📰</div>`} <div class="card-image-gradient" style="position:absolute;left:0;bottom:0;width:100%;height:40%;background:linear-gradient(180deg,rgba(24,25,26,0) 0%,rgba(24,25,26,0.7) 100%);" data-astro-cid-ylb2qzx2></div> </div> </a> <div class="card-content" data-astro-cid-ylb2qzx2> <a href="/categories/business" class="category-tag category-link-safe" data-astro-cid-ylb2qzx2>Business</a> <div style="height: 16px;" data-astro-cid-ylb2qzx2></div> <h3 style="font-weight:800;" data-astro-cid-ylb2qzx2><a${addAttribute(getArticleUrl(article), "href")} data-astro-cid-ylb2qzx2>${article.title}</a></h3> <p data-astro-cid-ylb2qzx2>${article.excerpt}</p> <div class="card-meta" data-astro-cid-ylb2qzx2> <span class="author" data-astro-cid-ylb2qzx2>
By <a${addAttribute(`/authors/${typeof article.author?.slug === "object" ? article.author.slug.current : article.author?.slug || "anonymous"}`, "href")} class="author-link"${addAttribute(`View profile of ${article.author?.name || "Anonymous"}`, "aria-label")} data-astro-cid-ylb2qzx2>${article.author?.name || "Anonymous"}</a> </span> <span class="date" data-astro-cid-ylb2qzx2>${formatDate(article.publishedAt)}</span> <span class="read-time" data-astro-cid-ylb2qzx2>${calculateReadTime(article)} min read</span> </div> </div> </article>`)} </div> <div class="bottom-row" data-astro-cid-ylb2qzx2> ${sectionMainArticles.slice(2, 5).map((article) => renderTemplate`<article class="stacked-card" data-astro-cid-ylb2qzx2> <div class="stacked-image-wrapper" data-astro-cid-ylb2qzx2> <a${addAttribute(getArticleUrl(article), "href")} class="stacked-image-link" data-astro-cid-ylb2qzx2> ${article.featuredImage ? renderTemplate`<img${addAttribute(article.featuredImage, "src")}${addAttribute(article.title, "alt")} loading="lazy" data-astro-cid-ylb2qzx2>` : renderTemplate`<div class="placeholder-small" data-astro-cid-ylb2qzx2>📰</div>`} </a> </div> <div class="stacked-content" data-astro-cid-ylb2qzx2> <a href="/categories/business" class="category-tag category-link-safe" data-astro-cid-ylb2qzx2>Business</a> <h4 data-astro-cid-ylb2qzx2><a${addAttribute(getArticleUrl(article), "href")} data-astro-cid-ylb2qzx2>${article.title}</a></h4> <p data-astro-cid-ylb2qzx2>${article.excerpt}</p> <div class="stacked-meta" data-astro-cid-ylb2qzx2> <span class="author" data-astro-cid-ylb2qzx2>
By <a${addAttribute(`/authors/${typeof article.author?.slug === "object" ? article.author.slug.current : article.author?.slug || "anonymous"}`, "href")} class="author-link"${addAttribute(`View profile of ${article.author?.name || "Anonymous"}`, "aria-label")} data-astro-cid-ylb2qzx2>${article.author?.name || "Anonymous"}</a> </span> <span class="date" data-astro-cid-ylb2qzx2>${formatDate(article.publishedAt)}</span> <span class="read-time" data-astro-cid-ylb2qzx2>${calculateReadTime(article)} min read</span> </div> </div> </article>`)} </div> </div> </div> <div class="sidebar sticky-col business-sidebar" data-astro-cid-ylb2qzx2> ${renderComponent($$result2, "HomepagePartnerSidebar", $$HomepagePartnerSidebar, { "categorySlug": cat.slug, "articles": allCategoryArticles, "mainGridCount": counts.main, "priority": getPriorityLevel(cat.slug), "data-astro-cid-ylb2qzx2": true })} </div> </div> </section> ` })}`;
    }
    if (cat.slug === "ai-agents") {
      return renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-ylb2qzx2": true }, { "default": async ($$result2) => renderTemplate` <section class="content-section priority-medium"${addAttribute(cat.slug, "id")} data-astro-cid-ylb2qzx2> <div class="section-header" data-astro-cid-ylb2qzx2> <h2 class="section-title" data-astro-cid-ylb2qzx2><a${addAttribute(`/categories/${cat.slug}`, "href")} data-astro-cid-ylb2qzx2>${cat.displayName}</a></h2> <a${addAttribute(`/categories/${cat.slug}`, "href")} class="view-all-link" data-astro-cid-ylb2qzx2>View All →</a> </div> <div class="section-layout ai-agents-section-layout" data-astro-cid-ylb2qzx2> <div class="main-content" data-astro-cid-ylb2qzx2> <div class="grid-layout-special" data-astro-cid-ylb2qzx2> <div class="top-row" data-astro-cid-ylb2qzx2> ${sectionMainArticles.slice(0, 2).map((article) => renderTemplate`<article class="large-card" data-astro-cid-ylb2qzx2> <a${addAttribute(getArticleUrl(article), "href")} class="card-image-link" data-astro-cid-ylb2qzx2> <div class="card-image" style="aspect-ratio: 16/9; height: 250px;" data-astro-cid-ylb2qzx2> ${article.featuredImage ? renderTemplate`<img${addAttribute(article.featuredImage, "src")}${addAttribute(article.title, "alt")} loading="lazy" style="object-fit: cover; width: 100%; height: 100%;" data-astro-cid-ylb2qzx2>` : renderTemplate`<div class="placeholder-image" data-astro-cid-ylb2qzx2>📰</div>`} <div class="card-image-gradient" style="position:absolute;left:0;bottom:0;width:100%;height:40%;background:linear-gradient(180deg,rgba(24,25,26,0) 0%,rgba(24,25,26,0.7) 100%);" data-astro-cid-ylb2qzx2></div> </div> </a> <div class="card-content" data-astro-cid-ylb2qzx2> <a${addAttribute(`/categories/${cat.slug}`, "href")} class="category-tag category-link-safe" data-astro-cid-ylb2qzx2>${cat.displayName}</a> <div style="height: 16px;" data-astro-cid-ylb2qzx2></div> <h3 style="font-weight:800;" data-astro-cid-ylb2qzx2><a${addAttribute(getArticleUrl(article), "href")} data-astro-cid-ylb2qzx2>${article.title}</a></h3> <p data-astro-cid-ylb2qzx2>${article.excerpt}</p> <div class="card-meta" data-astro-cid-ylb2qzx2> <span class="author" data-astro-cid-ylb2qzx2>
By <a${addAttribute(`/authors/${typeof article.author?.slug === "object" ? article.author.slug.current : article.author?.slug || "anonymous"}`, "href")} class="author-link"${addAttribute(`View profile of ${article.author?.name || "Anonymous"}`, "aria-label")} data-astro-cid-ylb2qzx2>${article.author?.name || "Anonymous"}</a> </span> <span class="date" data-astro-cid-ylb2qzx2>${formatDate(article.publishedAt)}</span> <span class="read-time" data-astro-cid-ylb2qzx2>${calculateReadTime(article)} min read</span> </div> </div> </article>`)} </div> <div class="bottom-row" data-astro-cid-ylb2qzx2> ${sectionMainArticles.slice(2, 4).map((article) => renderTemplate`<article class="stacked-card" data-astro-cid-ylb2qzx2> <div class="stacked-image-wrapper" data-astro-cid-ylb2qzx2> <a${addAttribute(getArticleUrl(article), "href")} class="stacked-image-link" data-astro-cid-ylb2qzx2> ${article.featuredImage ? renderTemplate`<img${addAttribute(article.featuredImage, "src")}${addAttribute(article.title, "alt")} loading="lazy" data-astro-cid-ylb2qzx2>` : renderTemplate`<div class="placeholder-small" data-astro-cid-ylb2qzx2>📰</div>`} </a> </div> <div class="stacked-content" data-astro-cid-ylb2qzx2> <a${addAttribute(`/categories/${cat.slug}`, "href")} class="category-tag category-link-safe" data-astro-cid-ylb2qzx2>${cat.displayName}</a> <h4 data-astro-cid-ylb2qzx2><a${addAttribute(getArticleUrl(article), "href")} data-astro-cid-ylb2qzx2>${article.title}</a></h4> <p data-astro-cid-ylb2qzx2>${article.excerpt}</p> <div class="stacked-meta" data-astro-cid-ylb2qzx2> <span class="author" data-astro-cid-ylb2qzx2>
By <a${addAttribute(`/authors/${typeof article.author?.slug === "object" ? article.author.slug.current : article.author?.slug || "anonymous"}`, "href")} class="author-link"${addAttribute(`View profile of ${article.author?.name || "Anonymous"}`, "aria-label")} data-astro-cid-ylb2qzx2>${article.author?.name || "Anonymous"}</a> </span> <span class="date" data-astro-cid-ylb2qzx2>${formatDate(article.publishedAt)}</span> <span class="read-time" data-astro-cid-ylb2qzx2>${calculateReadTime(article)} min read</span> </div> </div> </article>`)} </div> </div> </div> <div class="sidebar sticky-col ai-agents-sidebar" data-astro-cid-ylb2qzx2> ${renderComponent($$result2, "HomepagePartnerSidebar", $$HomepagePartnerSidebar, { "categorySlug": cat.slug, "articles": allCategoryArticles, "mainGridCount": counts.main, "priority": getPriorityLevel(cat.slug), "data-astro-cid-ylb2qzx2": true })} </div> </div> </section> ` })}`;
    }
    if (cat.slug === "productivity") {
      return renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-ylb2qzx2": true }, { "default": async ($$result2) => renderTemplate` <section class="content-section priority-medium"${addAttribute(cat.slug, "id")} data-astro-cid-ylb2qzx2> <div class="section-header" data-astro-cid-ylb2qzx2> <h2 class="section-title" data-astro-cid-ylb2qzx2><a${addAttribute(`/categories/${cat.slug}`, "href")} data-astro-cid-ylb2qzx2>${cat.displayName}</a></h2> <a${addAttribute(`/categories/${cat.slug}`, "href")} class="view-all-link" data-astro-cid-ylb2qzx2>View All →</a> </div> <div class="section-layout marketing-section-layout" data-astro-cid-ylb2qzx2> <div class="main-content" data-astro-cid-ylb2qzx2> <div class="grid-layout-special" data-astro-cid-ylb2qzx2> <div class="top-row" data-astro-cid-ylb2qzx2> ${sectionMainArticles.slice(0, 2).map((article) => renderTemplate`<article class="large-card" data-astro-cid-ylb2qzx2> <a${addAttribute(getArticleUrl(article), "href")} class="card-image-link" data-astro-cid-ylb2qzx2> <div class="card-image" style="aspect-ratio: 16/9; height: 250px;" data-astro-cid-ylb2qzx2> ${article.featuredImage ? renderTemplate`<img${addAttribute(article.featuredImage, "src")}${addAttribute(article.title, "alt")} loading="lazy" style="object-fit: cover; width: 100%; height: 100%;" data-astro-cid-ylb2qzx2>` : renderTemplate`<div class="placeholder-image" data-astro-cid-ylb2qzx2>📰</div>`} <div class="card-image-gradient" style="position:absolute;left:0;bottom:0;width:100%;height:40%;background:linear-gradient(180deg,rgba(24,25,26,0) 0%,rgba(24,25,26,0.7) 100%);" data-astro-cid-ylb2qzx2></div> </div> </a> <div class="card-content" data-astro-cid-ylb2qzx2> <a${addAttribute(`/categories/${cat.slug}`, "href")} class="category-tag category-link-safe" data-astro-cid-ylb2qzx2>${cat.displayName}</a> <div style="height: 16px;" data-astro-cid-ylb2qzx2></div> <h3 style="font-weight:800;" data-astro-cid-ylb2qzx2><a${addAttribute(getArticleUrl(article), "href")} data-astro-cid-ylb2qzx2>${article.title}</a></h3> <p data-astro-cid-ylb2qzx2>${article.excerpt}</p> <div class="card-meta" data-astro-cid-ylb2qzx2> <span class="author" data-astro-cid-ylb2qzx2>
By <a${addAttribute(`/authors/${typeof article.author?.slug === "object" ? article.author.slug.current : article.author?.slug || "anonymous"}`, "href")} class="author-link"${addAttribute(`View profile of ${article.author?.name || "Anonymous"}`, "aria-label")} data-astro-cid-ylb2qzx2>${article.author?.name || "Anonymous"}</a> </span> <span class="date" data-astro-cid-ylb2qzx2>${formatDate(article.publishedAt)}</span> <span class="read-time" data-astro-cid-ylb2qzx2>${calculateReadTime(article)} min read</span> </div> </div> </article>`)} </div> <div class="bottom-row" data-astro-cid-ylb2qzx2> ${sectionMainArticles.slice(2, 4).map((article) => renderTemplate`<article class="stacked-card" data-astro-cid-ylb2qzx2> <div class="stacked-image-wrapper" data-astro-cid-ylb2qzx2> <a${addAttribute(getArticleUrl(article), "href")} class="stacked-image-link" data-astro-cid-ylb2qzx2> ${article.featuredImage ? renderTemplate`<img${addAttribute(article.featuredImage, "src")}${addAttribute(article.title, "alt")} loading="lazy" data-astro-cid-ylb2qzx2>` : renderTemplate`<div class="placeholder-small" data-astro-cid-ylb2qzx2>📰</div>`} </a> </div> <div class="stacked-content" data-astro-cid-ylb2qzx2> <a${addAttribute(`/categories/${cat.slug}`, "href")} class="category-tag category-link-safe" data-astro-cid-ylb2qzx2>${cat.displayName}</a> <h4 data-astro-cid-ylb2qzx2><a${addAttribute(getArticleUrl(article), "href")} data-astro-cid-ylb2qzx2>${article.title}</a></h4> <p data-astro-cid-ylb2qzx2>${article.excerpt}</p> <div class="stacked-meta" data-astro-cid-ylb2qzx2> <span class="author" data-astro-cid-ylb2qzx2>
By <a${addAttribute(`/authors/${typeof article.author?.slug === "object" ? article.author.slug.current : article.author?.slug || "anonymous"}`, "href")} class="author-link"${addAttribute(`View profile of ${article.author?.name || "Anonymous"}`, "aria-label")} data-astro-cid-ylb2qzx2>${article.author?.name || "Anonymous"}</a> </span> <span class="date" data-astro-cid-ylb2qzx2>${formatDate(article.publishedAt)}</span> <span class="read-time" data-astro-cid-ylb2qzx2>${calculateReadTime(article)} min read</span> </div> </div> </article>`)} </div> </div> </div> <div class="sidebar sticky-col productivity-sidebar" data-astro-cid-ylb2qzx2> ${renderComponent($$result2, "HomepagePartnerSidebar", $$HomepagePartnerSidebar, { "categorySlug": cat.slug, "articles": allCategoryArticles, "mainGridCount": counts.main, "priority": getPriorityLevel(cat.slug), "data-astro-cid-ylb2qzx2": true })} </div> </div> </section> ` })}`;
    }
    if (cat.slug === "creative") {
      return renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-ylb2qzx2": true }, { "default": async ($$result2) => renderTemplate` <section class="content-section priority-low"${addAttribute(cat.slug, "id")} data-astro-cid-ylb2qzx2> <div class="section-header" data-astro-cid-ylb2qzx2> <h2 class="section-title" data-astro-cid-ylb2qzx2><a${addAttribute(`/categories/${cat.slug}`, "href")} data-astro-cid-ylb2qzx2>${cat.displayName}</a></h2> <a${addAttribute(`/categories/${cat.slug}`, "href")} class="view-all-link" data-astro-cid-ylb2qzx2>View All →</a> </div> <div class="section-layout creative-section-layout" data-astro-cid-ylb2qzx2> <div class="main-content" data-astro-cid-ylb2qzx2> <div class="grid-layout-special" data-astro-cid-ylb2qzx2> <div class="top-row" data-astro-cid-ylb2qzx2> ${sectionMainArticles.slice(0, 1).map((article) => renderTemplate`<article class="large-card" data-astro-cid-ylb2qzx2> <a${addAttribute(getArticleUrl(article), "href")} class="card-image-link" data-astro-cid-ylb2qzx2> <div class="card-image" style="aspect-ratio: 16/9; height: 250px;" data-astro-cid-ylb2qzx2> ${article.featuredImage ? renderTemplate`<img${addAttribute(article.featuredImage, "src")}${addAttribute(article.title, "alt")} loading="lazy" style="object-fit: cover; width: 100%; height: 100%;" data-astro-cid-ylb2qzx2>` : renderTemplate`<div class="placeholder-image" data-astro-cid-ylb2qzx2>📰</div>`} <div class="card-image-gradient" style="position:absolute;left:0;bottom:0;width:100%;height:40%;background:linear-gradient(180deg,rgba(24,25,26,0) 0%,rgba(24,25,26,0.7) 100%);" data-astro-cid-ylb2qzx2></div> </div> </a> <div class="card-content" data-astro-cid-ylb2qzx2> <a${addAttribute(`/categories/${cat.slug}`, "href")} class="category-tag category-link-safe" data-astro-cid-ylb2qzx2>${cat.displayName}</a> <div style="height: 16px;" data-astro-cid-ylb2qzx2></div> <h3 style="font-weight:800;" data-astro-cid-ylb2qzx2><a${addAttribute(getArticleUrl(article), "href")} data-astro-cid-ylb2qzx2>${article.title}</a></h3> <p data-astro-cid-ylb2qzx2>${article.excerpt}</p> <div class="card-meta" data-astro-cid-ylb2qzx2> <span class="author" data-astro-cid-ylb2qzx2>
By <a${addAttribute(`/authors/${typeof article.author?.slug === "object" ? article.author.slug.current : article.author?.slug || "anonymous"}`, "href")} class="author-link"${addAttribute(`View profile of ${article.author?.name || "Anonymous"}`, "aria-label")} data-astro-cid-ylb2qzx2>${article.author?.name || "Anonymous"}</a> </span> <span class="date" data-astro-cid-ylb2qzx2>${formatDate(article.publishedAt)}</span> <span class="read-time" data-astro-cid-ylb2qzx2>${calculateReadTime(article)} min read</span> </div> </div> </article>`)} </div> <div class="bottom-row" data-astro-cid-ylb2qzx2> ${sectionMainArticles.slice(1, 3).map((article) => renderTemplate`<article class="stacked-card" data-astro-cid-ylb2qzx2> <div class="stacked-image-wrapper" data-astro-cid-ylb2qzx2> <a${addAttribute(getArticleUrl(article), "href")} class="stacked-image-link" data-astro-cid-ylb2qzx2> ${article.featuredImage ? renderTemplate`<img${addAttribute(article.featuredImage, "src")}${addAttribute(article.title, "alt")} loading="lazy" data-astro-cid-ylb2qzx2>` : renderTemplate`<div class="placeholder-small" data-astro-cid-ylb2qzx2>📰</div>`} </a> </div> <div class="stacked-content" data-astro-cid-ylb2qzx2> <a${addAttribute(`/categories/${cat.slug}`, "href")} class="category-tag category-link-safe" data-astro-cid-ylb2qzx2>${cat.displayName}</a> <h4 data-astro-cid-ylb2qzx2><a${addAttribute(getArticleUrl(article), "href")} data-astro-cid-ylb2qzx2>${article.title}</a></h4> <p data-astro-cid-ylb2qzx2>${article.excerpt}</p> <div class="stacked-meta" data-astro-cid-ylb2qzx2> <span class="author" data-astro-cid-ylb2qzx2>
By <a${addAttribute(`/authors/${typeof article.author?.slug === "object" ? article.author.slug.current : article.author?.slug || "anonymous"}`, "href")} class="author-link"${addAttribute(`View profile of ${article.author?.name || "Anonymous"}`, "aria-label")} data-astro-cid-ylb2qzx2>${article.author?.name || "Anonymous"}</a> </span> <span class="date" data-astro-cid-ylb2qzx2>${formatDate(article.publishedAt)}</span> <span class="read-time" data-astro-cid-ylb2qzx2>${calculateReadTime(article)} min read</span> </div> </div> </article>`)} </div> </div> </div> <div class="sidebar sticky-col creative-sidebar" data-astro-cid-ylb2qzx2> ${renderComponent($$result2, "HomepagePartnerSidebar", $$HomepagePartnerSidebar, { "categorySlug": cat.slug, "articles": allCategoryArticles, "mainGridCount": counts.main, "sidebarCount": counts.sidebar, "priority": getPriorityLevel(cat.slug), "data-astro-cid-ylb2qzx2": true })} </div> </div> </section> ` })}`;
    }
    if (cat.slug === "ecommerce") {
      return renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-ylb2qzx2": true }, { "default": async ($$result2) => renderTemplate` <section class="content-section priority-low"${addAttribute(cat.slug, "id")} data-astro-cid-ylb2qzx2> <div class="section-header" data-astro-cid-ylb2qzx2> <h2 class="section-title" data-astro-cid-ylb2qzx2><a${addAttribute(`/categories/${cat.slug}`, "href")} data-astro-cid-ylb2qzx2>${cat.displayName}</a></h2> <a${addAttribute(`/categories/${cat.slug}`, "href")} class="view-all-link" data-astro-cid-ylb2qzx2>View All →</a> </div> <div class="section-layout creative-section-layout" data-astro-cid-ylb2qzx2> <div class="main-content" data-astro-cid-ylb2qzx2> <div class="grid-layout-special" data-astro-cid-ylb2qzx2> <div class="top-row" data-astro-cid-ylb2qzx2> ${sectionMainArticles.slice(0, 1).map((article) => renderTemplate`<article class="large-card" data-astro-cid-ylb2qzx2> <a${addAttribute(getArticleUrl(article), "href")} class="card-image-link" data-astro-cid-ylb2qzx2> <div class="card-image" style="aspect-ratio: 16/9; height: 250px;" data-astro-cid-ylb2qzx2> ${article.featuredImage ? renderTemplate`<img${addAttribute(article.featuredImage, "src")}${addAttribute(article.title, "alt")} loading="lazy" style="object-fit: cover; width: 100%; height: 100%;" data-astro-cid-ylb2qzx2>` : renderTemplate`<div class="placeholder-image" data-astro-cid-ylb2qzx2>📰</div>`} <div class="card-image-gradient" style="position:absolute;left:0;bottom:0;width:100%;height:40%;background:linear-gradient(180deg,rgba(24,25,26,0) 0%,rgba(24,25,26,0.7) 100%);" data-astro-cid-ylb2qzx2></div> </div> </a> <div class="card-content" data-astro-cid-ylb2qzx2> <a${addAttribute(`/categories/${cat.slug}`, "href")} class="category-tag category-link-safe" data-astro-cid-ylb2qzx2>${cat.displayName}</a> <div style="height: 16px;" data-astro-cid-ylb2qzx2></div> <h3 style="font-weight:800;" data-astro-cid-ylb2qzx2><a${addAttribute(getArticleUrl(article), "href")} data-astro-cid-ylb2qzx2>${article.title}</a></h3> <p data-astro-cid-ylb2qzx2>${article.excerpt}</p> <div class="card-meta" data-astro-cid-ylb2qzx2> <span class="author" data-astro-cid-ylb2qzx2>
By <a${addAttribute(`/authors/${typeof article.author?.slug === "object" ? article.author.slug.current : article.author?.slug || "anonymous"}`, "href")} class="author-link"${addAttribute(`View profile of ${article.author?.name || "Anonymous"}`, "aria-label")} data-astro-cid-ylb2qzx2>${article.author?.name || "Anonymous"}</a> </span> <span class="date" data-astro-cid-ylb2qzx2>${formatDate(article.publishedAt)}</span> <span class="read-time" data-astro-cid-ylb2qzx2>${calculateReadTime(article)} min read</span> </div> </div> </article>`)} </div> <div class="bottom-row" data-astro-cid-ylb2qzx2> ${sectionMainArticles.slice(1, 3).map((article) => renderTemplate`<article class="stacked-card" data-astro-cid-ylb2qzx2> <div class="stacked-image-wrapper" data-astro-cid-ylb2qzx2> <a${addAttribute(getArticleUrl(article), "href")} class="stacked-image-link" data-astro-cid-ylb2qzx2> ${article.featuredImage ? renderTemplate`<img${addAttribute(article.featuredImage, "src")}${addAttribute(article.title, "alt")} loading="lazy" data-astro-cid-ylb2qzx2>` : renderTemplate`<div class="placeholder-small" data-astro-cid-ylb2qzx2>📰</div>`} </a> </div> <div class="stacked-content" data-astro-cid-ylb2qzx2> <a${addAttribute(`/categories/${cat.slug}`, "href")} class="category-tag category-link-safe" data-astro-cid-ylb2qzx2>${cat.displayName}</a> <h4 data-astro-cid-ylb2qzx2><a${addAttribute(getArticleUrl(article), "href")} data-astro-cid-ylb2qzx2>${article.title}</a></h4> <p data-astro-cid-ylb2qzx2>${article.excerpt}</p> <div class="stacked-meta" data-astro-cid-ylb2qzx2> <span class="author" data-astro-cid-ylb2qzx2>
By <a${addAttribute(`/authors/${typeof article.author?.slug === "object" ? article.author.slug.current : article.author?.slug || "anonymous"}`, "href")} class="author-link"${addAttribute(`View profile of ${article.author?.name || "Anonymous"}`, "aria-label")} data-astro-cid-ylb2qzx2>${article.author?.name || "Anonymous"}</a> </span> <span class="date" data-astro-cid-ylb2qzx2>${formatDate(article.publishedAt)}</span> <span class="read-time" data-astro-cid-ylb2qzx2>${calculateReadTime(article)} min read</span> </div> </div> </article>`)} </div> </div> </div> <div class="sidebar sticky-col ecommerce-sidebar" data-astro-cid-ylb2qzx2> ${renderComponent($$result2, "HomepagePartnerSidebar", $$HomepagePartnerSidebar, { "categorySlug": cat.slug, "articles": allCategoryArticles, "mainGridCount": counts.main, "sidebarCount": counts.sidebar, "priority": getPriorityLevel(cat.slug), "data-astro-cid-ylb2qzx2": true })} </div> </div> </section> ` })}`;
    }
    return null;
  })} </div> </section>  `;
}, "/workspaces/ai-news-site/src/components/AIBuzzLayout.astro", void 0);
const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "AI News - Latest Updates in Artificial Intelligence", "description": "Stay updated with the latest AI news, reviews, tutorials, and insights. Get comprehensive coverage of artificial intelligence breakthroughs, tools, and industry developments.", "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="main-content" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "HeroToggle", $$HeroToggle, { "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "CategoryShortcuts", $$CategoryShortcuts, { "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "UniversalPromo", $$UniversalPromo, { "adId": "leaderboard-main", "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "AIBuzzLayout", $$AIBuzzLayout, { "data-astro-cid-j7pv25f6": true })} <div class="footer-homepage-spacer" data-astro-cid-j7pv25f6></div> <div class="footer-padding-spacer" data-astro-cid-j7pv25f6></div> </div> ` })} `;
}, "/workspaces/ai-news-site/src/pages/index.astro", void 0);
const $$file = "/workspaces/ai-news-site/src/pages/index.astro";
const $$url = "";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
