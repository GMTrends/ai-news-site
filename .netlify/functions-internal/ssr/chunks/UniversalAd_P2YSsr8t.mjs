import { b as createAstro, d as createComponent, g as renderTemplate, h as defineScriptVars, u as unescapeHTML, m as maybeRenderHead, e as addAttribute } from "./vendor_BQ-iwbOC.mjs";
import "kleur/colors";
import "clsx";
import { AdManager } from "./adConfig_CXa8_-6N.mjs";
import { HybridAdManager } from "./sanityAds_B8vG8Qpv.mjs";
/* empty css                                 */
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("http://localhost:4321");
const $$UniversalAd = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$UniversalAd;
  const { adId, adConfig, className = "" } = Astro2.props;
  console.log(`UniversalAd: Rendering component for adId='${adId}'`);
  let ad = adConfig;
  if (!ad) {
    try {
      ad = await HybridAdManager.getAdById(adId);
      console.log(`UniversalAd: HybridAdManager.getAdById('${adId}') returned:`, ad);
      if (!ad) {
        console.log(`UniversalAd: Sanity CMS doesn't have '${adId}', trying local AdManager...`);
        ad = AdManager.getAdById(adId);
        console.log(`UniversalAd: Local AdManager.getAdById('${adId}') returned:`, ad);
      }
      if (!ad) {
        console.warn(`UniversalAd: No ad found for ID '${adId}' in both Sanity CMS and local config. Creating minimal fallback.`);
        ad = {
          id: adId,
          type: "sidebar",
          placement: "fallback",
          active: true,
          priority: 999,
          title: "Partner Content",
          description: "Discover amazing AI tools for entrepreneurs",
          cta: "Learn More",
          ctaUrl: "#",
          icon: "🚀",
          dimensions: { width: 300, height: 250 },
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
            eventCategory: "partner_content",
            eventAction: "click"
          },
          revenue: {
            cpm: 0,
            estimatedMonthlyRevenue: 0,
            adNetwork: "fallback"
          }
        };
      }
    } catch (error) {
      console.error(`UniversalAd: Error loading ad '${adId}':`, error);
      try {
        const { AdManager: AdManager2 } = await import("./adConfig_CXa8_-6N.mjs");
        ad = AdManager2.getAdById(adId);
        console.log(`UniversalAd: Direct local config fallback for '${adId}':`, ad);
      } catch (localError) {
        console.error(`UniversalAd: Local config fallback also failed:`, localError);
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
          dimensions: { width: 300, height: 250 },
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
  console.log(`🔍 UniversalAd Final Debug for ${adId}:`, {
    adFound: !!ad,
    adType: ad?.type,
    adActive: ad?.active,
    isHeroType: ad?.type === "hero",
    adTitle: ad?.title,
    willRenderHero: ad && ad.type === "hero"
  });
  if (!ad || !ad.active) {
    console.error(`UniversalAd: Critical error - no ad available for '${adId}'`);
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
  console.log("UniversalAd Debug:", {
    adId: Astro2.props.adId,
    ad: ad ? { id: ad.id, type: ad.type, title: ad.title } : "null",
    className: Astro2.props.className || "none"
  });
  if (ad && ad.type === "leaderboard") {
    console.log("🎯 LEADERBOARD AD DETECTED:", {
      id: ad.id,
      type: ad.type,
      title: ad.title,
      willRenderSpectacular: true
    });
  }
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
    
    // Track click in console for debugging
    console.log('Promo clicked:', {
      id: '${ad.id}',
      placement: '${ad.placement}',
      type: '${ad.type}'
    });
  }
`;
  return renderTemplate(_a || (_a = __template(["<!-- UniversalAd Component - Proper Styled Rendering -->", "<!-- JavaScript for Analytics Tracking --><script>", "<\/script><script>(function(){", "\n  // Inject the tracking function\n  eval(trackingCode);\n})();<\/script>"])), ad && renderTemplate`${maybeRenderHead()}<div${addAttribute(`universal-promo promo-${ad.type} promo-${ad.id} ${className}`, "class")}${addAttribute(ad.id, "data-promo-id")}>${ad.type === "sidebar" && ad.id !== "hero-premium-top" && renderTemplate`<a${addAttribute(ad.ctaUrl, "href")} class="sidebar-promo"${addAttribute(`trackPromoClick_${ad.id.replace(/-/g, "_")}()`, "onclick")} target="_blank" rel="noopener noreferrer"${addAttribute(`background: ${adStyles.background}; min-height: ${adStyles.height}px;`, "style")}>${ad.badge && renderTemplate`<span class="promo-badge">${ad.badge}</span>`}<div class="promo-content">${ad.icon && renderTemplate`<div class="promo-icon"><span class="icon-emoji">${ad.icon}</span></div>`}<h3 class="promo-title gradient-text">${ad.title}</h3><p class="promo-description">${ad.description}</p><span class="promo-cta">${ad.cta}</span></div></a>`}${ad.type === "leaderboard" && renderTemplate`<div class="leaderboard-promo-container"><a${addAttribute(ad.ctaUrl, "href")} class="leaderboard-promo-link"${addAttribute(`trackPromoClick_${ad.id.replace(/-/g, "_")}()`, "onclick")} target="_blank" rel="noopener noreferrer"><div class="leaderboard-floating-icon">${ad.icon && renderTemplate`<div class="leaderboard-icon-wrapper"><span class="leaderboard-icon-emoji">${ad.icon}</span><div class="leaderboard-icon-halo"></div></div>`}</div><div class="leaderboard-content">${ad.badge && renderTemplate`<div class="leaderboard-badge-wrapper"><span class="leaderboard-premium-badge">${ad.badge}</span></div>`}<h3 class="leaderboard-title">${ad.title}</h3><p class="leaderboard-description">${ad.description}</p></div><div class="leaderboard-cta-section"><span class="leaderboard-cta-button"><span class="leaderboard-cta-text">${ad.cta}</span><div class="leaderboard-cta-shine"></div></span></div><div class="leaderboard-particles"><div class="leaderboard-particle leaderboard-particle-1"></div><div class="leaderboard-particle leaderboard-particle-2"></div><div class="leaderboard-particle leaderboard-particle-3"></div></div></a></div>`}${(ad.type === "hero" || ad.id === "hero-premium-top") && renderTemplate`<div class="premium-hero-ad-container"><div class="premium-hero-ad-inner"><div class="premium-icon-section">${ad.icon && renderTemplate`<div class="premium-icon-wrapper"><span class="premium-icon-emoji">${ad.icon}</span></div>`}</div><div class="premium-content-section">${ad.badge && renderTemplate`<div class="premium-badge-wrapper"><span class="premium-badge">${ad.badge}</span></div>`}<h3 class="premium-title">${ad.title}</h3><p class="premium-description">${ad.description}</p><a${addAttribute(ad.ctaUrl, "href")} class="premium-cta-button"${addAttribute(`trackPromoClick_${ad.id.replace(/-/g, "_")}()`, "onclick")} target="_blank" rel="noopener noreferrer"><span class="premium-cta-text">${ad.cta}</span><svg class="premium-cta-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></a></div></div></div>`}</div>`, unescapeHTML(trackingCode), defineScriptVars({ trackingCode }));
}, "/workspaces/ai-news-site/src/components/UniversalAd.astro", void 0);
export {
  $$UniversalAd as $
};
