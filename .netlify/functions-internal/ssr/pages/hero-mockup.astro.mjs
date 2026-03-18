import { d as createComponent, f as renderComponent, g as renderTemplate, m as maybeRenderHead, e as addAttribute } from "../chunks/vendor_BQ-iwbOC.mjs";
import "kleur/colors";
import { $ as $$MainLayout } from "../chunks/MainLayout_DdYH-KlJ.mjs";
import { d as getFeaturedArticles, e as getArticlesByHeroPlacement } from "../chunks/data-vendor_CAsGKFmz.mjs";
import { r } from "../chunks/data-vendor_CAsGKFmz.mjs";
/* empty css                                       */
const $$HeroMockup = createComponent(async ($$result, $$props, $$slots) => {
  const allFeaturedArticles = await getFeaturedArticles(12);
  const largeArticles = await getArticlesByHeroPlacement("large", 3);
  const smallArticles = await getArticlesByHeroPlacement("small", 6);
  const mainArticle = largeArticles[0] || allFeaturedArticles[0] || {
    title: "Revolutionary AI Agent Framework Transforms Business Operations",
    excerpt: "Discover how Fortune 500 companies are using this breakthrough AI agent system to automate complex workflows and boost productivity by 300%. Industry leaders share exclusive insights into implementation strategies, cost savings, and competitive advantages that are reshaping entire industries. From customer service automation to strategic decision-making, these AI agents are proving to be game-changers for businesses ready to embrace the future. Our comprehensive analysis covers initial assessment phases, team preparation strategies, full-scale deployment methodologies, and ongoing optimization techniques that ensure long-term success. Learn from real-world case studies featuring companies like Microsoft, Amazon, and Tesla, who have already implemented these frameworks and achieved unprecedented results. The system's modular architecture allows for seamless integration with existing infrastructure while providing scalability for future growth. Industry experts predict this technology will become the standard for enterprise automation within the next three years, making early adoption crucial for maintaining competitive advantage.",
    publishedAt: "2025-08-22",
    author: { name: "Sarah Chen", slug: "sarah-chen" },
    category: { displayName: "AI Business", slug: { current: "business" } },
    slug: { current: "ai-agent-framework-transforms-business" },
    featuredImage: "placeholder-image"
  };
  const secondaryArticles = smallArticles.length > 0 ? smallArticles.slice(0, 3) : [
    {
      title: "ChatGPT-5 Release: What Industry Insiders Know",
      excerpt: "Exclusive early access insights and performance benchmarks reveal unprecedented capabilities in reasoning, creativity, and multimodal understanding. Industry experts share detailed analysis of the new architecture, training methodologies, and real-world applications that demonstrate the system's revolutionary potential. Our comprehensive coverage includes detailed benchmarks against previous models, architectural improvements that enable enhanced reasoning capabilities, and practical applications across industries. The new multimodal understanding capabilities allow for seamless integration of text, image, audio, and video inputs, opening unprecedented possibilities for AI applications. Industry leaders discuss the implications for content creation, customer service automation, and creative workflows. Technical experts provide insights into the underlying transformer architecture improvements and training data enhancements that enable these breakthroughs. Early adopters share their experiences with the beta versions and discuss implementation strategies for enterprise environments.",
      publishedAt: "2025-08-21",
      author: { name: "Marcus Rodriguez", slug: "marcus-rodriguez" },
      category: { displayName: "Breaking News", slug: { current: "news" } },
      slug: { current: "chatgpt-5-industry-insights" },
      featuredImage: "placeholder-image-1"
    },
    {
      title: "AI Marketing Tools Driving 400% ROI",
      excerpt: "Case studies from top agencies using AI for campaign optimization show how machine learning algorithms are revolutionizing customer acquisition, retention, and lifetime value. Our in-depth analysis reveals how predictive analytics and personalized content generation are driving unprecedented ROI improvements. Industry leaders share their strategies for implementing AI-driven marketing automation, including customer segmentation techniques, dynamic pricing optimization, and real-time campaign adjustments. Learn how machine learning algorithms analyze customer behavior patterns to predict future purchasing decisions and optimize marketing spend accordingly. The comprehensive guide covers implementation strategies for businesses of all sizes, from startups to enterprise organizations. Discover how AI-powered tools are transforming email marketing, social media advertising, and content marketing strategies. Industry experts provide insights into the future of marketing automation and how businesses can prepare for the next wave of AI innovation.",
      publishedAt: "2025-08-20",
      author: { name: "Jennifer Kim", slug: "jennifer-kim" },
      category: { displayName: "Marketing", slug: { current: "marketing" } },
      slug: { current: "ai-marketing-tools-roi" },
      featuredImage: "placeholder-image-2"
    },
    {
      title: "Enterprise AI Security: Complete Guide",
      excerpt: "Protect your AI infrastructure with proven security frameworks designed specifically for enterprise environments. This comprehensive guide covers threat modeling, access controls, data privacy protection, model security protocols, and incident response strategies. Our expert analysis reveals the latest cybersecurity threats targeting AI systems and provides actionable defense strategies. Learn how to implement zero-trust security architectures, secure model training pipelines, and robust monitoring systems that detect and respond to threats in real-time. Industry leaders share their experiences with AI security breaches and the lessons learned from implementing comprehensive security frameworks. The guide includes detailed checklists for security audits, compliance requirements for different industries, and best practices for securing AI models in production environments. Discover how to balance security requirements with AI system performance and user experience, ensuring that security measures don't hinder innovation.",
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
    const r2 = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return `rgba(${r2}, ${g}, ${b}, ${alpha})`;
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
      // Business & Finance
      "business": "#059669",
      "finance": "#059669",
      "ai business": "#059669",
      // News & Breaking
      "news": "#DC2626",
      "breaking": "#DC2626",
      "breaking news": "#DC2626",
      "breaking-news": "#DC2626",
      // Marketing & Advertising
      "marketing": "#7C3AED",
      "advertising": "#7C3AED",
      "ai marketing": "#7C3AED",
      // Enterprise & Corporate
      "enterprise": "#2563EB",
      "corporate": "#2563EB",
      "b2b": "#2563EB",
      // AI & Technology
      "ai": "#8B5CF6",
      "technology": "#8B5CF6",
      "tech": "#8B5CF6",
      "ai agents": "#14B8A6",
      "automation": "#14B8A6",
      // Creative & Design
      "creative": "#EC4899",
      "design": "#EC4899",
      "ai creative": "#EC4899",
      // eCommerce & Sales
      "ecommerce": "#F59E0B",
      "sales": "#F59E0B",
      "ai ecommerce": "#F59E0B",
      // Coding & Development
      "coding": "#EC4899",
      "development": "#EC4899",
      "programming": "#EC4899",
      "ai coding": "#EC4899",
      // Productivity & Tools
      "productivity": "#10B981",
      "tools": "#10B981",
      "ai tools": "#10B981",
      // Research & Analysis
      "research": "#3B82F6",
      "analysis": "#3B82F6",
      "ai research": "#3B82F6"
    };
    const fallbackColor = fallbackColors[categorySlug] || fallbackColors[categoryName] || fallbackColors[categoryName.replace(/\s+/g, "-")] || // Handle spaces in names
    "#F59E0B";
    return hexToRgba(fallbackColor, 0.2);
  }
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Hero Section Mockup - AI News", "description": "Redesigned hero section mockup showcasing improved visual hierarchy and user experience", "data-astro-cid-wkaffbk7": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mockup-notice" data-astro-cid-wkaffbk7> <div class="notice-content" data-astro-cid-wkaffbk7> <h2 data-astro-cid-wkaffbk7>🎨 Hero Section Redesign Mockup</h2> <p data-astro-cid-wkaffbk7>This page demonstrates the proposed improvements to create a more authoritative and engaging hero section. The design maintains monetization opportunities while dramatically improving visual impact.</p> </div> </div> <section class="hero-redesigned" data-astro-cid-wkaffbk7> <div class="hero-container-new" data-astro-cid-wkaffbk7> <!-- Premium Header with Visual Impact --> <div class="hero-header-premium" data-astro-cid-wkaffbk7> <div class="authority-badge" data-astro-cid-wkaffbk7> <span class="badge-pulse" data-astro-cid-wkaffbk7></span> <span class="badge-text" data-astro-cid-wkaffbk7>Premium Intelligence</span> <span class="badge-icon" data-astro-cid-wkaffbk7>⚡</span> </div> <h1 class="hero-title-modern" data-astro-cid-wkaffbk7>The AI Edge Your Competitors Don't Have</h1> <p class="hero-subtitle-modern" data-astro-cid-wkaffbk7>Exclusive insights, insider access, and strategic intelligence from the AI frontier that drives real business results</p> <!-- Enhanced Newsletter CTA with Lead Magnet - 2 Column Layout --> <div class="newsletter-cta" data-astro-cid-wkaffbk7> <div class="cta-container" data-astro-cid-wkaffbk7> <div class="lead-magnet-grid" data-astro-cid-wkaffbk7> <!-- Left Column - Value Proposition --> <div class="lead-magnet-left" data-astro-cid-wkaffbk7> <div class="icon-headline" data-astro-cid-wkaffbk7> <div class="envelope-icon" style="margin-top: -0.5rem;" data-astro-cid-wkaffbk7>📧</div> <h3 class="cta-headline" data-astro-cid-wkaffbk7>Join 5,000+ Entrepreneurs Making $10K+/Month With AI</h3> </div> <ul class="subscribe-benefits" data-astro-cid-wkaffbk7> <li data-astro-cid-wkaffbk7><span class="benefit-icon" data-astro-cid-wkaffbk7>🤖</span> Discover AI money machines generating $1K-$10K/month</li> <li data-astro-cid-wkaffbk7><span class="benefit-icon" data-astro-cid-wkaffbk7>💎</span> Get AI automation setups that replace 10+ hours daily</li> <li data-astro-cid-wkaffbk7><span class="benefit-icon" data-astro-cid-wkaffbk7>⚡</span> First access to breakthrough AI tools before they go viral</li> <li data-astro-cid-wkaffbk7><span class="benefit-icon" data-astro-cid-wkaffbk7>🚀</span> Join exclusive community of successful AI entrepreneurs</li> </ul> <div class="social-proof-left" data-astro-cid-wkaffbk7> <div class="testimonial-card" data-astro-cid-wkaffbk7> <span class="social-proof-text" data-astro-cid-wkaffbk7>"This AI system helped me build a $15K/month side business" - Maria K., Tech Consultant</span> </div> <div class="success-stats" data-astro-cid-wkaffbk7> <div class="stat-item" data-astro-cid-wkaffbk7> <span class="stat-number" data-astro-cid-wkaffbk7>5,247</span> <span class="stat-label" data-astro-cid-wkaffbk7>Success Stories</span> </div> <div class="stat-item" data-astro-cid-wkaffbk7> <span class="stat-number" data-astro-cid-wkaffbk7>$2.3M+</span> <span class="stat-label" data-astro-cid-wkaffbk7>Revenue Generated</span> </div> </div> </div> </div> <!-- Right Column - Offer & Form --> <div class="lead-magnet-right" data-astro-cid-wkaffbk7> <div class="lead-magnet-offer" data-astro-cid-wkaffbk7> <div class="badge-with-emoji" data-astro-cid-wkaffbk7> <span class="offer-emoji" style="margin-top: -0.5rem;" data-astro-cid-wkaffbk7>🎁</span> <span class="free-badge" data-astro-cid-wkaffbk7>STEAL MY PRODUCTIVITY VAULT</span> </div> <div class="offer-content" data-astro-cid-wkaffbk7> <div data-astro-cid-wkaffbk7> <strong data-astro-cid-wkaffbk7>2025 AI Money & Productivity Vault</strong> <ul class="offer-bullets" data-astro-cid-wkaffbk7> <li data-astro-cid-wkaffbk7>$10K/Month AI Side Hustles (Copy-paste systems)</li> <li data-astro-cid-wkaffbk7>AI Agents That Do 10 Hours of Work in 10 Minutes</li> <li data-astro-cid-wkaffbk7>Personal AI Assistant Setup (makes money while you sleep)</li> <li data-astro-cid-wkaffbk7>AI Marketing Funnels That Convert 10X Better</li> </ul> </div> </div> </div> <form class="subscribe-form" data-astro-cid-wkaffbk7> <input type="email" name="email" class="subscribe-input" placeholder="Enter your email for instant access" required data-astro-cid-wkaffbk7> <button type="submit" class="subscribe-button" data-astro-cid-wkaffbk7> <span class="button-text" data-astro-cid-wkaffbk7>YES! I Want To 10X My Income With AI</span> </button> </form> <div class="trust-signals" data-astro-cid-wkaffbk7> <span class="trust-text" data-astro-cid-wkaffbk7>🔒 No spam, unsubscribe anytime</span> <span class="gdpr-badge" data-astro-cid-wkaffbk7>🛡️ GDPR Compliant</span> <span class="security-badge" data-astro-cid-wkaffbk7>🔐 256-bit SSL</span> </div> </div> </div> </div> </div> </div> <!-- Dominant Feature Layout --> <div class="hero-main-grid" data-astro-cid-wkaffbk7> <!-- 70% Width Dominant Story --> <article class="dominant-feature" data-astro-cid-wkaffbk7> <div class="featured-label" data-astro-cid-wkaffbk7> <span class="label-dot" data-astro-cid-wkaffbk7></span> <span class="label-text" data-astro-cid-wkaffbk7>FEATURED STORY</span> </div> <a${addAttribute(getArticleUrl(mainArticle), "href")} class="dominant-story-link" data-astro-cid-wkaffbk7> <div class="dominant-image-container" data-astro-cid-wkaffbk7> ${mainArticle.featuredImage && mainArticle.featuredImage !== "placeholder-image" ? renderTemplate`<img${addAttribute(mainArticle.featuredImage, "src")}${addAttribute(mainArticle.title, "alt")} class="dominant-image" loading="lazy" data-astro-cid-wkaffbk7>` : renderTemplate`<div class="dominant-placeholder" data-astro-cid-wkaffbk7> <div class="placeholder-icon-large" data-astro-cid-wkaffbk7>🚀</div> <div class="placeholder-text-large" data-astro-cid-wkaffbk7>AI Agent Framework</div> </div>`} <div class="image-overlay-modern" data-astro-cid-wkaffbk7> <div class="overlay-content" data-astro-cid-wkaffbk7> <span class="read-time-modern" data-astro-cid-wkaffbk7>${mainArticle.readingTime ? `${mainArticle.readingTime} min read` : "5 min read"}</span> <span class="trending-pulse" data-astro-cid-wkaffbk7>🔥 Trending</span> </div> </div> </div> </a> <div class="dominant-content" data-astro-cid-wkaffbk7> ${mainArticle.category && renderTemplate`<a${addAttribute(`/categories/${mainArticle.category.slug?.current || "business"}`, "href")} class="category-modern"${addAttribute(`background: ${getCategoryColor(mainArticle.category)}`, "style")} data-astro-cid-wkaffbk7> ${mainArticle.category.displayName || "AI BUSINESS"} </a>`} <h2 class="dominant-headline" data-astro-cid-wkaffbk7> <a${addAttribute(getArticleUrl(mainArticle), "href")} data-astro-cid-wkaffbk7>${mainArticle.title}</a> </h2> <p class="dominant-excerpt" data-astro-cid-wkaffbk7>${mainArticle.excerpt}</p> <div class="story-metadata" data-astro-cid-wkaffbk7> <div class="author-section-modern" data-astro-cid-wkaffbk7> <div class="author-avatar-modern" data-astro-cid-wkaffbk7> ${mainArticle.author?.name?.charAt(0) || "A"} </div> <div class="author-details" data-astro-cid-wkaffbk7> <a${addAttribute(`/authors/${mainArticle.author?.slug || "ai-expert"}`, "href")} class="author-name-modern" data-astro-cid-wkaffbk7>${mainArticle.author?.name || "AI Expert"}</a> <span class="publish-date-modern" data-astro-cid-wkaffbk7>${formatDate(mainArticle.publishedAt)}</span> </div> </div> <div class="engagement-indicators" data-astro-cid-wkaffbk7> <span class="viral-badge" data-astro-cid-wkaffbk7>🚀 Viral</span> <span class="share-count" data-astro-cid-wkaffbk7>2.1K shares</span> </div> </div> </div> </article> <!-- 30% Sidebar with Strategic Placement --> <div class="premium-sidebar" data-astro-cid-wkaffbk7> <!-- Premium Ad - Strategic Position --> <div class="premium-sponsor-block" data-astro-cid-wkaffbk7> <div class="sponsor-label" data-astro-cid-wkaffbk7>PREMIUM SPONSOR</div> <div class="sponsor-content" data-astro-cid-wkaffbk7> <div class="sponsor-visual" data-astro-cid-wkaffbk7> <div class="sponsor-icon" data-astro-cid-wkaffbk7> <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-wkaffbk7> <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor" data-astro-cid-wkaffbk7></path> <path d="M19 15L19.74 17.74L22.5 18.5L19.74 19.26L19 22L18.26 19.26L15.5 18.5L18.26 17.74L19 15Z" fill="currentColor" data-astro-cid-wkaffbk7></path> <path d="M5 6L5.5 7.5L7 8L5.5 8.5L5 10L4.5 8.5L3 8L4.5 7.5L5 6Z" fill="currentColor" data-astro-cid-wkaffbk7></path> </svg> </div> <div class="sponsor-copy" data-astro-cid-wkaffbk7> <div class="sponsor-headline" data-astro-cid-wkaffbk7>Premium Advertising</div> <div class="sponsor-subline" data-astro-cid-wkaffbk7>Strategic placement for maximum impact</div> <div class="sponsor-benefits" data-astro-cid-wkaffbk7> <span class="benefit-tag" data-astro-cid-wkaffbk7>High Visibility</span> <span class="benefit-tag" data-astro-cid-wkaffbk7>Targeted Audience</span> </div> <a href="/advertise" class="sponsor-cta" data-astro-cid-wkaffbk7> <span data-astro-cid-wkaffbk7>Get Started</span> <svg class="cta-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-wkaffbk7> <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-wkaffbk7></path> </svg> </a> </div> </div> </div> </div> <!-- Intelligence Brief - Quick Reads --> <div class="intelligence-brief" data-astro-cid-wkaffbk7> <div class="brief-header" data-astro-cid-wkaffbk7> <span class="brief-icon" data-astro-cid-wkaffbk7>📊</span> <h3 class="brief-title" data-astro-cid-wkaffbk7>Intelligence Brief</h3> <span class="live-indicator" data-astro-cid-wkaffbk7>BREAKING</span> </div> <div class="brief-articles" data-astro-cid-wkaffbk7> ${secondaryArticles.slice(0, 3).map((article, index) => renderTemplate`<article class="brief-item" data-astro-cid-wkaffbk7> <div class="brief-image" data-astro-cid-wkaffbk7> ${article.featuredImage && article.featuredImage !== "placeholder-image-1" && article.featuredImage !== "placeholder-image-2" && article.featuredImage !== "placeholder-image-3" ? renderTemplate`<img${addAttribute(article.featuredImage, "src")}${addAttribute(article.title, "alt")} class="brief-thumbnail" loading="lazy" data-astro-cid-wkaffbk7>` : renderTemplate`<div class="brief-placeholder" data-astro-cid-wkaffbk7> <div class="placeholder-icon" data-astro-cid-wkaffbk7>📰</div> </div>`} </div> <div class="brief-content" data-astro-cid-wkaffbk7> ${article.category && renderTemplate`<a${addAttribute(`/categories/${article.category.slug?.current || "news"}`, "href")} class="brief-category"${addAttribute(`background: ${getCategoryColor(article.category)}`, "style")} data-astro-cid-wkaffbk7> ${article.category.displayName || "NEWS"} </a>`} <h4 class="brief-headline" data-astro-cid-wkaffbk7> <a${addAttribute(getArticleUrl(article), "href")} data-astro-cid-wkaffbk7>${article.title}</a> </h4> <div class="brief-meta" data-astro-cid-wkaffbk7> <a${addAttribute(`/authors/${article.author?.slug || "ai-reporter"}`, "href")} class="brief-author" data-astro-cid-wkaffbk7> ${article.author?.name || "AI Reporter"} </a> <span class="brief-time" data-astro-cid-wkaffbk7>${formatDate(article.publishedAt)}</span> </div> </div> </article>`)} </div> </div> <!-- AI Authority Proof --> <div class="authority-proof" data-astro-cid-wkaffbk7> <div class="proof-header" data-astro-cid-wkaffbk7> <span class="proof-icon" data-astro-cid-wkaffbk7>🏆</span> <h4 class="proof-title" data-astro-cid-wkaffbk7>Trusted by Industry Leaders</h4> </div> <div class="proof-stats" data-astro-cid-wkaffbk7> <div class="stat-item" data-astro-cid-wkaffbk7> <span class="stat-number" data-astro-cid-wkaffbk7>50K+</span> <span class="stat-label" data-astro-cid-wkaffbk7>AI Professionals</span> </div> <div class="stat-item" data-astro-cid-wkaffbk7> <span class="stat-number" data-astro-cid-wkaffbk7>500+</span> <span class="stat-label" data-astro-cid-wkaffbk7>Companies</span> </div> <div class="stat-item" data-astro-cid-wkaffbk7> <span class="stat-number" data-astro-cid-wkaffbk7>95%</span> <span class="stat-label" data-astro-cid-wkaffbk7>Read Rate</span> </div> </div> <div class="proof-testimonial" data-astro-cid-wkaffbk7> <p data-astro-cid-wkaffbk7>"The intelligence brief has become essential reading for our AI strategy team."</p> <cite data-astro-cid-wkaffbk7>— Sarah Johnson, Head of AI at TechCorp</cite> </div> </div> </div> </div> </div> </section> ` })}  `;
}, "/workspaces/ai-news-site/src/pages/hero-mockup.astro", void 0);
const $$file = "/workspaces/ai-news-site/src/pages/hero-mockup.astro";
const $$url = "/hero-mockup";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$HeroMockup,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
