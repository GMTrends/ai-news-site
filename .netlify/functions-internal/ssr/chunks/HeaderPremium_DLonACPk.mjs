import { d as createComponent, g as renderTemplate, f as renderComponent, m as maybeRenderHead } from "./vendor_BQ-iwbOC.mjs";
import "kleur/colors";
import { a as $$MobileNav, b as $$AdminLink, c as $$HeaderLink } from "./Footer_FSuDz8wK.mjs";
import { S as SITE_TITLE } from "./consts_Dxuyllhi.mjs";
/* empty css                             */
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$HeaderPremium = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["", '<header class="premium-header" id="premiumHeader" data-astro-cid-gtpx2krs> <nav class="premium-nav" data-astro-cid-gtpx2krs> <div class="premium-logo" data-astro-cid-gtpx2krs> <a href="/" class="premium-logo-link" data-astro-cid-gtpx2krs> <div class="premium-logo-icon-wrapper" data-astro-cid-gtpx2krs> <svg class="premium-logo-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-astro-cid-gtpx2krs> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" data-astro-cid-gtpx2krs></path> </svg> <div class="premium-logo-glow" data-astro-cid-gtpx2krs></div> </div> <span class="premium-logo-text" data-astro-cid-gtpx2krs>', '</span> </a> </div> <div class="premium-nav-center" data-astro-cid-gtpx2krs> <div class="premium-nav-links" id="premiumMainNav" data-astro-cid-gtpx2krs> ', " ", " ", " ", ' <div class="premium-dropdown" data-astro-cid-gtpx2krs> <div class="premium-nav-link premium-dropdown-toggle" data-astro-cid-gtpx2krs> <span data-astro-cid-gtpx2krs>More</span> <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-gtpx2krs> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-astro-cid-gtpx2krs></path> </svg> </div> <div class="premium-dropdown-menu" data-astro-cid-gtpx2krs> <a href="/categories/ai-agents" class="premium-dropdown-item" data-astro-cid-gtpx2krs>AI Agents</a> <a href="/categories/creative" class="premium-dropdown-item" data-astro-cid-gtpx2krs>Creative</a> <a href="/ai-tools-comparison" class="premium-dropdown-item" data-astro-cid-gtpx2krs>AI Tools</a> </div> </div> ', " ", " ", ' </div> <button class="premium-search-btn" id="premiumHeaderSearchBtn" aria-label="Search" tabindex="0" data-astro-cid-gtpx2krs> <svg id="premiumSearchIcon" class="premium-search-icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" data-astro-cid-gtpx2krs> <circle cx="11" cy="11" r="8" data-astro-cid-gtpx2krs></circle> <path d="m21 21-4.35-4.35" data-astro-cid-gtpx2krs></path> </svg> <svg id="premiumCloseIcon" class="premium-close-icon-svg premium-search-hidden" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" data-astro-cid-gtpx2krs> <line x1="18" y1="6" x2="6" y2="18" stroke-width="2" stroke-linecap="round" data-astro-cid-gtpx2krs></line> <line x1="6" y1="6" x2="18" y2="18" stroke-width="2" stroke-linecap="round" data-astro-cid-gtpx2krs></line> </svg> </button> </div> <div class="premium-nav-right" data-astro-cid-gtpx2krs> <div class="premium-mobile-nav" id="premiumMobileNav" data-astro-cid-gtpx2krs> ', ` </div> <button class="premium-btn-primary" onclick="premiumScrollToForm()" data-astro-cid-gtpx2krs>Subscribe</button> </div> </nav> <!-- Header Search Bar Overlay (hidden by default) --> <div class="premium-header-search-overlay" id="premiumHeaderSearchOverlay" data-astro-cid-gtpx2krs> <div class="premium-header-search-bar-container" data-astro-cid-gtpx2krs> <div class="premium-header-search-input-wrapper" data-astro-cid-gtpx2krs> <input type="text" class="premium-header-search-input" id="premiumHeaderSearchInput" placeholder="Search articles..." autocomplete="off" data-astro-cid-gtpx2krs> <button class="premium-header-search-input-close" id="premiumHeaderSearchInputClose" aria-label="Close search" tabindex="0" type="button" data-astro-cid-gtpx2krs> <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" data-astro-cid-gtpx2krs> <line x1="18" y1="6" x2="6" y2="18" stroke-width="2" stroke-linecap="round" data-astro-cid-gtpx2krs></line> <line x1="6" y1="6" x2="18" y2="18" stroke-width="2" stroke-linecap="round" data-astro-cid-gtpx2krs></line> </svg> </button> </div> <div class="premium-header-search-results" id="premiumHeaderSearchResults" data-astro-cid-gtpx2krs></div> <div id="premium-search-results" data-astro-cid-gtpx2krs></div> </div> </div> </header> <script>
(function() {
	const searchBtn = document.getElementById('premiumHeaderSearchBtn');
	const nav = document.getElementById('premiumMainNav');
	const mobileNav = document.getElementById('premiumMobileNav');
	const overlay = document.getElementById('premiumHeaderSearchOverlay');
	const input = document.getElementById('premiumHeaderSearchInput');
	const searchIcon = document.getElementById('premiumSearchIcon');
	const closeIcon = document.getElementById('premiumCloseIcon');
	const inputClose = document.getElementById('premiumHeaderSearchInputClose');
	const resultsBox = document.getElementById('premiumHeaderSearchResults');
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
		const resultsContainer = document.getElementById('premium-search-results');
		if (!resultsContainer) return;
		if (!results || results.length === 0) {
			resultsContainer.innerHTML = '<div class="premium-no-results">No results found.</div>';
			resultsContainer.classList.add('premium-active');
			return;
		}
		resultsContainer.innerHTML = results.map((article, idx) => {
			const cat = article.category;
			const categorySlug = cat && typeof cat === 'object'
				? (typeof cat.slug === 'object' ? cat.slug.current : cat.slug)
				: (cat || 'ai-news');
			const articleSlug = typeof article.slug === 'object' ? article.slug.current : article.slug;
			return \`<a href="/\${categorySlug}/\${articleSlug}" class="premium-search-result-link" role="option" tabindex="-1" id="premium-search-result-\${idx}">\${article.title}</a>\`;
		}).join('');
		resultsContainer.classList.add('premium-active');
	}

	function filterArticles(query) {
		const q = query.trim().toLowerCase();
		if (q.length < 2) {
			resultsBox && resultsBox.classList.remove('premium-active');
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
		nav && nav.classList.add('premium-search-hidden');
		mobileNav && mobileNav.classList.add('premium-search-hidden');
		overlay && overlay.classList.add('premium-search-active');
		searchIcon && searchIcon.classList.add('premium-search-hidden');
		closeIcon && closeIcon.classList.add('premium-search-active');
		setTimeout(() => { input && input.focus(); }, 100);
		document.body.classList.add('premium-header-search-active');
	}
	function closeSearch() {
		searchActive = false;
		nav && nav.classList.remove('premium-search-hidden');
		mobileNav && mobileNav.classList.remove('premium-search-hidden');
		overlay && overlay.classList.remove('premium-search-active');
		searchIcon && searchIcon.classList.remove('premium-search-hidden');
		closeIcon && closeIcon.classList.remove('premium-search-active');
		resultsBox && resultsBox.classList.remove('premium-active');
		selectedIdx = -1;
		document.body.classList.remove('premium-header-search-active');
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
		const resultsContainer = document.getElementById('premium-search-results');
		const items = resultsContainer ? resultsContainer.querySelectorAll('.premium-search-result-link') : [];
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			selectedIdx = (selectedIdx + 1) % Math.min(filteredArticles.length, 10);
			items.forEach((el, i) => {
				el.classList.toggle('premium-selected', i === selectedIdx);
				el.setAttribute('aria-selected', i === selectedIdx ? 'true' : 'false');
				if (i === selectedIdx) el.focus();
			});
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			selectedIdx = (selectedIdx - 1 + Math.min(filteredArticles.length, 10)) % Math.min(filteredArticles.length, 10);
			items.forEach((el, i) => {
				el.classList.toggle('premium-selected', i === selectedIdx);
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
	const resultsContainer = document.getElementById('premium-search-results');
	if (resultsContainer) resultsContainer.setAttribute('role', 'listbox');
})();
<\/script>  `], ["", '<header class="premium-header" id="premiumHeader" data-astro-cid-gtpx2krs> <nav class="premium-nav" data-astro-cid-gtpx2krs> <div class="premium-logo" data-astro-cid-gtpx2krs> <a href="/" class="premium-logo-link" data-astro-cid-gtpx2krs> <div class="premium-logo-icon-wrapper" data-astro-cid-gtpx2krs> <svg class="premium-logo-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-astro-cid-gtpx2krs> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" data-astro-cid-gtpx2krs></path> </svg> <div class="premium-logo-glow" data-astro-cid-gtpx2krs></div> </div> <span class="premium-logo-text" data-astro-cid-gtpx2krs>', '</span> </a> </div> <div class="premium-nav-center" data-astro-cid-gtpx2krs> <div class="premium-nav-links" id="premiumMainNav" data-astro-cid-gtpx2krs> ', " ", " ", " ", ' <div class="premium-dropdown" data-astro-cid-gtpx2krs> <div class="premium-nav-link premium-dropdown-toggle" data-astro-cid-gtpx2krs> <span data-astro-cid-gtpx2krs>More</span> <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-gtpx2krs> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-astro-cid-gtpx2krs></path> </svg> </div> <div class="premium-dropdown-menu" data-astro-cid-gtpx2krs> <a href="/categories/ai-agents" class="premium-dropdown-item" data-astro-cid-gtpx2krs>AI Agents</a> <a href="/categories/creative" class="premium-dropdown-item" data-astro-cid-gtpx2krs>Creative</a> <a href="/ai-tools-comparison" class="premium-dropdown-item" data-astro-cid-gtpx2krs>AI Tools</a> </div> </div> ', " ", " ", ' </div> <button class="premium-search-btn" id="premiumHeaderSearchBtn" aria-label="Search" tabindex="0" data-astro-cid-gtpx2krs> <svg id="premiumSearchIcon" class="premium-search-icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" data-astro-cid-gtpx2krs> <circle cx="11" cy="11" r="8" data-astro-cid-gtpx2krs></circle> <path d="m21 21-4.35-4.35" data-astro-cid-gtpx2krs></path> </svg> <svg id="premiumCloseIcon" class="premium-close-icon-svg premium-search-hidden" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" data-astro-cid-gtpx2krs> <line x1="18" y1="6" x2="6" y2="18" stroke-width="2" stroke-linecap="round" data-astro-cid-gtpx2krs></line> <line x1="6" y1="6" x2="18" y2="18" stroke-width="2" stroke-linecap="round" data-astro-cid-gtpx2krs></line> </svg> </button> </div> <div class="premium-nav-right" data-astro-cid-gtpx2krs> <div class="premium-mobile-nav" id="premiumMobileNav" data-astro-cid-gtpx2krs> ', ` </div> <button class="premium-btn-primary" onclick="premiumScrollToForm()" data-astro-cid-gtpx2krs>Subscribe</button> </div> </nav> <!-- Header Search Bar Overlay (hidden by default) --> <div class="premium-header-search-overlay" id="premiumHeaderSearchOverlay" data-astro-cid-gtpx2krs> <div class="premium-header-search-bar-container" data-astro-cid-gtpx2krs> <div class="premium-header-search-input-wrapper" data-astro-cid-gtpx2krs> <input type="text" class="premium-header-search-input" id="premiumHeaderSearchInput" placeholder="Search articles..." autocomplete="off" data-astro-cid-gtpx2krs> <button class="premium-header-search-input-close" id="premiumHeaderSearchInputClose" aria-label="Close search" tabindex="0" type="button" data-astro-cid-gtpx2krs> <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" data-astro-cid-gtpx2krs> <line x1="18" y1="6" x2="6" y2="18" stroke-width="2" stroke-linecap="round" data-astro-cid-gtpx2krs></line> <line x1="6" y1="6" x2="18" y2="18" stroke-width="2" stroke-linecap="round" data-astro-cid-gtpx2krs></line> </svg> </button> </div> <div class="premium-header-search-results" id="premiumHeaderSearchResults" data-astro-cid-gtpx2krs></div> <div id="premium-search-results" data-astro-cid-gtpx2krs></div> </div> </div> </header> <script>
(function() {
	const searchBtn = document.getElementById('premiumHeaderSearchBtn');
	const nav = document.getElementById('premiumMainNav');
	const mobileNav = document.getElementById('premiumMobileNav');
	const overlay = document.getElementById('premiumHeaderSearchOverlay');
	const input = document.getElementById('premiumHeaderSearchInput');
	const searchIcon = document.getElementById('premiumSearchIcon');
	const closeIcon = document.getElementById('premiumCloseIcon');
	const inputClose = document.getElementById('premiumHeaderSearchInputClose');
	const resultsBox = document.getElementById('premiumHeaderSearchResults');
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
		const resultsContainer = document.getElementById('premium-search-results');
		if (!resultsContainer) return;
		if (!results || results.length === 0) {
			resultsContainer.innerHTML = '<div class="premium-no-results">No results found.</div>';
			resultsContainer.classList.add('premium-active');
			return;
		}
		resultsContainer.innerHTML = results.map((article, idx) => {
			const cat = article.category;
			const categorySlug = cat && typeof cat === 'object'
				? (typeof cat.slug === 'object' ? cat.slug.current : cat.slug)
				: (cat || 'ai-news');
			const articleSlug = typeof article.slug === 'object' ? article.slug.current : article.slug;
			return \\\`<a href="/\\\${categorySlug}/\\\${articleSlug}" class="premium-search-result-link" role="option" tabindex="-1" id="premium-search-result-\\\${idx}">\\\${article.title}</a>\\\`;
		}).join('');
		resultsContainer.classList.add('premium-active');
	}

	function filterArticles(query) {
		const q = query.trim().toLowerCase();
		if (q.length < 2) {
			resultsBox && resultsBox.classList.remove('premium-active');
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
		nav && nav.classList.add('premium-search-hidden');
		mobileNav && mobileNav.classList.add('premium-search-hidden');
		overlay && overlay.classList.add('premium-search-active');
		searchIcon && searchIcon.classList.add('premium-search-hidden');
		closeIcon && closeIcon.classList.add('premium-search-active');
		setTimeout(() => { input && input.focus(); }, 100);
		document.body.classList.add('premium-header-search-active');
	}
	function closeSearch() {
		searchActive = false;
		nav && nav.classList.remove('premium-search-hidden');
		mobileNav && mobileNav.classList.remove('premium-search-hidden');
		overlay && overlay.classList.remove('premium-search-active');
		searchIcon && searchIcon.classList.remove('premium-search-hidden');
		closeIcon && closeIcon.classList.remove('premium-search-active');
		resultsBox && resultsBox.classList.remove('premium-active');
		selectedIdx = -1;
		document.body.classList.remove('premium-header-search-active');
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
		const resultsContainer = document.getElementById('premium-search-results');
		const items = resultsContainer ? resultsContainer.querySelectorAll('.premium-search-result-link') : [];
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			selectedIdx = (selectedIdx + 1) % Math.min(filteredArticles.length, 10);
			items.forEach((el, i) => {
				el.classList.toggle('premium-selected', i === selectedIdx);
				el.setAttribute('aria-selected', i === selectedIdx ? 'true' : 'false');
				if (i === selectedIdx) el.focus();
			});
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			selectedIdx = (selectedIdx - 1 + Math.min(filteredArticles.length, 10)) % Math.min(filteredArticles.length, 10);
			items.forEach((el, i) => {
				el.classList.toggle('premium-selected', i === selectedIdx);
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
	const resultsContainer = document.getElementById('premium-search-results');
	if (resultsContainer) resultsContainer.setAttribute('role', 'listbox');
})();
<\/script>  `])), maybeRenderHead(), SITE_TITLE, renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/categories/marketing", "class": "premium-nav-link", "data-astro-cid-gtpx2krs": true }, { "default": async ($$result2) => renderTemplate`Marketing` }), renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/categories/business", "class": "premium-nav-link", "data-astro-cid-gtpx2krs": true }, { "default": async ($$result2) => renderTemplate`Business` }), renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/categories/productivity", "class": "premium-nav-link", "data-astro-cid-gtpx2krs": true }, { "default": async ($$result2) => renderTemplate`Productivity` }), renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/categories/ecommerce", "class": "premium-nav-link", "data-astro-cid-gtpx2krs": true }, { "default": async ($$result2) => renderTemplate`eCommerce` }), renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/about", "class": "premium-nav-link", "data-astro-cid-gtpx2krs": true }, { "default": async ($$result2) => renderTemplate`About` }), renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/contact", "class": "premium-nav-link", "data-astro-cid-gtpx2krs": true }, { "default": async ($$result2) => renderTemplate`Contact` }), renderComponent($$result, "AdminLink", $$AdminLink, { "data-astro-cid-gtpx2krs": true }), renderComponent($$result, "MobileNav", $$MobileNav, { "data-astro-cid-gtpx2krs": true }));
}, "/workspaces/ai-news-site/src/components/HeaderPremium.astro", void 0);
export {
  $$HeaderPremium as $
};
