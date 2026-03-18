import { b as createAstro, d as createComponent, m as maybeRenderHead, e as addAttribute, g as renderTemplate, f as renderComponent, i as renderSlot, F as Fragment, r as renderHead } from "./vendor_BQ-iwbOC.mjs";
import "kleur/colors";
import { $ as $$BaseHead } from "./BaseHead_DlYNO4qP.mjs";
import { $ as $$HeaderPremium } from "./HeaderPremium_DLonACPk.mjs";
import { $ as $$Footer } from "./Footer_FSuDz8wK.mjs";
import { $ as $$FormattedDate } from "./FormattedDate_Di3imwGG.mjs";
import "clsx";
import { c as getAllArticles, a as getImageUrl } from "./data-vendor_CAsGKFmz.mjs";
/* empty css                          */
const $$Astro$1 = createAstro("http://localhost:4321");
const $$RelatedArticlesSimple = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$RelatedArticlesSimple;
  const { currentSlug, currentCategory, maxArticles = 6 } = Astro2.props;
  const allPosts = await getAllArticles();
  let sameCategoryPosts = [];
  let otherCategoryPosts = [];
  allPosts.forEach((post) => {
    if (post.slug === currentSlug) return;
    if (currentCategory && post.category?.name === currentCategory) {
      sameCategoryPosts.push(post);
    } else {
      otherCategoryPosts.push(post);
    }
  });
  sameCategoryPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  otherCategoryPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  const relatedPosts = [
    ...sameCategoryPosts.slice(0, maxArticles),
    ...otherCategoryPosts.slice(0, Math.max(0, maxArticles - sameCategoryPosts.length))
  ].slice(0, maxArticles);
  function calculateReadTime(content) {
    if (!content || typeof content !== "string") {
      return 1;
    }
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }
  function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  }
  return renderTemplate`${relatedPosts.length > 0 && renderTemplate`${maybeRenderHead()}<section class="related-articles-section" data-astro-cid-cparjyrr><div class="related-articles-container" data-astro-cid-cparjyrr><div class="section-header" data-astro-cid-cparjyrr><h2 class="section-title" data-astro-cid-cparjyrr>Continue Your AI Journey</h2><p class="section-subtitle" data-astro-cid-cparjyrr>Discover more insights to accelerate your entrepreneurial success</p></div><div class="articles-grid" data-astro-cid-cparjyrr>${relatedPosts.map((post) => {
    const heroImageUrl = getImageUrl(post.featuredImage) || "/images/blog-placeholder-1.jpg";
    return renderTemplate`<article class="article-card" data-astro-cid-cparjyrr><a${addAttribute(`/blog/${post.slug}/`, "href")} class="card-link" data-astro-cid-cparjyrr><div class="card-image-container" data-astro-cid-cparjyrr><img${addAttribute(`${heroImageUrl}?w=400&q=85&f=webp`, "src")}${addAttribute(post.title, "alt")} width="400" height="225" loading="lazy" decoding="async" class="card-image" data-astro-cid-cparjyrr><div class="card-image-overlay" data-astro-cid-cparjyrr></div>${post.category && renderTemplate`<span class="card-category-badge" data-astro-cid-cparjyrr>${post.category.displayName || post.category.name}</span>`}</div><div class="card-content" data-astro-cid-cparjyrr><h3 class="card-title" data-astro-cid-cparjyrr>${post.title}</h3><p class="card-excerpt" data-astro-cid-cparjyrr>${truncateText(post.excerpt || "", 120)}</p><div class="card-meta" data-astro-cid-cparjyrr><span class="card-date" data-astro-cid-cparjyrr>${new Date(post.publishedAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    })}</span><span class="card-read-time" data-astro-cid-cparjyrr>${calculateReadTime(post.content || post.body || "")} min read</span></div></div></a></article>`;
  })}</div>${currentCategory && renderTemplate`<div class="section-footer" data-astro-cid-cparjyrr><a${addAttribute(`/categories/${currentCategory.toLowerCase()}`, "href")} class="view-all-link" data-astro-cid-cparjyrr>
View All ${currentCategory} Articles
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" data-astro-cid-cparjyrr><path d="M7 17l9.2-9.2M17 17V7H7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-cparjyrr></path></svg></a></div>`}</div></section>`}`;
}, "/workspaces/ai-news-site/src/components/RelatedArticlesSimple.astro", void 0);
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("http://localhost:4321");
const $$BlogPost = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BlogPost;
  const { title, description, pubDate, updatedDate, heroImage, authorName = "AI Buzz Media", authorSlug, categoryName, categorySlug } = Astro2.props;
  const pubDateObj = typeof pubDate === "string" ? new Date(pubDate) : pubDate;
  const updatedDateObj = typeof updatedDate === "string" ? new Date(updatedDate) : updatedDate;
  return renderTemplate(_a || (_a = __template(['<html lang="en" data-astro-cid-bvzihdzo> <head>', "", "", '</head> <body class="article-page" data-astro-cid-bvzihdzo> ', ' <div class="article-wrapper" data-astro-cid-bvzihdzo> ', ' <div class="centered-container" data-astro-cid-bvzihdzo> <div class="article-content" data-astro-cid-bvzihdzo> <div class="article-body" data-astro-cid-bvzihdzo> ', ' </div> </div> <div class="article-sidebar" data-astro-cid-bvzihdzo> ', ' </div> </div> <div class="article-footer-spacer" data-astro-cid-bvzihdzo></div> </div> <!-- Related Articles Section --> ', " ", " <script>\n		(function() {\n			// Hero image optimization for instant loading\n			function optimizeHeroImage() {\n				var heroImg = document.getElementById('featured-hero-img');\n				if (!heroImg) return;\n				\n				// Show image immediately when loaded\n				if (heroImg.complete && heroImg.naturalHeight !== 0) {\n					heroImg.classList.add('loaded');\n				} else {\n					heroImg.addEventListener('load', function() {\n						this.classList.add('loaded');\n					});\n				}\n				\n				// Error handling - show fallback\n				heroImg.addEventListener('error', function() {\n					this.style.opacity = '0.5';\n					console.warn('Hero image failed to load:', this.src);\n				});\n			}\n			\n			function alignHeroBarToTitle() {\n				var titleRow = document.getElementById('hero-title-row');\n				var bar = document.getElementById('hero-header-bar');\n				if (!titleRow || !bar) return;\n				var titleH1 = titleRow.querySelector('.hero-title');\n				if (!titleH1) return;\n				var width = titleH1.offsetWidth;\n				// Set min/max for reasonable bounds\n				var minW = 220;\n				var maxW = Math.min(1200, window.innerWidth - 32); // 1200px or viewport\n				width = Math.max(minW, Math.min(width, maxW));\n				bar.style.width = width + 'px';\n				bar.style.margin = '0 auto 0.8rem auto';\n			}\n			\n			// Initialize optimizations as early as possible\n			if (document.readyState === 'loading') {\n				document.addEventListener('DOMContentLoaded', function() {\n					optimizeHeroImage();\n					alignHeroBarToTitle();\n				});\n			} else {\n				optimizeHeroImage();\n				alignHeroBarToTitle();\n			}\n			\n			window.addEventListener('resize', alignHeroBarToTitle);\n		})();\n		<\/script> </body> </html>"])), renderComponent($$result, "BaseHead", $$BaseHead, { "title": title, "description": description, "image": heroImage, "data-astro-cid-bvzihdzo": true }), heroImage && heroImage !== "" && renderTemplate`<link rel="preload" as="image"${addAttribute(`${heroImage}?w=1200&q=85&f=webp`, "href")}${addAttribute(`
					${heroImage}?w=480&q=85&f=webp 480w,
					${heroImage}?w=768&q=85&f=webp 768w,
					${heroImage}?w=1200&q=85&f=webp 1200w,
					${heroImage}?w=1920&q=80&f=webp 1920w
				`, "imagesrcset")} imagesizes="100vw" fetchpriority="high">`, renderHead(), renderComponent($$result, "HeaderPremium", $$HeaderPremium, { "data-astro-cid-bvzihdzo": true }), heroImage && heroImage !== "" ? renderTemplate`<div class="hero-image" data-astro-cid-bvzihdzo> <img${addAttribute(`${heroImage}?w=1200&q=85&f=webp`, "src")}${addAttribute(title || "Featured image", "alt")} width="1920" height="600" loading="eager" fetchpriority="high" decoding="async"${addAttribute(`
							${heroImage}?w=480&q=85&f=webp 480w,
							${heroImage}?w=768&q=85&f=webp 768w,
							${heroImage}?w=1200&q=85&f=webp 1200w,
							${heroImage}?w=1920&q=80&f=webp 1920w
						`, "srcset")} sizes="100vw" class="hero-img-optimized" id="featured-hero-img" data-astro-cid-bvzihdzo> <div class="hero-overlay" data-astro-cid-bvzihdzo></div> <div class="hero-header-bar-container" data-astro-cid-bvzihdzo> <div id="hero-header-bar" class="hero-header-bar" data-astro-cid-bvzihdzo> ${categoryName && categorySlug && renderTemplate`<a${addAttribute(`/categories/${categorySlug}`, "href")} class="hero-category-label" data-astro-cid-bvzihdzo>${categoryName}</a>`} <div class="hero-social-icons" data-astro-cid-bvzihdzo> <a href="#" class="hero-social-icon" title="Share on LinkedIn" aria-label="Share on LinkedIn" onclick="window.open('https://www.linkedin.com/shareArticle?mini=true&url='+encodeURIComponent(window.location.href),'_blank')" data-astro-cid-bvzihdzo> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" data-astro-cid-bvzihdzo><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-bvzihdzo></path><rect x="2" y="9" width="4" height="12" rx="2" ry="2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-bvzihdzo></rect><circle cx="4" cy="4" r="2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-bvzihdzo></circle></svg> </a> <a href="#" class="hero-social-icon" title="Share on Twitter" aria-label="Share on Twitter" onclick="window.open('https://twitter.com/intent/tweet?url='+encodeURIComponent(window.location.href),'_blank')" data-astro-cid-bvzihdzo> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" data-astro-cid-bvzihdzo><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4 1.64a9.09 9.09 0 0 1-2.88 1.1A4.48 4.48 0 0 0 16.5 0c-2.5 0-4.5 2.01-4.5 4.5 0 .35.04.7.11 1.03C7.69 5.4 4.07 3.67 1.64 1.15c-.38.65-.6 1.4-.6 2.2 0 1.52.77 2.86 1.94 3.65A4.48 4.48 0 0 1 .96 6v.06c0 2.13 1.52 3.91 3.54 4.31-.37.1-.76.16-1.16.16-.28 0-.55-.03-.81-.08.55 1.72 2.16 2.97 4.07 3A9.05 9.05 0 0 1 0 19.54a12.8 12.8 0 0 0 6.95 2.04c8.34 0 12.9-6.91 12.9-12.9 0-.2 0-.39-.01-.58A9.22 9.22 0 0 0 24 4.59a9.1 9.1 0 0 1-2.6.71z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-bvzihdzo></path></svg> </a> <a href="#" class="hero-social-icon" title="Share on Facebook" aria-label="Share on Facebook" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(window.location.href),'_blank')" data-astro-cid-bvzihdzo> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" data-astro-cid-bvzihdzo><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-bvzihdzo></path></svg> </a> <a href="#" class="hero-social-icon" title="Copy Link" aria-label="Copy Link" onclick="navigator.clipboard.writeText(window.location.href)" data-astro-cid-bvzihdzo> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" data-astro-cid-bvzihdzo><path d="M10 13a5 5 0 0 1 7 7l-3 3a5 5 0 0 1-7-7l1-1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-bvzihdzo></path><path d="M14 11a5 5 0 0 0-7-7l-3 3a5 5 0 0 0 7 7l1-1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-bvzihdzo></path></svg> </a> </div> </div> <div id="hero-title-row" class="hero-text" data-astro-cid-bvzihdzo> <h1 class="hero-title" data-astro-cid-bvzihdzo>${title}</h1> <div class="hero-meta" data-astro-cid-bvzihdzo> <span class="meta-item" data-astro-cid-bvzihdzo>By ${authorSlug && authorName ? renderTemplate`<a${addAttribute(`/authors/${authorSlug}`, "href")} class="author-link" data-astro-cid-bvzihdzo>${authorName}</a>` : authorName || "AI Buzz Media"}</span> <span class="meta-dot" data-astro-cid-bvzihdzo></span> <span class="meta-item" data-astro-cid-bvzihdzo>${renderComponent($$result, "FormattedDate", $$FormattedDate, { "date": pubDateObj, "data-astro-cid-bvzihdzo": true })}</span> ${updatedDateObj && renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-bvzihdzo": true }, { "default": ($$result2) => renderTemplate` <span class="meta-dot" data-astro-cid-bvzihdzo></span> <span class="meta-item" data-astro-cid-bvzihdzo>Updated ${renderComponent($$result2, "FormattedDate", $$FormattedDate, { "date": updatedDateObj, "data-astro-cid-bvzihdzo": true })}</span> ` })}`} </div> </div> </div> </div>` : null, renderSlot($$result, $$slots["default"]), renderSlot($$result, $$slots["sidebar"]), renderComponent($$result, "RelatedArticlesSimple", $$RelatedArticlesSimple, { "currentSlug": Astro2.url.pathname.split("/").pop()?.replace(".html", "") || "", "currentCategory": categoryName, "data-astro-cid-bvzihdzo": true }), renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-bvzihdzo": true }));
}, "/workspaces/ai-news-site/src/layouts/BlogPost.astro", void 0);
export {
  $$BlogPost as $
};
