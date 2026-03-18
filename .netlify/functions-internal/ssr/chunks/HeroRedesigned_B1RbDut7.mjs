import { d as createComponent, m as maybeRenderHead, e as addAttribute, g as renderTemplate } from "./vendor_BQ-iwbOC.mjs";
import "kleur/colors";
import "clsx";
import { d as getFeaturedArticles, e as getArticlesByHeroPlacement } from "./data-vendor_CAsGKFmz.mjs";
/* empty css                         */
const $$HeroRedesigned = createComponent(async ($$result, $$props, $$slots) => {
  const allFeaturedArticles = await getFeaturedArticles(12);
  const largeArticles = await getArticlesByHeroPlacement("large", 3);
  const smallArticles = await getArticlesByHeroPlacement("small", 6);
  const mainArticle = largeArticles[0] || allFeaturedArticles[0] || {
    title: "Revolutionary AI Agent Framework Transforms Business Operations",
    excerpt: "Discover how Fortune 500 companies are using this breakthrough AI agent system to automate complex workflows and boost productivity by 300%. Industry leaders share exclusive insights into implementation strategies, cost savings, and competitive advantages that are reshaping entire industries.",
    publishedAt: "2025-08-22",
    author: { name: "Sarah Chen", slug: "sarah-chen" },
    category: { displayName: "AI Business", slug: { current: "business" } },
    slug: { current: "ai-agent-framework-transforms-business" },
    featuredImage: "placeholder-image"
  };
  const secondaryArticles = smallArticles.length > 0 ? smallArticles.slice(0, 3) : [
    {
      title: "ChatGPT-5 Release: What Industry Insiders Know",
      excerpt: "Exclusive early access insights and performance benchmarks reveal unprecedented capabilities in reasoning, creativity, and multimodal understanding.",
      publishedAt: "2025-08-21",
      author: { name: "Marcus Rodriguez", slug: "marcus-rodriguez" },
      category: { displayName: "Breaking News", slug: { current: "news" } },
      slug: { current: "chatgpt-5-industry-insights" },
      featuredImage: "placeholder-image-1"
    },
    {
      title: "AI Marketing Tools Driving 400% ROI",
      excerpt: "Case studies from top agencies using AI for campaign optimization show how machine learning algorithms are revolutionizing customer acquisition.",
      publishedAt: "2025-08-20",
      author: { name: "Jennifer Kim", slug: "jennifer-kim" },
      category: { displayName: "Marketing", slug: { current: "marketing" } },
      slug: { current: "ai-marketing-tools-roi" },
      featuredImage: "placeholder-image-2"
    },
    {
      title: "Enterprise AI Security: Complete Guide",
      excerpt: "Protect your AI infrastructure with proven security frameworks designed specifically for enterprise environments.",
      publishedAt: "2025-08-19",
      author: { name: "David Thompson", slug: "david-thompson" },
      category: { displayName: "Enterprise", slug: { current: "enterprise" } },
      slug: { current: "enterprise-ai-security-guide" },
      featuredImage: "placeholder-image-3"
    }
  ];
  function formatDate(dateString) {
    if (!dateString) return "Recently";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }
  function getResponsiveExcerpt(excerpt, mobileLength = 300, tabletLength = 400) {
    return {
      mobile: excerpt.length > mobileLength ? excerpt.substring(0, mobileLength) + "..." : excerpt,
      tablet: excerpt.length > tabletLength ? excerpt.substring(0, tabletLength) + "..." : excerpt,
      desktop: excerpt
    };
  }
  function getArticleUrl(article) {
    const category = article.category?.slug?.current || "articles";
    const slug = article.slug?.current || article.slug;
    return `/${category}/${slug}`;
  }
  function hexToRgba(hex, alpha = 0.2) {
    if (hex.startsWith("var(")) {
      return hex;
    }
    hex = hex.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  function getCategoryColor(category) {
    if (!category) return "rgba(245, 158, 11, 0.2)";
    if (category.color) {
      const colorMap = {
        "blue": "#3B82F6",
        // AI Marketing
        "green": "#10B981",
        // AI Business
        "teal": "#14B8A6",
        // AI Agents
        "purple": "#8B5CF6",
        // AI Creative
        "orange": "#F59E0B",
        // AI eCommerce
        "magenta": "#EC4899"
        // AI Coding
      };
      const color = colorMap[category.color];
      if (color) {
        return hexToRgba(color, 0.2);
      }
    }
    const categorySlug = category.slug?.current || "";
    const categoryName = (category.displayName || category.name || "").toLowerCase();
    const fallbackColors = {
      "business": "#059669",
      "finance": "#059669",
      "ai business": "#059669",
      "news": "#DC2626",
      "breaking": "#DC2626",
      "breaking news": "#DC2626",
      "marketing": "#7C3AED",
      "advertising": "#7C3AED",
      "ai marketing": "#7C3AED",
      "enterprise": "#2563EB",
      "corporate": "#2563EB",
      "b2b": "#2563EB",
      "ai": "#8B5CF6",
      "technology": "#8B5CF6",
      "tech": "#8B5CF6",
      "ai agents": "#14B8A6",
      "automation": "#14B8A6",
      "creative": "#EC4899",
      "design": "#EC4899",
      "ai creative": "#EC4899",
      "ecommerce": "#F59E0B",
      "sales": "#F59E0B",
      "ai ecommerce": "#F59E0B",
      "coding": "#EC4899",
      "development": "#EC4899",
      "programming": "#EC4899",
      "ai coding": "#EC4899",
      "productivity": "#10B981",
      "tools": "#10B981",
      "ai tools": "#10B981",
      "research": "#3B82F6",
      "analysis": "#3B82F6",
      "ai research": "#3B82F6"
    };
    const fallbackColor = fallbackColors[categorySlug] || fallbackColors[categoryName] || fallbackColors[categoryName.replace(/\s+/g, "-")] || // Handle spaces in names
    "#F59E0B";
    return hexToRgba(fallbackColor, 0.2);
  }
  return renderTemplate`${maybeRenderHead()}<section class="new-hero-redesigned" data-astro-cid-up3awnox> <div class="new-hero-container-new" data-astro-cid-up3awnox> <!-- Premium Header with Visual Impact --> <div class="new-hero-header-premium" data-astro-cid-up3awnox> <div class="new-authority-badge" data-astro-cid-up3awnox> <span class="new-badge-pulse" data-astro-cid-up3awnox></span> <span class="new-badge-text" data-astro-cid-up3awnox>Premium Intelligence</span> <span class="new-badge-icon" data-astro-cid-up3awnox>⚡</span> </div> <h1 class="new-hero-title-modern" data-astro-cid-up3awnox>The AI Edge Your Competitors Don't Have</h1> <p class="new-hero-subtitle-modern" data-astro-cid-up3awnox>Exclusive insights, insider access, and strategic intelligence from the AI frontier that drives real business results</p> <!-- Enhanced Newsletter CTA with Lead Magnet - 2 Column Layout --> <div class="new-newsletter-cta" data-astro-cid-up3awnox> <div class="new-cta-container" data-astro-cid-up3awnox> <div class="new-lead-magnet-grid" data-astro-cid-up3awnox> <!-- Left Column - Value Proposition --> <div class="new-lead-magnet-left" data-astro-cid-up3awnox> <div class="new-icon-headline" data-astro-cid-up3awnox> <div class="new-envelope-icon" style="margin-top: -0.5rem;" data-astro-cid-up3awnox>📧</div> <h3 class="new-cta-headline" data-astro-cid-up3awnox>Join 5,000+ Entrepreneurs Making $10K+/Month With AI</h3> </div> <ul class="new-subscribe-benefits" data-astro-cid-up3awnox> <li data-astro-cid-up3awnox><span class="new-benefit-icon" data-astro-cid-up3awnox>🤖</span> Discover AI money machines generating $1K-$10K/month</li> <li data-astro-cid-up3awnox><span class="new-benefit-icon" data-astro-cid-up3awnox>💎</span> Get AI automation setups that replace 10+ hours daily</li> <li data-astro-cid-up3awnox><span class="new-benefit-icon" data-astro-cid-up3awnox>⚡</span> First access to breakthrough AI tools before they go viral</li> <li data-astro-cid-up3awnox><span class="new-benefit-icon" data-astro-cid-up3awnox>🚀</span> Join exclusive community of successful AI entrepreneurs</li> </ul> <div class="new-social-proof-left" data-astro-cid-up3awnox> <div class="new-testimonial-card" data-astro-cid-up3awnox> <span class="new-social-proof-text" data-astro-cid-up3awnox>"This AI system helped me build a $15K/month side business" - Maria K., Tech Consultant</span> </div> <div class="new-success-stats" data-astro-cid-up3awnox> <div class="new-stat-item" data-astro-cid-up3awnox> <span class="new-stat-number" data-astro-cid-up3awnox>5,247</span> <span class="new-stat-label" data-astro-cid-up3awnox>Success Stories</span> </div> <div class="new-stat-item" data-astro-cid-up3awnox> <span class="new-stat-number" data-astro-cid-up3awnox>$2.3M+</span> <span class="new-stat-label" data-astro-cid-up3awnox>Revenue Generated</span> </div> </div> </div> </div> <!-- Right Column - Offer & Form --> <div class="new-lead-magnet-right" data-astro-cid-up3awnox> <div class="new-lead-magnet-offer" data-astro-cid-up3awnox> <div class="new-badge-with-emoji" data-astro-cid-up3awnox> <span class="new-offer-emoji" style="margin-top: -0.5rem;" data-astro-cid-up3awnox>🎁</span> <span class="new-free-badge" data-astro-cid-up3awnox>STEAL MY PRODUCTIVITY VAULT</span> </div> <div class="new-offer-content" data-astro-cid-up3awnox> <div data-astro-cid-up3awnox> <strong data-astro-cid-up3awnox>2025 AI Money & Productivity Vault</strong> <ul class="new-offer-bullets" data-astro-cid-up3awnox> <li data-astro-cid-up3awnox>$10K/Month AI Side Hustles (Copy-paste systems)</li> <li data-astro-cid-up3awnox>AI Agents That Do 10 Hours of Work in 10 Minutes</li> <li data-astro-cid-up3awnox>Personal AI Assistant Setup (makes money while you sleep)</li> <li data-astro-cid-up3awnox>AI Marketing Funnels That Convert 10X Better</li> </ul> </div> </div> </div> <form class="new-subscribe-form" data-astro-cid-up3awnox> <input type="email" name="email" class="new-subscribe-input" placeholder="Enter your email for instant access" required data-astro-cid-up3awnox> <button type="submit" class="new-subscribe-button" data-astro-cid-up3awnox> <span class="new-button-text" data-astro-cid-up3awnox> <span class="button-text-desktop" data-astro-cid-up3awnox>YES! I Want To 10X My Income With AI</span> <span class="button-text-mobile" data-astro-cid-up3awnox>10X My Income With AI →</span> </span> </button> </form> <div class="new-trust-signals" data-astro-cid-up3awnox> <span class="new-trust-text" data-astro-cid-up3awnox>🔒 No spam, unsubscribe anytime</span> <span class="new-gdpr-badge" data-astro-cid-up3awnox>🛡️ GDPR Compliant</span> <span class="new-security-badge" data-astro-cid-up3awnox>🔐 256-bit SSL</span> </div> </div> </div> </div> </div> </div> <!-- Dominant Feature Layout --> <div class="new-hero-main-grid" data-astro-cid-up3awnox> <!-- 70% Width Dominant Story --> <article class="new-dominant-feature" data-astro-cid-up3awnox> <div class="new-featured-label" data-astro-cid-up3awnox> <span class="new-label-dot" data-astro-cid-up3awnox></span> <span class="new-label-text" data-astro-cid-up3awnox>FEATURED STORY</span> </div> <a${addAttribute(getArticleUrl(mainArticle), "href")} class="new-dominant-story-link" data-astro-cid-up3awnox> <div class="new-dominant-image-container" data-astro-cid-up3awnox> ${mainArticle.featuredImage && mainArticle.featuredImage !== "placeholder-image" ? renderTemplate`<img${addAttribute(mainArticle.featuredImage, "src")}${addAttribute(mainArticle.title, "alt")} class="new-dominant-image" loading="lazy" data-astro-cid-up3awnox>` : renderTemplate`<div class="new-dominant-placeholder" data-astro-cid-up3awnox> <div class="new-placeholder-icon-large" data-astro-cid-up3awnox>🚀</div> <div class="new-placeholder-text-large" data-astro-cid-up3awnox>AI Agent Framework</div> </div>`} <div class="new-image-overlay-modern" data-astro-cid-up3awnox> <div class="new-overlay-content" data-astro-cid-up3awnox> <span class="new-read-time-modern" data-astro-cid-up3awnox>${mainArticle.readingTime ? `${mainArticle.readingTime} min read` : "5 min read"}</span> <span class="new-trending-pulse" data-astro-cid-up3awnox>🔥 Trending</span> </div> </div> </div> </a> <div class="new-dominant-content" data-astro-cid-up3awnox> ${mainArticle.category && renderTemplate`<a${addAttribute(`/categories/${mainArticle.category.slug?.current || "business"}`, "href")} class="new-category-modern"${addAttribute(`background: ${getCategoryColor(mainArticle.category)}`, "style")} data-astro-cid-up3awnox> ${mainArticle.category.displayName || "AI BUSINESS"} </a>`} <h2 class="new-dominant-headline" data-astro-cid-up3awnox> <a${addAttribute(getArticleUrl(mainArticle), "href")} data-astro-cid-up3awnox>${mainArticle.title}</a> </h2> <div class="new-dominant-excerpt"${addAttribute(mainArticle.excerpt, "data-full-excerpt")} data-astro-cid-up3awnox> <div class="new-excerpt-content" data-astro-cid-up3awnox> <span class="new-excerpt-mobile" data-astro-cid-up3awnox> ${getResponsiveExcerpt(mainArticle.excerpt).mobile} </span> <span class="new-excerpt-tablet" data-astro-cid-up3awnox>${getResponsiveExcerpt(mainArticle.excerpt).tablet}</span> <span class="new-excerpt-desktop" data-astro-cid-up3awnox>${getResponsiveExcerpt(mainArticle.excerpt).desktop}</span> </div> ${mainArticle.excerpt.length > 300 && renderTemplate`<div class="new-read-more-container" data-astro-cid-up3awnox> <a${addAttribute(getArticleUrl(mainArticle), "href")} class="new-read-more-btn" data-astro-cid-up3awnox> <span class="read-more-text" data-astro-cid-up3awnox>Read more →</span> </a> </div>`} </div> <div class="new-story-metadata" data-astro-cid-up3awnox> <div class="new-author-section-modern" data-astro-cid-up3awnox> <div class="new-author-avatar-modern" data-astro-cid-up3awnox> ${mainArticle.author?.name?.charAt(0) || "A"} </div> <div class="new-author-details" data-astro-cid-up3awnox> <a${addAttribute(`/authors/${mainArticle.author?.slug || "ai-expert"}`, "href")} class="new-author-name-modern" data-astro-cid-up3awnox>${mainArticle.author?.name || "AI Expert"}</a> <span class="new-date-separator" data-astro-cid-up3awnox>•</span> <span class="new-publish-date-modern" data-astro-cid-up3awnox>${formatDate(mainArticle.publishedAt)}</span> </div> </div> <div class="new-engagement-indicators" data-astro-cid-up3awnox> <span class="new-viral-badge" data-astro-cid-up3awnox>🚀 Viral</span> <span class="new-share-count" data-astro-cid-up3awnox>2.1K shares</span> </div> </div> </div> </article> <!-- 30% Sidebar with Strategic Placement --> <div class="new-premium-sidebar" data-astro-cid-up3awnox> <!-- Premium Ad - Strategic Position --> <div class="new-premium-sponsor-block" data-astro-cid-up3awnox> <div class="new-sponsor-label" data-astro-cid-up3awnox>PREMIUM SPONSOR</div> <div class="new-sponsor-content" data-astro-cid-up3awnox> <div class="new-sponsor-visual" data-astro-cid-up3awnox> <div class="new-sponsor-icon" data-astro-cid-up3awnox> <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-up3awnox> <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor" data-astro-cid-up3awnox></path> <path d="M19 15L19.74 17.74L22.5 18.5L19.74 19.26L19 22L18.26 19.26L15.5 18.5L18.26 17.74L19 15Z" fill="currentColor" data-astro-cid-up3awnox></path> <path d="M5 6L5.5 7.5L7 8L5.5 8.5L5 10L4.5 8.5L3 8L4.5 7.5L5 6Z" fill="currentColor" data-astro-cid-up3awnox></path> </svg> </div> <div class="new-sponsor-copy" data-astro-cid-up3awnox> <div class="new-sponsor-headline" data-astro-cid-up3awnox>Premium Advertising</div> <div class="new-sponsor-subline" data-astro-cid-up3awnox>Strategic placement for maximum impact</div> <div class="new-sponsor-benefits" data-astro-cid-up3awnox> <span class="new-benefit-tag" data-astro-cid-up3awnox>High Visibility</span> <span class="new-benefit-tag" data-astro-cid-up3awnox>Targeted Audience</span> </div> <a href="/advertise" class="new-sponsor-cta" data-astro-cid-up3awnox> <span data-astro-cid-up3awnox>Get Started</span> <svg class="new-cta-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-up3awnox> <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-up3awnox></path> </svg> </a> </div> </div> </div> </div> <!-- Intelligence Brief - Quick Reads --> <div class="new-intelligence-brief" data-astro-cid-up3awnox> <div class="new-brief-header" data-astro-cid-up3awnox> <span class="new-brief-icon" data-astro-cid-up3awnox>📊</span> <h3 class="new-brief-title" data-astro-cid-up3awnox>Intelligence Brief</h3> <span class="new-live-indicator" data-astro-cid-up3awnox>BREAKING</span> </div> <div class="new-brief-articles" data-astro-cid-up3awnox> ${secondaryArticles.slice(0, 3).map((article, index) => renderTemplate`<article class="new-brief-item" data-astro-cid-up3awnox> <div class="new-brief-image" data-astro-cid-up3awnox> ${article.featuredImage && article.featuredImage !== "placeholder-image-1" && article.featuredImage !== "placeholder-image-2" && article.featuredImage !== "placeholder-image-3" ? renderTemplate`<img${addAttribute(article.featuredImage, "src")}${addAttribute(article.title, "alt")} class="new-brief-thumbnail" loading="lazy" data-astro-cid-up3awnox>` : renderTemplate`<div class="new-brief-placeholder" data-astro-cid-up3awnox> <div class="new-placeholder-icon" data-astro-cid-up3awnox>📰</div> </div>`} </div> <div class="new-brief-content" data-astro-cid-up3awnox> ${article.category && renderTemplate`<a${addAttribute(`/categories/${article.category.slug?.current || "news"}`, "href")} class="new-brief-category"${addAttribute(`background: ${getCategoryColor(article.category)}`, "style")} data-astro-cid-up3awnox> ${article.category.displayName || "NEWS"} </a>`} <h4 class="new-brief-headline" data-astro-cid-up3awnox> <a${addAttribute(getArticleUrl(article), "href")} data-astro-cid-up3awnox>${article.title}</a> </h4> <div class="new-brief-meta" data-astro-cid-up3awnox> <a${addAttribute(`/authors/${article.author?.slug || "ai-reporter"}`, "href")} class="new-brief-author" data-astro-cid-up3awnox> ${article.author?.name || "AI Reporter"} </a> <span class="new-brief-time" data-astro-cid-up3awnox>${formatDate(article.publishedAt)}</span> </div> </div> </article>`)} </div> </div> <!-- AI Authority Proof --> <div class="new-authority-proof" data-astro-cid-up3awnox> <div class="new-proof-header" data-astro-cid-up3awnox> <span class="new-proof-icon" data-astro-cid-up3awnox>🏆</span> <h4 class="new-proof-title" data-astro-cid-up3awnox>Trusted by Industry Leaders</h4> </div> <div class="new-proof-stats" data-astro-cid-up3awnox> <div class="new-stat-item" data-astro-cid-up3awnox> <span class="new-stat-number" data-astro-cid-up3awnox>50K+</span> <span class="new-stat-label" data-astro-cid-up3awnox>AI Professionals</span> </div> <div class="new-stat-item" data-astro-cid-up3awnox> <span class="new-stat-number" data-astro-cid-up3awnox>500+</span> <span class="new-stat-label" data-astro-cid-up3awnox>Companies</span> </div> <div class="new-stat-item" data-astro-cid-up3awnox> <span class="new-stat-number" data-astro-cid-up3awnox>95%</span> <span class="new-stat-label" data-astro-cid-up3awnox>Read Rate</span> </div> </div> <div class="new-proof-testimonial" data-astro-cid-up3awnox> <p data-astro-cid-up3awnox>"The intelligence brief has become essential reading for our AI strategy team."</p> <cite data-astro-cid-up3awnox>— Sarah Johnson, Head of AI at TechCorp</cite> </div> </div> </div> </div> </div> </section>  `;
}, "/workspaces/ai-news-site/src/components/HeroRedesigned.astro", void 0);
export {
  $$HeroRedesigned as $
};
