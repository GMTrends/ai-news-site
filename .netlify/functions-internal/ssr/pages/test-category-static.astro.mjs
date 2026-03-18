import { d as createComponent, g as renderTemplate, f as renderComponent, m as maybeRenderHead, e as addAttribute, r as renderHead } from "../chunks/vendor_BQ-iwbOC.mjs";
import "kleur/colors";
import { a as $$MobileNav, b as $$AdminLink, c as $$HeaderLink, $ as $$Footer } from "../chunks/Footer_FSuDz8wK.mjs";
import { C as CATEGORIES, S as SITE_TITLE } from "../chunks/consts_Dxuyllhi.mjs";
/* empty css                                                */
import { $ as $$CategorySidebar } from "../chunks/CategorySidebar_DCUU23L3.mjs";
import { $ as $$CategoryHero } from "../chunks/CategoryHero_GIdsrjsN.mjs";
import { r } from "../chunks/data-vendor_CAsGKFmz.mjs";
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["", '<header class="ai-header" data-astro-cid-3ef6ksr2> <nav class="nav-container" data-astro-cid-3ef6ksr2> <div class="header-content-wrapper" data-astro-cid-3ef6ksr2> <div class="logo-section" data-astro-cid-3ef6ksr2> <h2 class="site-title" data-astro-cid-3ef6ksr2> <a href="/" data-astro-cid-3ef6ksr2>', '</a> </h2> <p class="tagline" data-astro-cid-3ef6ksr2>AI News & Insights</p> </div> <div class="desktop-nav nav-links" id="mainNav" data-astro-cid-3ef6ksr2> ', " ", " ", " ", " ", ' </div> <div class="nav-right-section" data-astro-cid-3ef6ksr2> <div class="mobile-nav" id="mobileNav" data-astro-cid-3ef6ksr2> ', ` </div> <button class="header-search-btn" id="headerSearchBtn" aria-label="Search" tabindex="0" data-astro-cid-3ef6ksr2> <svg id="searchIcon" class="search-icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" data-astro-cid-3ef6ksr2><circle cx="11" cy="11" r="8" data-astro-cid-3ef6ksr2></circle><path d="m21 21-4.35-4.35" data-astro-cid-3ef6ksr2></path></svg> <svg id="closeIcon" class="close-icon-svg search-hidden" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" data-astro-cid-3ef6ksr2><line x1="18" y1="6" x2="6" y2="18" stroke-width="2" stroke-linecap="round" data-astro-cid-3ef6ksr2></line><line x1="6" y1="6" x2="18" y2="18" stroke-width="2" stroke-linecap="round" data-astro-cid-3ef6ksr2></line></svg> </button> </div> </div> </nav> <!-- Header Search Bar Overlay (hidden by default) --> <div class="header-search-overlay" id="headerSearchOverlay" data-astro-cid-3ef6ksr2> <div class="header-search-bar-container" data-astro-cid-3ef6ksr2> <div class="header-search-input-wrapper" data-astro-cid-3ef6ksr2> <input type="text" class="header-search-input" id="headerSearchInput" placeholder="Search articles..." autocomplete="off" data-astro-cid-3ef6ksr2> <button class="header-search-input-close" id="headerSearchInputClose" aria-label="Close search" tabindex="0" type="button" data-astro-cid-3ef6ksr2> <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" data-astro-cid-3ef6ksr2><line x1="18" y1="6" x2="6" y2="18" stroke-width="2" stroke-linecap="round" data-astro-cid-3ef6ksr2></line><line x1="6" y1="6" x2="18" y2="18" stroke-width="2" stroke-linecap="round" data-astro-cid-3ef6ksr2></line></svg> </button> </div> <div class="header-search-results" id="headerSearchResults" data-astro-cid-3ef6ksr2></div> <div id="search-results" data-astro-cid-3ef6ksr2></div> </div> </div> </header> <script>
(function() {
	const searchBtn = document.getElementById('headerSearchBtn');
	const nav = document.getElementById('mainNav');
	const mobileNav = document.getElementById('mobileNav');
	const overlay = document.getElementById('headerSearchOverlay');
	const input = document.getElementById('headerSearchInput');
	const searchIcon = document.getElementById('searchIcon');
	const closeIcon = document.getElementById('closeIcon');
	const inputClose = document.getElementById('headerSearchInputClose');
	const resultsBox = document.getElementById('headerSearchResults');
	let searchActive = false;
	let allArticles = [];
	let filteredArticles = [];
	let selectedIdx = -1;

	async function loadArticles() {
		if (allArticles.length > 0) return;
		try {
			const res = await fetch('/api/search-articles.json');
			if (res.ok) allArticles = await res.json();
		} catch (e) {
			allArticles = [];
		}
	}

	function renderResults(results) {
		const resultsContainer = document.getElementById('search-results');
		if (!resultsContainer) return;
		if (!results || results.length === 0) {
			resultsContainer.innerHTML = '<div class="no-results">No results found.</div>';
			resultsContainer.classList.add('active');
			return;
		}
		resultsContainer.innerHTML = results.map((article, idx) => {
			const cat = article.category;
			const categorySlug = cat && typeof cat === 'object'
				? (typeof cat.slug === 'object' ? cat.slug.current : cat.slug)
				: (cat || 'ai-news');
			const articleSlug = typeof article.slug === 'object' ? article.slug.current : article.slug;
			return \`<a href="/\${categorySlug}/\${articleSlug}" class="search-result-link" role="option" tabindex="-1" id="search-result-\${idx}">\${article.title}</a>\`;
		}).join('');
		resultsContainer.classList.add('active');
	}

	function filterArticles(query) {
		const q = query.trim().toLowerCase();
		if (q.length < 2) {
			resultsBox && resultsBox.classList.remove('active');
			return [];
		}
		return allArticles.filter(a =>
			a.title.toLowerCase().includes(q) ||
			(a.excerpt && a.excerpt.toLowerCase().includes(q)) ||
			(a.author?.name && a.author.name.toLowerCase().includes(q)) ||
			(a.body && a.body.toLowerCase().includes(q))
		);
	}

	function openSearch() {
		searchActive = true;
		// Use CSS classes instead of style.display to prevent layout shifting
		nav && nav.classList.add('search-hidden');
		mobileNav && mobileNav.classList.add('search-hidden');
		overlay && overlay.classList.add('search-active');
		searchIcon && searchIcon.classList.add('search-hidden');
		closeIcon && closeIcon.classList.add('search-active');
		setTimeout(() => { input && input.focus(); }, 100);
		document.body.classList.add('header-search-active');
	}
	function closeSearch() {
		searchActive = false;
		// Use CSS classes instead of style.display to prevent layout shifting
		nav && nav.classList.remove('search-hidden');
		mobileNav && mobileNav.classList.remove('search-hidden');
		overlay && overlay.classList.remove('search-active');
		searchIcon && searchIcon.classList.remove('search-hidden');
		closeIcon && closeIcon.classList.remove('search-active');
		resultsBox && resultsBox.classList.remove('active');
		selectedIdx = -1;
		document.body.classList.remove('header-search-active');
	}
	searchBtn && searchBtn.addEventListener('click', function(e) {
		e.preventDefault();
		if (!searchActive) openSearch();
		else closeSearch();
	});
	inputClose && inputClose.addEventListener('click', function(e) {
		e.preventDefault();
		closeSearch();
	});
	document.addEventListener('keydown', function(e) {
		if (searchActive && (e.key === 'Escape' || e.key === 'Esc')) closeSearch();
	});
	document.addEventListener('click', function(e) {
		if (!searchActive) return;
		const t = e.target;
		if (overlay && !overlay.contains(t) && t !== searchBtn && !searchBtn.contains(t)) closeSearch();
	});
	input && input.addEventListener('input', async function() {
		await loadArticles();
		const query = this.value;
		filteredArticles = filterArticles(query);
		selectedIdx = -1;
		renderResults(filteredArticles);
	});
	input && input.addEventListener('keydown', function(e) {
		if (!filteredArticles.length) return;
		const resultsContainer = document.getElementById('search-results');
		const items = resultsContainer ? resultsContainer.querySelectorAll('.search-result-link') : [];
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			selectedIdx = (selectedIdx + 1) % Math.min(filteredArticles.length, 10);
			items.forEach((el, i) => {
				el.classList.toggle('selected', i === selectedIdx);
				el.setAttribute('aria-selected', i === selectedIdx ? 'true' : 'false');
				if (i === selectedIdx) el.focus();
			});
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			selectedIdx = (selectedIdx - 1 + Math.min(filteredArticles.length, 10)) % Math.min(filteredArticles.length, 10);
			items.forEach((el, i) => {
				el.classList.toggle('selected', i === selectedIdx);
				el.setAttribute('aria-selected', i === selectedIdx ? 'true' : 'false');
				if (i === selectedIdx) el.focus();
			});
		} else if (e.key === 'Enter') {
			if (selectedIdx >= 0 && filteredArticles[selectedIdx]) {
				const cat = filteredArticles[selectedIdx].category;
				const categorySlug = cat && typeof cat === 'object'
					? (typeof cat.slug === 'object' ? cat.slug.current : cat.slug)
					: (cat || 'ai-news');
				const articleSlug = typeof filteredArticles[selectedIdx].slug === 'object' ? filteredArticles[selectedIdx].slug.current : filteredArticles[selectedIdx].slug;
				window.location.href = \`/\${categorySlug}/\${articleSlug}\`;
			}
		}
	});
	const resultsContainer = document.getElementById('search-results');
	if (resultsContainer) resultsContainer.setAttribute('role', 'listbox');
})();
<\/script> `], ["", '<header class="ai-header" data-astro-cid-3ef6ksr2> <nav class="nav-container" data-astro-cid-3ef6ksr2> <div class="header-content-wrapper" data-astro-cid-3ef6ksr2> <div class="logo-section" data-astro-cid-3ef6ksr2> <h2 class="site-title" data-astro-cid-3ef6ksr2> <a href="/" data-astro-cid-3ef6ksr2>', '</a> </h2> <p class="tagline" data-astro-cid-3ef6ksr2>AI News & Insights</p> </div> <div class="desktop-nav nav-links" id="mainNav" data-astro-cid-3ef6ksr2> ', " ", " ", " ", " ", ' </div> <div class="nav-right-section" data-astro-cid-3ef6ksr2> <div class="mobile-nav" id="mobileNav" data-astro-cid-3ef6ksr2> ', ` </div> <button class="header-search-btn" id="headerSearchBtn" aria-label="Search" tabindex="0" data-astro-cid-3ef6ksr2> <svg id="searchIcon" class="search-icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" data-astro-cid-3ef6ksr2><circle cx="11" cy="11" r="8" data-astro-cid-3ef6ksr2></circle><path d="m21 21-4.35-4.35" data-astro-cid-3ef6ksr2></path></svg> <svg id="closeIcon" class="close-icon-svg search-hidden" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" data-astro-cid-3ef6ksr2><line x1="18" y1="6" x2="6" y2="18" stroke-width="2" stroke-linecap="round" data-astro-cid-3ef6ksr2></line><line x1="6" y1="6" x2="18" y2="18" stroke-width="2" stroke-linecap="round" data-astro-cid-3ef6ksr2></line></svg> </button> </div> </div> </nav> <!-- Header Search Bar Overlay (hidden by default) --> <div class="header-search-overlay" id="headerSearchOverlay" data-astro-cid-3ef6ksr2> <div class="header-search-bar-container" data-astro-cid-3ef6ksr2> <div class="header-search-input-wrapper" data-astro-cid-3ef6ksr2> <input type="text" class="header-search-input" id="headerSearchInput" placeholder="Search articles..." autocomplete="off" data-astro-cid-3ef6ksr2> <button class="header-search-input-close" id="headerSearchInputClose" aria-label="Close search" tabindex="0" type="button" data-astro-cid-3ef6ksr2> <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" data-astro-cid-3ef6ksr2><line x1="18" y1="6" x2="6" y2="18" stroke-width="2" stroke-linecap="round" data-astro-cid-3ef6ksr2></line><line x1="6" y1="6" x2="18" y2="18" stroke-width="2" stroke-linecap="round" data-astro-cid-3ef6ksr2></line></svg> </button> </div> <div class="header-search-results" id="headerSearchResults" data-astro-cid-3ef6ksr2></div> <div id="search-results" data-astro-cid-3ef6ksr2></div> </div> </div> </header> <script>
(function() {
	const searchBtn = document.getElementById('headerSearchBtn');
	const nav = document.getElementById('mainNav');
	const mobileNav = document.getElementById('mobileNav');
	const overlay = document.getElementById('headerSearchOverlay');
	const input = document.getElementById('headerSearchInput');
	const searchIcon = document.getElementById('searchIcon');
	const closeIcon = document.getElementById('closeIcon');
	const inputClose = document.getElementById('headerSearchInputClose');
	const resultsBox = document.getElementById('headerSearchResults');
	let searchActive = false;
	let allArticles = [];
	let filteredArticles = [];
	let selectedIdx = -1;

	async function loadArticles() {
		if (allArticles.length > 0) return;
		try {
			const res = await fetch('/api/search-articles.json');
			if (res.ok) allArticles = await res.json();
		} catch (e) {
			allArticles = [];
		}
	}

	function renderResults(results) {
		const resultsContainer = document.getElementById('search-results');
		if (!resultsContainer) return;
		if (!results || results.length === 0) {
			resultsContainer.innerHTML = '<div class="no-results">No results found.</div>';
			resultsContainer.classList.add('active');
			return;
		}
		resultsContainer.innerHTML = results.map((article, idx) => {
			const cat = article.category;
			const categorySlug = cat && typeof cat === 'object'
				? (typeof cat.slug === 'object' ? cat.slug.current : cat.slug)
				: (cat || 'ai-news');
			const articleSlug = typeof article.slug === 'object' ? article.slug.current : article.slug;
			return \\\`<a href="/\\\${categorySlug}/\\\${articleSlug}" class="search-result-link" role="option" tabindex="-1" id="search-result-\\\${idx}">\\\${article.title}</a>\\\`;
		}).join('');
		resultsContainer.classList.add('active');
	}

	function filterArticles(query) {
		const q = query.trim().toLowerCase();
		if (q.length < 2) {
			resultsBox && resultsBox.classList.remove('active');
			return [];
		}
		return allArticles.filter(a =>
			a.title.toLowerCase().includes(q) ||
			(a.excerpt && a.excerpt.toLowerCase().includes(q)) ||
			(a.author?.name && a.author.name.toLowerCase().includes(q)) ||
			(a.body && a.body.toLowerCase().includes(q))
		);
	}

	function openSearch() {
		searchActive = true;
		// Use CSS classes instead of style.display to prevent layout shifting
		nav && nav.classList.add('search-hidden');
		mobileNav && mobileNav.classList.add('search-hidden');
		overlay && overlay.classList.add('search-active');
		searchIcon && searchIcon.classList.add('search-hidden');
		closeIcon && closeIcon.classList.add('search-active');
		setTimeout(() => { input && input.focus(); }, 100);
		document.body.classList.add('header-search-active');
	}
	function closeSearch() {
		searchActive = false;
		// Use CSS classes instead of style.display to prevent layout shifting
		nav && nav.classList.remove('search-hidden');
		mobileNav && mobileNav.classList.remove('search-hidden');
		overlay && overlay.classList.remove('search-active');
		searchIcon && searchIcon.classList.remove('search-hidden');
		closeIcon && closeIcon.classList.remove('search-active');
		resultsBox && resultsBox.classList.remove('active');
		selectedIdx = -1;
		document.body.classList.remove('header-search-active');
	}
	searchBtn && searchBtn.addEventListener('click', function(e) {
		e.preventDefault();
		if (!searchActive) openSearch();
		else closeSearch();
	});
	inputClose && inputClose.addEventListener('click', function(e) {
		e.preventDefault();
		closeSearch();
	});
	document.addEventListener('keydown', function(e) {
		if (searchActive && (e.key === 'Escape' || e.key === 'Esc')) closeSearch();
	});
	document.addEventListener('click', function(e) {
		if (!searchActive) return;
		const t = e.target;
		if (overlay && !overlay.contains(t) && t !== searchBtn && !searchBtn.contains(t)) closeSearch();
	});
	input && input.addEventListener('input', async function() {
		await loadArticles();
		const query = this.value;
		filteredArticles = filterArticles(query);
		selectedIdx = -1;
		renderResults(filteredArticles);
	});
	input && input.addEventListener('keydown', function(e) {
		if (!filteredArticles.length) return;
		const resultsContainer = document.getElementById('search-results');
		const items = resultsContainer ? resultsContainer.querySelectorAll('.search-result-link') : [];
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			selectedIdx = (selectedIdx + 1) % Math.min(filteredArticles.length, 10);
			items.forEach((el, i) => {
				el.classList.toggle('selected', i === selectedIdx);
				el.setAttribute('aria-selected', i === selectedIdx ? 'true' : 'false');
				if (i === selectedIdx) el.focus();
			});
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			selectedIdx = (selectedIdx - 1 + Math.min(filteredArticles.length, 10)) % Math.min(filteredArticles.length, 10);
			items.forEach((el, i) => {
				el.classList.toggle('selected', i === selectedIdx);
				el.setAttribute('aria-selected', i === selectedIdx ? 'true' : 'false');
				if (i === selectedIdx) el.focus();
			});
		} else if (e.key === 'Enter') {
			if (selectedIdx >= 0 && filteredArticles[selectedIdx]) {
				const cat = filteredArticles[selectedIdx].category;
				const categorySlug = cat && typeof cat === 'object'
					? (typeof cat.slug === 'object' ? cat.slug.current : cat.slug)
					: (cat || 'ai-news');
				const articleSlug = typeof filteredArticles[selectedIdx].slug === 'object' ? filteredArticles[selectedIdx].slug.current : filteredArticles[selectedIdx].slug;
				window.location.href = \\\`/\\\${categorySlug}/\\\${articleSlug}\\\`;
			}
		}
	});
	const resultsContainer = document.getElementById('search-results');
	if (resultsContainer) resultsContainer.setAttribute('role', 'listbox');
})();
<\/script> `])), maybeRenderHead(), SITE_TITLE, CATEGORIES.map((cat) => renderTemplate`${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": `/categories/${cat.slug}`, "data-astro-cid-3ef6ksr2": true }, { "default": async ($$result2) => renderTemplate`${cat.displayName}` })}`), renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/ai-tools-comparison", "data-astro-cid-3ef6ksr2": true }, { "default": async ($$result2) => renderTemplate`AI Tools` }), renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/about", "data-astro-cid-3ef6ksr2": true }, { "default": async ($$result2) => renderTemplate`About` }), renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/contact", "data-astro-cid-3ef6ksr2": true }, { "default": async ($$result2) => renderTemplate`Contact` }), renderComponent($$result, "AdminLink", $$AdminLink, { "data-astro-cid-3ef6ksr2": true }), renderComponent($$result, "MobileNav", $$MobileNav, { "data-astro-cid-3ef6ksr2": true }));
}, "/workspaces/ai-news-site/src/components/Header.astro", void 0);
const $$TestCategoryStatic = createComponent(($$result, $$props, $$slots) => {
  const testCategoryData = {
    slug: "test",
    title: "Test Category",
    description: "This is a test category page with static data to isolate rendering issues.",
    icon: "🧪",
    toolsCount: 5,
    lastUpdated: "Today",
    keywords: ["test", "debugging"],
    metaDescription: "Test category page for debugging"
  };
  const testArticles = [
    {
      _id: "1",
      title: "Test Article 1",
      slug: "test-article-1",
      excerpt: "This is a test article excerpt to verify rendering works.",
      publishedAt: "2025-07-30",
      author: { name: "Test Author", slug: "test-author" },
      category: { name: "Test", displayName: "Test Category" },
      featuredImage: null
    },
    {
      _id: "2",
      title: "Test Article 2",
      slug: "test-article-2",
      excerpt: "Another test article to verify the grid layout works properly.",
      publishedAt: "2025-07-29",
      author: { name: "Test Author 2", slug: "test-author-2" },
      category: { name: "Test", displayName: "Test Category" },
      featuredImage: null
    }
  ];
  const pageTitle = testCategoryData.title + " - Tools & Strategies";
  const pageDescription = testCategoryData.metaDescription;
  return renderTemplate`<html lang="en" data-astro-cid-5ztnsirk> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${pageTitle}</title><meta name="description"${addAttribute(pageDescription, "content")}>${renderHead()}</head> <body data-astro-cid-5ztnsirk> <div class="debug-info" data-astro-cid-5ztnsirk> <h2 data-astro-cid-5ztnsirk>🧪 Debug Test Page</h2> <p data-astro-cid-5ztnsirk>This page uses static data to test if the issue is with Sanity or rendering.</p> <p data-astro-cid-5ztnsirk>Category Data: ${JSON.stringify(testCategoryData)}</p> <p data-astro-cid-5ztnsirk>Articles Count: ${testArticles.length}</p> </div> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-5ztnsirk": true })} <div class="main-content" data-astro-cid-5ztnsirk> <main class="category-page" data-astro-cid-5ztnsirk> ${renderComponent($$result, "CategoryHero", $$CategoryHero, { "category": testCategoryData.slug, "title": testCategoryData.title, "description": testCategoryData.description, "icon": testCategoryData.icon, "toolsCount": testCategoryData.toolsCount, "lastUpdated": testCategoryData.lastUpdated, "breadcrumbs": [
    { name: "Home", url: "/" },
    { name: "Categories", url: "/categories" }
  ], "data-astro-cid-5ztnsirk": true })} <div class="category-content" data-astro-cid-5ztnsirk> <div class="category-layout" data-astro-cid-5ztnsirk> <div class="category-main" data-astro-cid-5ztnsirk> <div class="articles-grid" data-astro-cid-5ztnsirk> ${testArticles.length > 0 ? testArticles.map((article) => renderTemplate`<article class="category-article" data-astro-cid-5ztnsirk> <div class="article-image" data-astro-cid-5ztnsirk> <div class="placeholder" data-astro-cid-5ztnsirk>🧪</div> </div> <div class="article-content" data-astro-cid-5ztnsirk> <a href="/categories/test" class="category-badge-small test" data-astro-cid-5ztnsirk>Test</a> <h2 data-astro-cid-5ztnsirk><a${addAttribute(`/test/${article.slug}`, "href")} data-astro-cid-5ztnsirk>${article.title}</a></h2> <p data-astro-cid-5ztnsirk>${article.excerpt}</p> <div class="article-meta" data-astro-cid-5ztnsirk> <span class="author" data-astro-cid-5ztnsirk>By <a${addAttribute(`/authors/${article.author.slug}`, "href")} class="author-link" data-astro-cid-5ztnsirk>${article.author.name}</a></span> <span class="date" data-astro-cid-5ztnsirk>${new Date(article.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span> </div> </div> </article>`) : renderTemplate`<div class="no-articles" data-astro-cid-5ztnsirk> <h3 data-astro-cid-5ztnsirk>No Test Articles Found</h3> <p data-astro-cid-5ztnsirk>This should not appear since we have static test data.</p> </div>`} </div> </div> ${renderComponent($$result, "CategorySidebar", $$CategorySidebar, { "categorySlug": "test", "data-astro-cid-5ztnsirk": true })} </div> </div> </main> <div class="footer-padding-spacer" data-astro-cid-5ztnsirk></div> </div> ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-5ztnsirk": true })}  </body> </html>`;
}, "/workspaces/ai-news-site/src/pages/test-category-static.astro", void 0);
const $$file = "/workspaces/ai-news-site/src/pages/test-category-static.astro";
const $$url = "/test-category-static";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$TestCategoryStatic,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
